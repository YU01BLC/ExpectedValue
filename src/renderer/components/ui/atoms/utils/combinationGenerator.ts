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
      // 2頭の組み合わせ: 1列目 × 2列目
      const firstColumn = columnHorses[0] || [];
      const secondColumn = columnHorses[1] || [];
      firstColumn.forEach((first) => {
        secondColumn.forEach((second) => {
          combinations.push([`${first}番`, `${second}番`]);
        });
      });
    } else if (betType.includes('trio') || betType.includes('trifecta')) {
      // 3頭の組み合わせ: 1列目 × 2列目 × 3列目
      const firstColumn = columnHorses[0] || [];
      const secondColumn = columnHorses[1] || [];
      const thirdColumn = columnHorses[2] || [];
      firstColumn.forEach((first) => {
        secondColumn.forEach((second) => {
          thirdColumn.forEach((third) => {
            combinations.push([`${first}番`, `${second}番`, `${third}番`]);
          });
        });
      });
    }
  } else if (method === 'formation') {
    // フォーメーション: 各列の馬の組み合わせ
    if (betType.includes('quinella') || betType.includes('wide')) {
      // 2頭の組み合わせ: 1列目 × 2列目（重複排除、順序関係なし）
      const firstColumn = columnHorses[0] || [];
      const secondColumn = columnHorses[1] || [];
      const addedCombinations = new Set<string>();

      firstColumn.forEach((first) => {
        secondColumn.forEach((second) => {
          if (first !== second) {
            // 馬連・ワイドでは順序が関係ないので、ソートして重複チェック
            const sorted = [first, second].sort((a, b) => a - b);
            const key = `${sorted[0]}-${sorted[1]}`;

            if (!addedCombinations.has(key)) {
              addedCombinations.add(key);
              combinations.push([`${first}番`, `${second}番`]);
            }
          }
        });
      });
    } else if (betType.includes('trio')) {
      // 三連複フォーメーション: 1列目 × 2列目 × 3列目（重複なし、順序関係なし）
      const firstColumn = columnHorses[0] || [];
      const secondColumn = columnHorses[1] || [];
      const thirdColumn = columnHorses[2] || [];
      const addedCombinations = new Set<string>();

      firstColumn.forEach((first) => {
        secondColumn.forEach((second) => {
          thirdColumn.forEach((third) => {
            // 同じ馬番号が重複しない場合のみ処理
            if (first !== second && first !== third && second !== third) {
              // 三連複では順序が関係ないので、ソートして重複チェック
              const sorted = [first, second, third].sort((a, b) => a - b);
              const key = `${sorted[0]}-${sorted[1]}-${sorted[2]}`;

              if (!addedCombinations.has(key)) {
                addedCombinations.add(key);
                combinations.push([`${first}番`, `${second}番`, `${third}番`]);
              }
            }
          });
        });
      });
    } else if (betType.includes('trifecta')) {
      // 三連単フォーメーション: 1列目 × 2列目 × 3列目（順序重要）
      const firstColumn = columnHorses[0] || [];
      const secondColumn = columnHorses[1] || [];
      const thirdColumn = columnHorses[2] || [];
      firstColumn.forEach((first) => {
        secondColumn.forEach((second) => {
          thirdColumn.forEach((third) => {
            combinations.push([`${first}番`, `${second}番`, `${third}番`]);
          });
        });
      });
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
  } else if (method === 'nagashi') {
    // 流し馬券の処理
    if (
      nagashiType === 'multi1' ||
      nagashiType === 'first' ||
      nagashiType === 'second' ||
      nagashiType === 'third'
    ) {
      // 1頭軸流し
      if (axisHorse) {
        const opponents = columnHorses[1] || [];
        const axisStr = `${axisHorse}番`;

        if (betType === 'exacta') {
          // 馬単: 軸馬 + 相手馬
          opponents.forEach((opponent) => {
            if (nagashiType === 'first') {
              combinations.push([axisStr, `${opponent}番`]);
            } else if (nagashiType === 'second') {
              combinations.push([`${opponent}番`, axisStr]);
            } else if (nagashiType === 'multi1') {
              // マルチ流し: 両方向
              combinations.push([axisStr, `${opponent}番`]);
              combinations.push([`${opponent}番`, axisStr]);
            }
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
          if (nagashiType === 'multi1') {
            // マルチ: 軸馬が3着以内ならOK
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
          } else {
            // 頭固定: 軸馬の位置固定
            for (let i = 0; i < opponents.length; i++) {
              for (let j = 0; j < opponents.length; j++) {
                if (i !== j) {
                  if (nagashiType === 'first') {
                    combinations.push([
                      axisStr,
                      `${opponents[i]}番`,
                      `${opponents[j]}番`,
                    ]);
                  } else if (nagashiType === 'second') {
                    combinations.push([
                      `${opponents[i]}番`,
                      axisStr,
                      `${opponents[j]}番`,
                    ]);
                  } else if (nagashiType === 'third') {
                    combinations.push([
                      `${opponents[i]}番`,
                      `${opponents[j]}番`,
                      axisStr,
                    ]);
                  }
                }
              }
            }
          }
        }
      }
    } else if (nagashiType === 'multi2') {
      // 2頭軸流しマルチ
      const axisHorses = columnHorses[0] || [];
      const opponents = columnHorses[1] || [];

      if (axisHorses.length >= 2) {
        if (betType === 'trio') {
          // 3連複: 軸馬2頭 + 相手馬1頭
          opponents.forEach((opponent) => {
            combinations.push([
              `${axisHorses[0]}番`,
              `${axisHorses[1]}番`,
              `${opponent}番`,
            ]);
          });
        } else if (betType === 'trifecta') {
          // 3連単: 軸馬2頭 + 相手馬1頭（マルチ）
          opponents.forEach((opponent) => {
            combinations.push([
              `${axisHorses[0]}番`,
              `${axisHorses[1]}番`,
              `${opponent}番`,
            ]);
            combinations.push([
              `${axisHorses[0]}番`,
              `${opponent}番`,
              `${axisHorses[1]}番`,
            ]);
            combinations.push([
              `${axisHorses[1]}番`,
              `${axisHorses[0]}番`,
              `${opponent}番`,
            ]);
            combinations.push([
              `${axisHorses[1]}番`,
              `${opponent}番`,
              `${axisHorses[0]}番`,
            ]);
            combinations.push([
              `${opponent}番`,
              `${axisHorses[0]}番`,
              `${axisHorses[1]}番`,
            ]);
            combinations.push([
              `${opponent}番`,
              `${axisHorses[1]}番`,
              `${axisHorses[0]}番`,
            ]);
          });
        }
      }
    } else if (nagashiType === 'firstSecond') {
      // 1着・2着固定流し
      const firstHorses = columnHorses[0] || [];
      const secondHorses = columnHorses[1] || [];
      const opponents = columnHorses[2] || [];

      if (firstHorses.length > 0 && secondHorses.length > 0) {
        if (betType === 'trifecta') {
          // 3連単: 1着・2着固定 + 3着流し
          firstHorses.forEach((first) => {
            secondHorses.forEach((second) => {
              opponents.forEach((opponent) => {
                combinations.push([
                  `${first}番`,
                  `${second}番`,
                  `${opponent}番`,
                ]);
              });
            });
          });
        }
      }
    }
  }

  return combinations;
};
