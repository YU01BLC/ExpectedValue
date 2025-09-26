import { useState, useCallback } from 'react';
import { type NagashiType, type Horse } from '../types/purchaseForm';

export const useBetSelection = (horses: Horse[]) => {
  const [selectedBetType, setSelectedBetType] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [columnHorses, setColumnHorses] = useState<number[][]>([]);
  const [axisHorse, setAxisHorse] = useState<number | null>(null);
  const [nagashiType, setNagashiType] = useState<NagashiType>('multi1');

  // 馬を選択/選択解除（列ごと）
  // 枠番を計算する関数
  const getWakuNumber = (horseNumber: number): number => {
    return Math.ceil(horseNumber / 2);
  };

  const handleHorseToggle = useCallback(
    (horseNumber: number, columnIndex: number) => {
      setColumnHorses((prevColumns) => {
        const newColumns = [...prevColumns];
        const column = newColumns[columnIndex] || [];
        const isSelected = column.includes(horseNumber);

        if (isSelected) {
          newColumns[columnIndex] = column.filter((h) => h !== horseNumber);
        } else {
          // 単勝・複勝は複数頭選択可能、その他の単式は1頭まで
          const maxHorses =
            selectedBetType === 'win' || selectedBetType === 'place'
              ? horses.length // 単勝・複勝は出馬頭数まで選択可能
              : selectedMethod === 'single'
              ? 1
              : horses.length; // その他は単式なら1頭まで、それ以外は出馬頭数まで

          // 枠連の単式では、同じ枠の馬を複数列で選択できない
          if (selectedMethod === 'single' && selectedBetType === 'wakuren') {
            const currentWaku = getWakuNumber(horseNumber);
            // 他の列で同じ枠の馬が選択されているかチェック
            const isSameWakuSelectedInOtherColumn = newColumns.some(
              (col, idx) =>
                idx !== columnIndex &&
                col.some((h) => getWakuNumber(h) === currentWaku)
            );
            if (isSameWakuSelectedInOtherColumn) {
              return prevColumns; // 選択を拒否
            }
          }
          // その他の馬券種別では、同じ馬を複数列で選択できない（順序が重要な馬券種別）
          else if (
            selectedMethod === 'single' &&
            (selectedBetType === 'exacta' ||
              selectedBetType === 'trifecta' ||
              selectedBetType === 'quinella' ||
              selectedBetType === 'wide')
          ) {
            // 他の列で同じ馬が選択されているかチェック
            const isAlreadySelectedInOtherColumn = newColumns.some(
              (col, idx) => idx !== columnIndex && col.includes(horseNumber)
            );
            if (isAlreadySelectedInOtherColumn) {
              return prevColumns; // 選択を拒否
            }
          }

          if (column.length < maxHorses) {
            newColumns[columnIndex] = [...column, horseNumber];
          }
        }
        return newColumns;
      });
    },
    [selectedBetType, selectedMethod, horses.length]
  );

  // 軸馬を選択/選択解除（流し馬券用）
  const handleAxisHorseToggle = useCallback((horseNumber: number) => {
    setAxisHorse((prev) => (prev === horseNumber ? null : horseNumber));
  }, []);

  // 馬券種別変更時のリセット
  const handleBetTypeChange = useCallback(
    (betType: string) => {
      setSelectedBetType(betType);
      // 単勝・複勝の場合は自動的に単式を選択
      if (betType === 'win' || betType === 'place') {
        setSelectedMethod('single');
      } else {
        setSelectedMethod('');
      }
      setColumnHorses([]);
      setAxisHorse(null);

      // 各馬券種別で無効な流しタイプをリセット
      if (betType === 'exacta') {
        // 馬単: 3着固定、1着・2着固定、軸2頭流しは無効
        if (
          nagashiType === 'third' ||
          nagashiType === 'firstSecond' ||
          nagashiType === 'multi2'
        ) {
          setNagashiType('multi1');
        }
      } else if (betType === 'wide' || betType === 'quinella') {
        // ワイド・馬連: 固定流しと軸2頭流しは無効
        if (
          nagashiType === 'first' ||
          nagashiType === 'second' ||
          nagashiType === 'third' ||
          nagashiType === 'firstSecond' ||
          nagashiType === 'multi2'
        ) {
          setNagashiType('multi1');
        }
      } else if (betType === 'wakuren') {
        // 枠連: 固定流しと軸2頭流しは無効（軸1頭流しマルチのみ）
        if (
          nagashiType === 'first' ||
          nagashiType === 'second' ||
          nagashiType === 'third' ||
          nagashiType === 'firstSecond' ||
          nagashiType === 'multi2'
        ) {
          setNagashiType('multi1');
        }
      } else if (betType === 'trio') {
        // 三連複: 固定流しは無効（軸2頭流しは有効）
        if (
          nagashiType === 'first' ||
          nagashiType === 'second' ||
          nagashiType === 'third' ||
          nagashiType === 'firstSecond'
        ) {
          setNagashiType('multi1');
        }
      }
    },
    [nagashiType]
  );

  // 買い方変更時のリセット
  const handleMethodChange = useCallback((method: string) => {
    setSelectedMethod(method);
    setColumnHorses([]);
    setAxisHorse(null);
  }, []);

  // 流し馬券タイプ変更時のリセット
  const handleNagashiTypeChange = useCallback((type: NagashiType) => {
    setNagashiType(type);
    setColumnHorses([]);
    setAxisHorse(null);
  }, []);

  // フォームリセット
  const resetForm = useCallback(() => {
    setSelectedBetType('');
    setSelectedMethod('');
    setColumnHorses([]);
    setAxisHorse(null);
  }, []);

  return {
    selectedBetType,
    selectedMethod,
    columnHorses,
    axisHorse,
    nagashiType,
    handleHorseToggle,
    handleAxisHorseToggle,
    handleBetTypeChange,
    handleMethodChange,
    handleNagashiTypeChange,
    resetForm,
    setNagashiType,
  };
};
