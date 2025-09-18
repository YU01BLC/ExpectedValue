import { useState, useCallback } from 'react';
import { type NagashiType, type Horse } from '../types/purchaseForm';

export const useBetSelection = (horses: Horse[]) => {
  const [selectedBetType, setSelectedBetType] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [columnHorses, setColumnHorses] = useState<number[][]>([]);
  const [axisHorse, setAxisHorse] = useState<number | null>(null);
  const [nagashiType, setNagashiType] = useState<NagashiType>('multi1');

  // 馬を選択/選択解除（列ごと）
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
  const handleBetTypeChange = useCallback((betType: string) => {
    setSelectedBetType(betType);
    // 単勝・複勝の場合は自動的に単式を選択
    if (betType === 'win' || betType === 'place') {
      setSelectedMethod('single');
    } else {
      setSelectedMethod('');
    }
    setColumnHorses([]);
    setAxisHorse(null);
  }, []);

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
