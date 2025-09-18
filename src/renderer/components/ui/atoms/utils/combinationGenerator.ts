import { type NagashiType } from '../types/purchaseForm';

// 組み合わせを生成する関数
export const generateTicketCombinations = (
  columnHorses: number[][],
  betType: string,
  method: string,
  axisHorse?: number | null,
  nagashiType?: NagashiType
): string[][] => {
  const combinations: string[][] = [];
  const horses = columnHorses.flat();

  if (betType === 'win' || betType === 'place') {
    // 単勝・複勝: 選択した馬それぞれが1点
    horses.forEach((horse) => {
      combinations.push([`${horse}番`]);
    });
  } else if (method === 'single') {
    // 単式: 各列の馬の組み合わせ
    if (betType.includes('quinella') || betType.includes('wide')) {
      // 2頭の組み合わせ
      for (let i = 0; i < horses.length; i++) {
        for (let j = i + 1; j < horses.length; j++) {
          combinations.push([`${horses[i]}番`, `${horses[j]}番`]);
        }
      }
    } else if (betType.includes('trio') || betType.includes('trifecta')) {
      // 3頭の組み合わせ
      for (let i = 0; i < horses.length; i++) {
        for (let j = i + 1; j < horses.length; j++) {
          for (let k = j + 1; k < horses.length; k++) {
            combinations.push([
              `${horses[i]}番`,
              `${horses[j]}番`,
              `${horses[k]}番`,
            ]);
          }
        }
      }
    }
  } else if (method === 'formation') {
    // フォーメーション: 各列の馬の組み合わせ
    // 簡略化のため、単式と同じ処理
    if (betType.includes('quinella') || betType.includes('wide')) {
      for (let i = 0; i < horses.length; i++) {
        for (let j = i + 1; j < horses.length; j++) {
          combinations.push([`${horses[i]}番`, `${horses[j]}番`]);
        }
      }
    } else if (betType.includes('trio') || betType.includes('trifecta')) {
      for (let i = 0; i < horses.length; i++) {
        for (let j = i + 1; j < horses.length; j++) {
          for (let k = j + 1; k < horses.length; k++) {
            combinations.push([
              `${horses[i]}番`,
              `${horses[j]}番`,
              `${horses[k]}番`,
            ]);
          }
        }
      }
    }
  } else if (method === 'box') {
    // ボックス: 全馬の組み合わせ
    if (betType.includes('quinella') || betType.includes('wide')) {
      for (let i = 0; i < horses.length; i++) {
        for (let j = i + 1; j < horses.length; j++) {
          combinations.push([`${horses[i]}番`, `${horses[j]}番`]);
        }
      }
    } else if (betType.includes('trio') || betType.includes('trifecta')) {
      for (let i = 0; i < horses.length; i++) {
        for (let j = i + 1; j < horses.length; j++) {
          for (let k = j + 1; k < horses.length; k++) {
            combinations.push([
              `${horses[i]}番`,
              `${horses[j]}番`,
              `${horses[k]}番`,
            ]);
          }
        }
      }
    }
  } else if (method === 'nagashi1' && axisHorse) {
    // 1頭軸流し: 軸馬1頭 + 相手馬の組み合わせ
    const opponents = columnHorses[1] || [];
    const axisStr = `${axisHorse}番`;

    if (betType === 'quinella' || betType === 'wide') {
      // 馬連・ワイド: 軸馬 + 相手馬
      opponents.forEach((opponent) => {
        combinations.push([axisStr, `${opponent}番`]);
      });
    } else if (betType === 'trio') {
      // 3連複: 軸馬 + 相手馬2頭の組み合わせ
      for (let i = 0; i < opponents.length; i++) {
        for (let j = i + 1; j < opponents.length; j++) {
          combinations.push([
            axisStr,
            `${opponents[i]}番`,
            `${opponents[j]}番`,
          ]);
        }
      }
    } else if (betType === 'trifecta') {
      // 3連単: 軸馬 + 相手馬2頭
      if (nagashiType === 'multi1' || nagashiType === 'multi2') {
        // マルチ: 組み合わせ
        for (let i = 0; i < opponents.length; i++) {
          for (let j = i + 1; j < opponents.length; j++) {
            combinations.push([
              axisStr,
              `${opponents[i]}番`,
              `${opponents[j]}番`,
            ]);
          }
        }
      } else {
        // 頭固定: 順列
        for (let i = 0; i < opponents.length; i++) {
          for (let j = 0; j < opponents.length; j++) {
            if (i !== j) {
              combinations.push([
                axisStr,
                `${opponents[i]}番`,
                `${opponents[j]}番`,
              ]);
            }
          }
        }
      }
    }
  } else if (method === 'nagashi2') {
    // 2頭軸流し: 軸馬2頭 + 相手馬の組み合わせ
    const axisHorses = columnHorses[0] || [];
    const opponents = columnHorses[1] || [];

    if (axisHorses.length >= 2) {
      if (betType === 'quinella' || betType === 'wide') {
        // 馬連・ワイド: 軸馬2頭の組み合わせのみ
        combinations.push([`${axisHorses[0]}番`, `${axisHorses[1]}番`]);
      } else if (betType === 'trio') {
        // 3連複: 軸馬2頭 + 相手馬1頭（マルチ・頭固定関係なし）
        opponents.forEach((opponent) => {
          combinations.push([
            `${axisHorses[0]}番`,
            `${axisHorses[1]}番`,
            `${opponent}番`,
          ]);
        });
      } else if (betType === 'trifecta') {
        // 3連単: 軸馬2頭 + 相手馬1頭
        if (nagashiType === 'multi1' || nagashiType === 'multi2') {
          // マルチ: 軸馬2頭の順序を考慮しない
          opponents.forEach((opponent) => {
            combinations.push([
              `${axisHorses[0]}番`,
              `${axisHorses[1]}番`,
              `${opponent}番`,
            ]);
          });
        } else {
          // 頭固定: 軸馬2頭の順序を考慮する
          opponents.forEach((opponent) => {
            combinations.push([
              `${axisHorses[0]}番`,
              `${axisHorses[1]}番`,
              `${opponent}番`,
            ]);
            combinations.push([
              `${axisHorses[1]}番`,
              `${axisHorses[0]}番`,
              `${opponent}番`,
            ]);
          });
        }
      }
    }
  }

  return combinations;
};
