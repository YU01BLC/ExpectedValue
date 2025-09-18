import {
  type BetTypeConfig,
  type BetMethodConfig,
  type NagashiType,
} from '../types/purchaseForm';

// 組み合わせ数を計算する関数
export const calculateCombinations = (
  columnHorses: number[][],
  betTypeConfig: BetTypeConfig | undefined,
  methodConfig: BetMethodConfig | undefined,
  axisHorse: number | null,
  nagashiType: NagashiType
): number => {
  if (!betTypeConfig || !methodConfig) return 0;

  if (methodConfig.value === 'single') {
    // 単式: 各列の馬の数の積
    return columnHorses.reduce(
      (total, column) => total * Math.max(column.length, 1),
      1
    );
  } else if (methodConfig.value === 'formation') {
    // フォーメーション: 各列の馬の数の積
    return columnHorses.reduce(
      (total, column) => total * Math.max(column.length, 1),
      1
    );
  } else if (methodConfig.value === 'box') {
    // ボックス: 全馬の組み合わせ
    const allHorses = columnHorses.flat();
    if (
      betTypeConfig.value.includes('quinella') ||
      betTypeConfig.value.includes('wide')
    ) {
      // 2頭の組み合わせ
      return (allHorses.length * (allHorses.length - 1)) / 2;
    } else if (
      betTypeConfig.value.includes('trio') ||
      betTypeConfig.value.includes('trifecta')
    ) {
      // 3頭の組み合わせ
      return (
        (allHorses.length * (allHorses.length - 1) * (allHorses.length - 2)) / 6
      );
    }
  } else if (methodConfig.value === 'nagashi') {
    // 流し馬券
    if (nagashiType === 'first') {
      // 1着固定流し
      if (!axisHorse) return 0;
      const opponents = columnHorses[1] || [];
      if (opponents.length === 0) return 0;

      if (betTypeConfig.value === 'exacta') {
        // 馬単: 1着固定 + 2着流し
        return opponents.length;
      } else if (betTypeConfig.value === 'trifecta') {
        // 3連単: 1着固定 + 2着・3着流し
        if (opponents.length < 2) return 0;
        return opponents.length * (opponents.length - 1);
      }
    } else if (nagashiType === 'second') {
      // 2着固定流し
      if (!axisHorse) return 0;
      const opponents = columnHorses[1] || [];
      if (opponents.length === 0) return 0;

      if (betTypeConfig.value === 'exacta') {
        // 馬単: 2着固定 + 1着流し
        return opponents.length;
      } else if (betTypeConfig.value === 'trifecta') {
        // 3連単: 2着固定 + 1着・3着流し
        if (opponents.length < 2) return 0;
        return opponents.length * (opponents.length - 1);
      }
    } else if (nagashiType === 'third') {
      // 3着固定流し
      if (!axisHorse) return 0;
      const opponents = columnHorses[1] || [];
      if (opponents.length === 0) return 0;

      if (betTypeConfig.value === 'trifecta') {
        // 3連単: 3着固定 + 1着・2着流し
        if (opponents.length < 2) return 0;
        return opponents.length * (opponents.length - 1);
      }
    } else if (nagashiType === 'firstSecond') {
      // 1着・2着固定流し
      const firstHorses = columnHorses[0] || [];
      const secondHorses = columnHorses[1] || [];
      const opponents = columnHorses[2] || [];
      if (
        firstHorses.length === 0 ||
        secondHorses.length === 0 ||
        opponents.length === 0
      )
        return 0;

      if (betTypeConfig.value === 'trifecta') {
        // 3連単: 1着・2着固定 + 3着流し
        return opponents.length;
      }
    } else if (nagashiType === 'multi1') {
      // 軸1頭流しマルチ
      if (!axisHorse) return 0;
      const opponents = columnHorses[1] || [];
      if (opponents.length === 0) return 0;

      if (betTypeConfig.value === 'exacta') {
        // 馬単: 軸1頭 + 相手馬流し（マルチ流し）
        return opponents.length * 2;
      } else if (betTypeConfig.value === 'trio') {
        // 3連複: 軸1頭流し
        if (opponents.length < 2) return 0;
        return (opponents.length * (opponents.length - 1)) / 2;
      } else if (betTypeConfig.value === 'trifecta') {
        // 3連単: 軸1頭流しマルチ
        if (opponents.length < 2) return 0;
        return opponents.length * (opponents.length - 1) * 3;
      }
    } else if (nagashiType === 'multi2') {
      // 軸2頭流しマルチ
      const axisHorses = columnHorses[0] || [];
      const opponents = columnHorses[1] || [];
      if (axisHorses.length < 2 || opponents.length === 0) return 0;

      if (betTypeConfig.value === 'trio') {
        // 3連複: 軸2頭流し
        return opponents.length;
      } else if (betTypeConfig.value === 'trifecta') {
        // 3連単: 軸2頭流しマルチ
        return opponents.length * 6;
      }
    }
  }
  return 0;
};
