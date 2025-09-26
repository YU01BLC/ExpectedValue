import {
  type BetTypeConfig,
  type BetMethodConfig,
  type NagashiType,
} from '../types/purchaseForm';

/**
 * 組み合わせ数 C(n,r) = n! / (r! * (n-r)!)
 */
const combination = (n: number, r: number): number => {
  if (r > n || r < 0) return 0;
  if (r === 0 || r === n) return 1;

  let result = 1;
  for (let i = 0; i < r; i++) {
    result = (result * (n - i)) / (i + 1);
  }
  return Math.floor(result);
};

/**
 * 順列数 P(n,r) = n! / (n-r)!
 */
const permutation = (n: number, r: number): number => {
  if (r > n || r < 0) return 0;
  if (r === 0) return 1;

  let result = 1;
  for (let i = 0; i < r; i++) {
    result = result * (n - i);
  }
  return result;
};

// ヘルパー関数群
const getUniqueCombinations = (horses: number[][]): number => {
  const allHorses = horses.flat();
  return Array.from(new Set(allHorses)).length;
};

const getOpponents = (
  columnHorses: number[][],
  axisHorse: number | null,
  nagashiType?: NagashiType
): number[] => {
  if (nagashiType === 'multi2') {
    // 二頭軸流しの場合、軸馬は2頭なので、軸馬以外の相手馬を取得
    const axisHorses = columnHorses[0] || [];
    const opponents = columnHorses[1] || [];
    return opponents.filter((h) => !axisHorses.includes(h));
  }
  if (!axisHorse) return [];

  // 枠連の流しの場合、軸馬の枠以外の全ての馬が相手
  const totalHorses = Math.max(...columnHorses.flat(), 0);
  const axisWaku = getWakuNumber(axisHorse, totalHorses);

  console.log('getOpponents 枠連流し:', {
    axisHorse,
    totalHorses,
    axisWaku,
    columnHorses,
  });

  // 全馬から軸馬の枠以外の馬を取得
  const allHorses = Array.from({ length: totalHorses }, (_, i) => i + 1);
  const opponents = allHorses.filter(
    (horse) => getWakuNumber(horse, totalHorses) !== axisWaku
  );

  console.log('getOpponents 結果:', {
    allHorses,
    opponents,
    opponentsLength: opponents.length,
  });

  return opponents;
};

const calculateFormationCombinations = (
  columns: number[][],
  isOrderMatters: boolean
): number => {
  if (columns.length === 2) {
    const [first, second] = columns;
    if (isOrderMatters) {
      return first.length * second.length;
    }

    // 順序が関係ない場合は重複排除
    const addedCombinations = new Set<string>();
    first.forEach((f) => {
      second.forEach((s) => {
        if (f !== s) {
          const sorted = [f, s].sort((a, b) => a - b);
          addedCombinations.add(`${sorted[0]}-${sorted[1]}`);
        }
      });
    });
    return addedCombinations.size;
  }

  if (columns.length === 3) {
    const [first, second, third] = columns;
    if (isOrderMatters) {
      return first.length * second.length * third.length;
    }

    // 順序が関係ない場合は重複排除
    const addedCombinations = new Set<string>();
    first.forEach((f) => {
      second.forEach((s) => {
        third.forEach((t) => {
          if (f !== s && f !== t && s !== t) {
            const sorted = [f, s, t].sort((a, b) => a - b);
            addedCombinations.add(`${sorted[0]}-${sorted[1]}-${sorted[2]}`);
          }
        });
      });
    });
    return addedCombinations.size;
  }

  return 0;
};

const calculateExactaSingle = (columnHorses: number[][]): number => {
  const [firstColumn = [], secondColumn = []] = columnHorses;

  // 同じ馬が複数列で選択されている場合は0点
  const hasSameHorse = firstColumn.some((horse) =>
    secondColumn.includes(horse)
  );
  if (hasSameHorse) return 0;

  // 1着と2着にそれぞれ1頭ずつ選択されている場合、組み合わせは1つ
  if (firstColumn.length === 1 && secondColumn.length === 1) return 1;

  return 0;
};

const calculateNagashiPoints = (
  nagashiType: NagashiType,
  opponents: number[],
  axisHorse: number | null
): number => {
  if (!axisHorse || opponents.length === 0) return 0;

  switch (nagashiType) {
    case 'first':
    case 'second':
    case 'third':
      return opponents.length;
    case 'firstSecond':
      return opponents.length;
    case 'multi1':
      return opponents.length * 2;
    case 'multi2':
      return opponents.length;
    default:
      return 0;
  }
};

// 動的な枠番計算関数（JRAの正しいルール）
const getWakuNumber = (horseNumber: number, totalHorses: number): number => {
  if (totalHorses <= 8) {
    // 8頭以下: 1枠1頭制（馬番 = 枠番）
    return horseNumber;
  } else if (totalHorses === 9) {
    // 9頭: 1-7枠に1頭ずつ、8枠に2頭
    return horseNumber <= 7 ? horseNumber : 8;
  } else if (totalHorses === 10) {
    // 10頭: 1-6枠に1頭ずつ、7枠に2頭、8枠に2頭
    if (horseNumber <= 6) return horseNumber;
    if (horseNumber <= 8) return 7;
    return 8;
  } else if (totalHorses === 11) {
    // 11頭: 1-5枠に1頭ずつ、6-8枠に2頭ずつ
    if (horseNumber <= 5) return horseNumber;
    if (horseNumber <= 7) return 6;
    if (horseNumber <= 9) return 7;
    return 8;
  } else if (totalHorses === 12) {
    // 12頭: 1-4枠に1頭ずつ、5-8枠に2頭ずつ
    if (horseNumber <= 4) return horseNumber;
    if (horseNumber <= 6) return 5;
    if (horseNumber <= 8) return 6;
    if (horseNumber <= 10) return 7;
    return 8;
  } else if (totalHorses === 13) {
    // 13頭: 1-3枠に1頭ずつ、4-8枠に2頭ずつ
    if (horseNumber <= 3) return horseNumber;
    if (horseNumber <= 5) return 4;
    if (horseNumber <= 7) return 5;
    if (horseNumber <= 9) return 6;
    if (horseNumber <= 11) return 7;
    return 8;
  } else if (totalHorses === 14) {
    // 14頭: 1枠に1頭、2-6枠に2頭ずつ、7-8枠に2頭ずつ
    if (horseNumber === 1) return 1;
    if (horseNumber <= 4) return 2;
    if (horseNumber <= 6) return 3;
    if (horseNumber <= 8) return 4;
    if (horseNumber <= 10) return 5;
    if (horseNumber <= 12) return 6;
    if (horseNumber <= 14) return 7;
    return 8;
  } else if (totalHorses === 15) {
    // 15頭: 1枠に1頭、2-7枠に2頭ずつ、8枠に2頭
    if (horseNumber === 1) return 1;
    if (horseNumber <= 3) return 2;
    if (horseNumber <= 5) return 3;
    if (horseNumber <= 7) return 4;
    if (horseNumber <= 9) return 5;
    if (horseNumber <= 11) return 6;
    if (horseNumber <= 13) return 7;
    return 8;
  } else if (totalHorses === 16) {
    // 16頭: 1-8枠に2頭ずつ
    if (horseNumber <= 2) return 1;
    if (horseNumber <= 4) return 2;
    if (horseNumber <= 6) return 3;
    if (horseNumber <= 8) return 4;
    if (horseNumber <= 10) return 5;
    if (horseNumber <= 12) return 6;
    if (horseNumber <= 14) return 7;
    return 8;
  } else if (totalHorses === 17) {
    // 17頭: 1-7枠に2頭ずつ、8枠に3頭
    if (horseNumber <= 2) return 1;
    if (horseNumber <= 4) return 2;
    if (horseNumber <= 6) return 3;
    if (horseNumber <= 8) return 4;
    if (horseNumber <= 10) return 5;
    if (horseNumber <= 12) return 6;
    if (horseNumber <= 14) return 7;
    return 8;
  } else if (totalHorses === 18) {
    // 18頭: 1-6枠に2頭ずつ、7-8枠に3頭ずつ
    if (horseNumber <= 2) return 1;
    if (horseNumber <= 4) return 2;
    if (horseNumber <= 6) return 3;
    if (horseNumber <= 8) return 4;
    if (horseNumber <= 10) return 5;
    if (horseNumber <= 12) return 6;
    if (horseNumber <= 15) return 7;
    return 8;
  }

  // フォールバック（通常は発生しない）
  return Math.ceil(horseNumber / 2);
};

/**
 * 馬券の点数を計算する関数
 */
export const calculateCombinations = (
  columnHorses: number[][],
  betTypeConfig: BetTypeConfig | undefined,
  methodConfig: BetMethodConfig | undefined,
  axisHorse: number | null,
  nagashiType: NagashiType
): number => {
  if (!betTypeConfig || !methodConfig) return 0;

  const betType = betTypeConfig.value;
  const method = methodConfig.value;
  const uniqueHorses = getUniqueCombinations(columnHorses);

  // 単勝・複勝
  if (betType === 'win' || betType === 'place') {
    return uniqueHorses;
  }

  // 枠連
  if (betType === 'wakuren') {
    if (method === 'single') {
      // 枠連の単式では、同じ枠の馬が複数列で選択されている場合は0点
      const [firstColumn = [], secondColumn = []] = columnHorses;

      // 同じ馬が選択されている場合は0点
      const hasSameHorse = firstColumn.some((horse) =>
        secondColumn.includes(horse)
      );
      if (hasSameHorse) return 0;

      // 同じ枠の馬が選択されている場合は0点
      let totalHorses = Math.max(...columnHorses.flat(), 0);
      // 選択範囲が少なく実頭数を推定できない場合は、枠連発売条件(9頭以上)に合わせて
      // デフォルトを16頭想定として扱う（一般的な2頭/枠配分）。
      if (totalHorses <= 8) totalHorses = 16;
      const hasSameWaku = firstColumn.some((horse) =>
        secondColumn.some(
          (otherHorse) =>
            getWakuNumber(horse, totalHorses) ===
            getWakuNumber(otherHorse, totalHorses)
        )
      );
      if (hasSameWaku) return 0;

      // 1着と2着にそれぞれ1頭ずつ選択されている場合、組み合わせは1つ
      if (firstColumn.length === 1 && secondColumn.length === 1) {
        return 1;
      }

      return 0;
    }
    if (method === 'box') return combination(uniqueHorses, 2);
    if (method === 'nagashi') {
      // 枠連の流し: UIで選択された相手枠数を点数にする（同一枠は重複排除、軸枠は除外）
      const selectedOpponents = columnHorses[1] || [];
      const baseSet = columnHorses.flat();
      if (baseSet.length === 0 || !axisHorse) return 0;

      let totalHorses = Math.max(...baseSet);
      if (totalHorses <= 8) totalHorses = 16;

      const axisWaku = getWakuNumber(axisHorse, totalHorses);
      const opponentWakuSet = new Set<number>();
      selectedOpponents.forEach((h) => {
        const w = getWakuNumber(h, totalHorses);
        if (w !== axisWaku) opponentWakuSet.add(w);
      });

      return opponentWakuSet.size;
    }
    if (method === 'formation') {
      // 枠連のフォーメーション: 選択された枠の組み合わせで点数計算
      const [firstColumn = [], secondColumn = []] = columnHorses;

      // 総頭数を正しく取得（選択された馬番の最大値から推定）
      const allHorses = [...firstColumn, ...secondColumn];
      let totalHorses = allHorses.length > 0 ? Math.max(...allHorses) : 0;
      if (totalHorses <= 8) totalHorses = 16;

      // 各列で選択された枠を取得
      const firstWakus = [
        ...new Set(
          firstColumn.map((horse) => getWakuNumber(horse, totalHorses))
        ),
      ];
      const secondWakus = [
        ...new Set(
          secondColumn.map((horse) => getWakuNumber(horse, totalHorses))
        ),
      ];

      // 枠の組み合わせ数を計算
      let combinations = 0;
      for (const firstWaku of firstWakus) {
        for (const secondWaku of secondWakus) {
          if (firstWaku !== secondWaku) {
            combinations++;
          }
        }
      }

      return combinations;
    }
  }

  // 馬連・ワイド
  if (betType === 'quinella' || betType === 'wide') {
    if (method === 'single') {
      // 馬連・ワイドの単式では、同じ馬が複数列で選択されている場合は0点
      const [firstColumn = [], secondColumn = []] = columnHorses;
      const hasSameHorse = firstColumn.some((horse) =>
        secondColumn.includes(horse)
      );
      if (hasSameHorse) return 0;

      // 1着と2着にそれぞれ1頭ずつ選択されている場合、組み合わせは1つ
      if (firstColumn.length === 1 && secondColumn.length === 1) return 1;

      return 0;
    }
    if (method === 'box') {
      return combination(uniqueHorses, 2);
    }
    if (method === 'nagashi') {
      const opponents = getOpponents(columnHorses, axisHorse, nagashiType);
      // 馬連・ワイドの流しは相手頭数分の点数
      return opponents.length;
    }
    if (method === 'formation') {
      return calculateFormationCombinations(columnHorses, false);
    }
  }

  // 馬単
  if (betType === 'exacta') {
    if (method === 'single') {
      return calculateExactaSingle(columnHorses);
    }
    if (method === 'box') {
      return permutation(uniqueHorses, 2);
    }
    if (method === 'nagashi') {
      const opponents = getOpponents(columnHorses, axisHorse, nagashiType);
      return calculateNagashiPoints(nagashiType, opponents, axisHorse);
    }
    if (method === 'formation') {
      return calculateFormationCombinations(columnHorses, true);
    }
  }

  // 三連複
  if (betType === 'trio') {
    if (method === 'single' || method === 'box') {
      return combination(uniqueHorses, 3);
    }
    if (method === 'formation') {
      return calculateFormationCombinations(columnHorses, false);
    }
    if (method === 'nagashi') {
      const opponents = getOpponents(columnHorses, axisHorse, nagashiType);
      if (nagashiType === 'multi1') {
        return combination(opponents.length, 2);
      }
      if (nagashiType === 'multi2') {
        return opponents.length;
      }
    }
  }

  // 三連単
  if (betType === 'trifecta') {
    if (method === 'single' || method === 'box') {
      return permutation(uniqueHorses, 3);
    }
    if (method === 'formation') {
      return calculateFormationCombinations(columnHorses, true);
    }
    if (method === 'nagashi') {
      const opponents = getOpponents(columnHorses, axisHorse, nagashiType);
      if (
        nagashiType === 'first' ||
        nagashiType === 'second' ||
        nagashiType === 'third'
      ) {
        return permutation(opponents.length, 2);
      }
      if (nagashiType === 'firstSecond') {
        return opponents.length;
      }
      if (nagashiType === 'multi1') {
        return permutation(opponents.length, 2) * 3;
      }
      if (nagashiType === 'multi2') {
        // 三連単の二頭軸流し: 相手頭数 × 6
        return opponents.length * 6;
      }
    }
  }

  return 0;
};
