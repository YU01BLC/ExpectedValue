# 競馬期待値算出アルゴリズム 仕様書（詳細版）

## 概要

本書は、ルールベース＋重み付け方式の期待値（EV）算出ロジックを**実装可能な仕様レベル**まで落とし込んだドキュメントです。
目的は UI（Cursor）とロジック（あなたの実装）が明確なインターフェースで疎通できるようにすること。将来の機械学習化を見据えた特徴量・正規化・出力仕様を定義します。

---

## 目次（この文書で提供するもの）

1. 即用 API シグネチャ（computeRace）
2. 入出力スキーマ（TypeScript 風）
3. 各特徴量の数式・正規化方法（完全な算出手順と初期パラメータ）
4. 合成（重み）・確率化（softmax）・confidence 計算法
5. 当日バイアス（R1〜R6）算出手順（数式＋例）
6. 連系確率（Plackett–Luce）と配当推定（est payout）
7. 人気補正・ステーキング（Kelly 近似）
8. 推奨買い目生成ルール（K 制限・列挙方法）
9. 出力 JSON 仕様（UI 表示用）
10. 単体テスト用具体数値サンプル（検算用）
11. 設定ファイル（weights.json）雛形とチューニング方針
12. 実装上の注意・パフォーマンス・エッジケース
13. 次フェーズ（ML 移行）への橋渡し

---

# 1. 即用 API シグネチャ

**関数名**: `computeRace(raceSnapshot: RaceSnapshot, config: Config) => RaceResult`

- 呼び出しは同期でも非同期でも可（推奨は非同期 Promise ベース）。
- `raceSnapshot` はレースの生データ（API/CSV から構築）をそのまま渡す。
- `config` は weights・params を格納する設定オブジェクト。

---

# 2. 入出力スキーマ（TypeScript 風）

```ts
type RaceSnapshot = {
  raceId: string;
  date: string; // ISO
  course: string; // e.g. "東京芝1600"
  ground: '良' | '稍重' | '重' | '不良';
  weather?: string;
  headcount: number;
  horses: HorseSnapshot[];
  pastRaces?: PastRace[]; // optional: for bias calc (R1-R6)
};

type HorseSnapshot = {
  horseNo: number;
  frameNo?: number;
  horseName: string;
  jockey?: string;
  trainer?: string;
  weight?: number; // 斤量
  age?: number;
  sex?: '牡' | '牝' | 'セン';
  style?: '逃げ' | '先行' | '差し' | '追込';
  recentRaces?: RecentEntry[]; // up to last 5
  pedigree?: {
    sire?: string;
    damsire?: string;
    sireDist?: number;
    damsireDist?: number;
  };
  odds?: number; // decimal
  // optional fields allowed
};

type RaceResult = {
  raceId: string;
  generatedAt: string;
  bias: { drawBias: number; paceBias: number; samples: number };
  horses: HorseResult[];
  combinationCandidates: CombinationCandidate[];
  configUsed: Config; // echo back
};

type HorseResult = {
  horseNo: number;
  horseName: string;
  features: Record<string, number>; // normalized features
  featureContrib: Record<string, number>; // w_k * f_k
  score: number; // S_i (raw)
  v: number; // exp(alpha * S_i)
  prob: number; // p_i
  odds?: number;
  evSingle?: number;
  confidence: number; // 0..1
  sabcd?: 'S' | 'A' | 'B' | 'C' | 'D';
  notes?: string[];
};

type CombinationCandidate = {
  type:
    | 'win'
    | 'place'
    | 'quinella'
    | 'exacta'
    | 'trio'
    | 'trifecta'
    | 'trifecta_box'
    | 'other';
  combination: number[]; // horseNo list in order (for order-sensitive types)
  prob: number; // model probability
  estPayout: number; // estimated payout (decimal)
  ev: number; // expected value
};

interface Config {
  weights: Record<string, number>;
  params: {
    alpha: number;
    takeout: number;
    popUnderThreshold: number;
    popUnderDelta: number;
    kCandidates: number;
    kTopForCombinations: number;
    kMaxOddsConsidered?: number;
  };
}
```

---

# 3. 特徴量定義・算出（完全仕様）

> ここは最も重要な箇所。各特徴量は【入力 → 中間スコア → 正規化】の 3 段階で記述します。数式は実装にそのまま落とせます。

共通ルール:

- ほとんどの raw score は実数スケールで計算した後、**min-max 正規化** (0..1) または **sigmoid(z)** により 0..1 に閉じる。
- 欠損値: 必要な raw stats が欠損している場合は `raw = median_of_field` を使い、confidence を 0.8 倍する。
- 係数・閾値は `Config` に移し、CI でチューニングしやすくする。

---

## 3.1 `recentIndex`（近走指数）

**入力**: 最大 5 レース: for t=1..T (t=1 is most recent): { finishPos r_t, timeDiff d_t (秒), final3FRank g_t, classFactor c_t, popularity pop_t }

**ステップ**:

1. 着順スコア `rs_t`:

   ```
   rs_t = case r_t:
     1 -> 100
     2 -> 80
     3 -> 60
     4-5 -> 40
     6-9 -> 20
     else -> 0
   ```

2. 着差補正 `ds_t = -2 * d_t` // 0.1s -> -0.2
3. 上がり補正 `gs_t = 20 if g_t==1, 10 if g_t==2, 5 if g_t==3, 0 otherwise`
4. クラス係数 `CF(c_t)`(例: G1=1.25,G2=1.15,G3=1.1,OP=1.05,1 勝=1.0,2 勝=0.95)
5. ランナブル走点: `score_t = (rs_t + ds_t + gs_t) * CF(c_t)`
6. 直近重み `w_t`: \[0.5, 0.3, 0.15, 0.05, 0.0] for T<=4 adapt last two to average
7. rawRecent = Σ_t w_t \* score_t
8. normalization: `recentIndex = sigmoid( (rawRecent - μ_recent) / σ_recent )` OR min-max normalize using historical bounds \[minH, maxH]

**出力範囲**: `[0,1]`

**初期 μ_recent/σ_recent**: compute from historical dataset or use preset (μ=40, σ=20) as starting guess.

**サンプル計算** (簡易): 前走: r=1,d=0.0,g=1,class=OP → rs=100,ds=0,gs=20,CF=1.05 => score=126. recentIndex ≈ sigmoid((126-40)/20)=sigmoid(4.3)≈0.986

---

## 3.2 `bloodScore`（血統適性）

**入力**: sireDist, damsireDist (代表勝ち距離, in meters), sireTurfPref (0..1 turf affinity), sireMudPref (0..1) etc.

**手順**:

1. distanceMatch: `distDiff = abs(raceDist - sireDist)`
   `distScore = max(0, 1 - distDiff/600)` // 600m mismatch -> 0
2. turfScore = sireTurfPref (0..1 assumed)
3. mudScore = sireMudPref (0..1)
4. raw = 0.6*distScore + 0.3*turfScore + 0.1\*mudScore
5. normalization: already 0..1 due to weights

**出力**: `bloodScore ∈ [0,1]`

---

## 3.3 `courseScore`（コース実績）

**入力**: nStartsCourse, winsCourse, placesCourse, avgFinal3F_onCourse

**手順**:

1. winRate = winsCourse / nStartsCourse
2. placeRate = placesCourse / nStartsCourse
3. reliability = min(1, nStartsCourse / 5) // 少数なら信頼度落とす
4. raw = reliability \* (1.5 \* winRate + 0.5 \* placeRate)
   // raw in \[0,?] since rates 0..1; keep 0..1

**出力**: courseScore ∈ \[0,1]

---

## 3.4 `jockeyTrainerScore`

**入力**: jockeyWinRateWindow (recent 90 days), trainerWinRateWindow

**手順**:

1. jockPct = percentile(jockeyWinRateWindow) using global distribution (0..1)
2. trainPct = percentile(trainerWinRateWindow)
3. raw = 0.6*jockPct + 0.4*trainPct

**出力**: 0..1

---

## 3.5 `drawEffect`（枠影響）

**入力**: frameNo, bias.drawBias (from bias calc), static historical draw effect if available

**手順**:

1. frameBiasRaw = B_draw\[frameNo] // B_draw computed later, typically in \[-0.2,+0.2]
2. normalize: drawEffect = clamp(frameBiasRaw / 0.2, -1, 1) // scaled to \[-1,1]

**出力**: -1..+1 (乗算/加算で扱う)

---

## 3.6 `weightEffect`（斤量）

**入力**: assignedWeight, horseAvgWeight (historical)

**手順**:

1. delta = assignedWeight - horseAvgWeight
2. raw = -0.5 \* delta // per 1 kg increase -> -0.5 pts
3. normalize: weightEffect = tanh(raw / 3) // scale to -1..1 approximately

---

## 3.7 `rotation`（ローテ）

**入力**: daysSinceLastRace

**手順**:

- if 14 <= days <= 35 -> raw = +10
- if 7 <= days < 14 -> raw = -5
- if 36 <= days <= 180 -> raw = -10
- if days > 180 -> raw = -20
- normalize: rotation = (raw + 20)/40 -> map to 0..1 (or use tanh mapping for -1..1)

---

## 3.8 `paceSuitability`（展開）

**入力**: horseStyle, fieldStyleCounts (#逃げ, #先行, #差し, #追込)

**手順（簡易）**:

1. compute racePaceIndex = (#逃げ + #先行 \* 0.5) / totalHorses
2. if racePaceIndex >= 0.6 -> highEarlyPace
3. suitability mapping:

   - if horseStyle == '差し' and highEarlyPace -> +0.15
   - if horseStyle == '先行' and racePaceIndex <= 0.3 -> +0.10
   - else small adjustments \[-0.1..+0.1]

4. output in \[-0.2, +0.2]

---

## 3.9 `trackCondition`（馬場巧拙）

**入力**: horsePastOnGroundRates (win/place rates on specific ground)

**手順**:

1. groundKey = race ground
2. raw = historicalWinRateOnThisGround (0..1)
3. normalized -> 0..1

---

## 3.10 `marketMomentum`（市場乖離）

**入力**: model p (pre-market-adjustment) vs market q (1/odds normalized)

**手順**:

1. q_raw_i = 1 / odd_i
2. q_i = q_raw_i / Σ q_raw_j
3. momentum = (p_i - q_i) // can be negative
4. normalized momentum = tanh( momentum / 0.2 ) // scale to approx -1..1

**用途**: 小幅に S_i を調整（人気薄でモデル優位などを表現）

---

# 4. 合成スコア・確率化・confidence

## 4.1 合成スコア S_i

```
S_i = Σ_k w_k * f_{i,k}
```

- ここで `f_{i,k}` は「正規化済み特徴量」。
- `w_k` は `Config.weights`。
- 初期 weights は下記（合計=1 推奨）:

  - recentIndex: 0.25
  - courseScore: 0.15
  - jockeyTrainer: 0.12
  - paceSuitability: 0.12
  - bloodScore: 0.08
  - drawEffect: 0.06
  - trackCondition: 0.06
  - marketMomentum: 0.06
  - weightEffect: 0.04
  - rotation: 0.04

※ weights は UI でスライド調整可能にする。

## 4.2 確率化（softmax）

```
v_i = exp(alpha * S_i)
p_i = v_i / Σ_j v_j
```

- `alpha` は温度（Config.params.alpha）: 初期 1.0。
- 数値安定化: 実装では `v_i = exp(alpha * (S_i - S_max))` を使用。

## 4.3 confidence（信頼度 0..1）

計算要素:

- dataCompleteness: fraction of non-missing key features (0..1)
- recentRacesCountFactor = min(1, nRecent / 5)
- biasSamplesFactor = min(1, biasSamples / 60)

式例:

```
confidence = 0.6 * dataCompleteness + 0.3 * recentRacesCountFactor + 0.1 * biasSamplesFactor
```

- いずれも 0..1。最終 `confidence` を 0.1 未満にクリップしない。

---

# 5. 当日バイアス推定（R1〜R6 詳細）

## 5.1 入力

- pastRaces: array of completed races for the same day prior to target race (ideally 1..6)
  each entry: { raceNo, horse list with frameNo, style, finishPos, top3Flag }

## 5.2 算出手順

1. 集計: for frames 1..8, compute starts_frame_i and wins_frame_i (from R1..R6)
2. frameWinRate_i = wins_frame_i / starts_frame_i (handle zero-starts)
3. innerAvg = mean(frameWinRate for frames 1..4), outerAvg = mean(frames 5..8)
4. rawDrawBias = innerAvg - outerAvg // positive -> inner advantage
5. normalize drawBias = rawDrawBias / 0.2 // typical max \~0.2; clip to \[-1,1]
6. styleWinRate: compute per style (逃げ/先行/差し/追込)
7. paceBias = styleWinRate_front - styleWinRate_closer (front = 逃げ+先行, closer = 差し+追込)
8. normalize paceBias = paceBias / 0.3 clipped to \[-1,1]
9. samples = total starts across R1..R6
10. strengthFactor gamma = min(1, samples / 60)

## 5.3 補正適用例

- For each horse i, compute:

  - drawEffect_i (from its frame)
  - paceEffect_i (based on its style)

- Adjust probabilities after initial p_i (softmax) via multiplicative correction:

```
p_i' = p_i * (1 + gamma * (w_draw * drawEffect_i + w_pace * paceEffect_i))
```

- Re-normalize: p_i'' = p_i' / Σ p_j'
- `w_draw`, `w_pace` are tunable (e.g., 0.6, 0.4 of bias weight)

---

# 6. 連系確率（Plackett–Luce） & 配当推定

## 6.1 Plackett–Luce（順序確率）

- Let v_i = exp(S_i)
- For order (i1,i2,...,ik):

```
P(i1,..,ik) = (v_i1 / V) * (v_i2 / (V - v_i1)) * ...
where V = Σ v_j
```

- Implementation notes:

  - For huge N (e.g. 18), restrict to top K horses by S_i (K = Config.params.kTopForCombinations, typical 6 ～ 8)
  - Generate combinations/permutations according to ticket type (order-sensitive or not)

## 6.2 市場組合せ確率（近似）

- Compute q_i = normalized(1/odds_i)
- Use the Plackett–Luce formula replacing v by q to approximate market implied order probability q_combo

## 6.3 配当推定

- estPayout_combo = (1 / q_combo) \* (1 - takeout)
- `takeout` (控除率) is Config.params.takeout (e.g. 0.15)

## 6.4 EV

- EV_combo = p_model_combo \* estPayout_combo
- For single: EV_single_i = p_i \* odds_i
- Optionally present EV_net = EV - 1 (expected net profit per 1 unit bet)

---

# 7. 人気補正・ステーキング

## 7.1 人気補正（popUnder）

- Condition: odds_i >= Config.params.popUnderThreshold (default 8.0) AND scorePercentile(i) >= 0.7
- Apply: p_i := p_i \* (1 + popUnderDelta) where popUnderDelta = Config.params.popUnderDelta (ex. 0.10)
- Re-normalize p_i

## 7.2 ステーキング（Fractional Kelly 推奨）

- For single bet:

```
decimalOdds = odds_i
b = decimalOdds - 1
f_raw = (p_i * b - (1 - p_i)) / b
f = clamp(fraction * f_raw, 0, 1)
stake = f * bankroll
```

- `fraction` = Config.params.kellyFraction (e.g. 0.25)

- For combo bets: approximate f using p_combo and estPayout_combo similarly (warning: joint distribution approx)

---

# 8. 推奨買い目生成ルール

1. Select top M horses by S_i (M = Config.params.kTopForCombinations, default 6)
2. Enumerate candidate combinations depending on ticket type (respecting box/formation/nagashi semantics)
3. For order-sensitive types (馬単/三連単), enumerate permutations from selected pool with limit on total combos (e.g., max 200)
4. Compute p_model_combo and estPayout_combo, then EV_combo; sort by EV desc
5. Filter: keep combos with EV_combo >= threshold (configurable, default 1.0) and limit to top N combos for display (e.g., 20)

---

# 9. 出力 JSON（UI 用詳細）

- 前項の RaceResult を返すが、追加で下記 fields を含める：

  - logs: detailedCalculationSteps (for debug / audit)
  - version: algorithmVersion
  - thresholdsUsed: {evThreshold, kTop, alpha}

---

# 10. 単体テスト用具体数値サンプル

## 10.1 Softmax sanity check

S = \[0.36, 0.25, 0.18, 0.10], alpha=1.0
v = exp(S - maxS)
\=> p ≈ \[0.2854,0.2557,0.2385,0.2203] (sum=1)

## 10.2 Plackett–Luce example (A->B->C)

vA=1.433329, vB=1.284025, vC=1.197217, V=3.914571
P(A,B,C) = (vA/V)_(vB/(V-vA))_(vC/(V-vA-vB)) (compute numerically per earlier doc)

## 10.3 recentIndex example

- last1: r1=1 (rs=100), d1=0.0 (ds=0), g1=1(gs=20), class=OP(CF=1.05) => score1=(100+0+20)\*1.05=126
- last2: r2=4(rs=40), d2=0.3(ds=-0.6), g2=5(gs=0), class=1win(CF=1.0) => score2=39.4
- raw = 0.5*126 +0.3*39.4 +0.15\*... => compute and normalize

---

# 11. 設定ファイル（weights.json）雛形

```json
{
  "weights": {
    "recentIndex": 0.25,
    "courseScore": 0.15,
    "jockeyTrainer": 0.12,
    "paceSuitability": 0.12,
    "bloodScore": 0.08,
    "drawEffect": 0.06,
    "trackCondition": 0.06,
    "marketMomentum": 0.06,
    "weightEffect": 0.04,
    "rotation": 0.04
  },
  "params": {
    "alpha": 1.0,
    "takeout": 0.15,
    "popUnderThreshold": 8.0,
    "popUnderDelta": 0.1,
    "kellyFraction": 0.25,
    "kTopForCombinations": 6,
    "kCandidates": 100
  }
}
```

---

# 12. 実装上の注意・性能・エッジケース

- 数値安定化: softmax 実装は `exp(x - maxX)` を必ず使う
- 大 N の組合せ爆発: 三連単は K を 6 〜 8 に制限、上限の総組数を超える場合は EV 上位でプルーニング
- 欠損データ: confidence を与え結果に表示。欠損が多いと top recommendations を出さないルールも可
- 計算コスト: Plackett–Luce の確率計算は O(k^3) くらい（for permutations）→ limit K
- キャッシュ: v_i, p_i, q_i 等は一度計算したら reuse
- 単位: odds は decimal（例 3.5）。注意して UI と合わせる

---

# 13. バックテスト・チューニング方針

- Grid search over weights / alpha / popUnderDelta with time-series CV
- Metrics: ROI, Brier score, LogLoss, average payout
- Use conservative regularisation: limit weight changes per iteration

---

# 14. 次のアクション（推奨）

1. このドキュメントを Cursor の実装チームに渡す（computeRace API に沿って実装指示）
2. あなたは `feature_engineering.ts` の `recentIndex`, `courseScore`, `jockeyTrainer` を実装し mock で UI と繋ぐ
3. 実装後、小スケールで手計算例と照合するユニットテストを追加

---

_ドキュメント生成: 詳細仕様はこのまま Cursor に渡して実装を開始できます。必要なら TypeScript の型定義ファイル `.d.ts` や擬似コードも追加します。_
