import { type NagashiType } from '../types/purchaseForm';

// 金額のバリデーション
export const isAmountValid = (amount: string): boolean => {
  const amountNum = parseInt(amount, 10);
  return !isNaN(amountNum) && amountNum >= 100 && amountNum % 100 === 0;
};

// 流し馬券のバリデーション
export const validateNagashiSelection = (
  nagashiType: NagashiType,
  axisHorse: number | null,
  columnHorses: number[][]
): string | null => {
  if (nagashiType === 'first') {
    if (!axisHorse || !columnHorses[1] || columnHorses[1].length === 0) {
      return 'errors.firstFixedHorsesRequired';
    }
  } else if (nagashiType === 'second') {
    if (!axisHorse || !columnHorses[1] || columnHorses[1].length === 0) {
      return 'errors.secondFixedHorsesRequired';
    }
  } else if (nagashiType === 'third') {
    if (!axisHorse || !columnHorses[1] || columnHorses[1].length === 0) {
      return 'errors.thirdFixedHorsesRequired';
    }
  } else if (nagashiType === 'firstSecond') {
    if (
      !columnHorses[0] ||
      columnHorses[0].length === 0 ||
      !columnHorses[1] ||
      columnHorses[1].length === 0 ||
      !columnHorses[2] ||
      columnHorses[2].length === 0
    ) {
      return 'errors.firstSecondFixedHorsesRequired';
    }
  } else if (nagashiType === 'multi1') {
    if (!axisHorse || !columnHorses[1] || columnHorses[1].length === 0) {
      return 'errors.multi1AxisHorsesRequired';
    }
  } else if (nagashiType === 'multi2') {
    if (
      !columnHorses[0] ||
      columnHorses[0].length < 2 ||
      !columnHorses[1] ||
      columnHorses[1].length === 0
    ) {
      return 'errors.multi2AxisHorsesRequired';
    }
  }
  return null;
};

// 馬券追加のバリデーション
export const validateTicketAddition = (
  selectedBetType: string,
  selectedMethod: string,
  columnHorses: number[][],
  amount: string,
  nagashiType: NagashiType,
  axisHorse: number | null,
  combinations: number
): string | null => {
  if (!selectedBetType) {
    return 'errors.betTypeRequired';
  }

  if (!selectedMethod) {
    return 'errors.methodRequired';
  }

  if (selectedMethod === 'nagashi') {
    const nagashiError = validateNagashiSelection(
      nagashiType,
      axisHorse,
      columnHorses
    );
    if (nagashiError) return nagashiError;
  } else {
    if (columnHorses.flat().length === 0) {
      return 'errors.horsesRequired';
    }
  }

  const amountNum = parseInt(amount, 10);
  if (isNaN(amountNum) || amountNum < 100) {
    return 'errors.amountRequired';
  }

  if (combinations === 0) {
    return 'errors.noValidCombinations';
  }

  return null;
};
