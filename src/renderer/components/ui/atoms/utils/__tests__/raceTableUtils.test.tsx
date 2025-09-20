import { createTheme } from '@mui/material/styles';
import { describe, it, expect } from 'vitest';
import {
  getEvaluationColor,
  getGateColor,
  sortHorseData,
} from '../raceTableUtils';
import type {
  HorseData,
  SortField,
  SortDirection,
} from '../../types/raceTable';

describe('raceTableUtils', () => {
  const mockTheme = createTheme({
    palette: {
      evaluation: {
        S: '#4CAF50',
        A: '#2196F3',
        B: '#FF9800',
        C: '#FF5722',
        D: '#9E9E9E',
      },
      gate: {
        1: { bg: '#FFFFFF', text: '#000000' },
        2: { bg: '#000000', text: '#FFFFFF' },
        3: { bg: '#FF0000', text: '#FFFFFF' },
        4: { bg: '#0000FF', text: '#FFFFFF' },
        5: { bg: '#FFFF00', text: '#000000' },
        6: { bg: '#00FF00', text: '#000000' },
        7: { bg: '#FFA500', text: '#FFFFFF' },
        8: { bg: '#FF69B4', text: '#FFFFFF' },
        default: { bg: '#E0E0E0', text: '#2D3436' },
      },
      grey: {
        300: '#E0E0E0',
        500: '#9E9E9E',
        800: '#424242',
      },
    },
  });

  const mockHorseData: HorseData[] = [
    {
      id: '1',
      name: '馬1',
      horseNumber: 1,
      gateNumber: 1,
      evaluation: 'S',
      expectedValue: 1.5,
      odds: 3.2,
      comment: 'コメント1',
    },
    {
      id: '2',
      name: '馬2',
      horseNumber: 2,
      gateNumber: 2,
      evaluation: 'A',
      expectedValue: 1.2,
      odds: 4.5,
      comment: 'コメント2',
    },
    {
      id: '3',
      name: '馬3',
      horseNumber: 3,
      gateNumber: 3,
      evaluation: 'B',
      expectedValue: 0.8,
      odds: 6.0,
      comment: 'コメント3',
    },
  ];

  describe('getEvaluationColor', () => {
    it('有効な評価の色が取得できること', () => {
      // GIVEN
      const evaluation = 'S';

      // WHEN
      const color = getEvaluationColor(evaluation, mockTheme);

      // THEN
      expect(color).toBe('#4CAF50');
    });

    it('全ての評価の色が取得できること', () => {
      // GIVEN & WHEN & THEN
      expect(getEvaluationColor('S', mockTheme)).toBe('#4CAF50');
      expect(getEvaluationColor('A', mockTheme)).toBe('#2196F3');
      expect(getEvaluationColor('B', mockTheme)).toBe('#FF9800');
      expect(getEvaluationColor('C', mockTheme)).toBe('#FF5722');
      expect(getEvaluationColor('D', mockTheme)).toBe('#9E9E9E');
    });

    it('無効な評価の場合、デフォルト色が返されること', () => {
      // GIVEN
      const invalidEvaluation = 'X';

      // WHEN
      const color = getEvaluationColor(invalidEvaluation, mockTheme);

      // THEN
      expect(color).toBe('#9E9E9E'); // theme.palette.grey[500]
    });

    it('評価カラーが未定義の場合、デフォルト色が返されること', () => {
      // GIVEN
      const themeWithoutEvaluation = createTheme({
        palette: {
          evaluation: undefined,
          grey: { 500: '#9E9E9E' },
        },
      });

      // WHEN
      const color = getEvaluationColor('S', themeWithoutEvaluation);

      // THEN
      expect(color).toBe('#9E9E9E');
    });

    it('評価カラーとDカラーが未定義の場合、グレー色が返されること', () => {
      // GIVEN
      const themeWithoutEvaluation = createTheme({
        palette: {
          evaluation: undefined,
          grey: { 500: '#9E9E9E' },
        },
      });

      // WHEN
      const color = getEvaluationColor('S', themeWithoutEvaluation);

      // THEN
      expect(color).toBe('#9E9E9E');
    });
  });

  describe('getGateColor', () => {
    it('有効な枠番の色が取得できること', () => {
      // GIVEN
      const gateNumber = 1;

      // WHEN
      const color = getGateColor(gateNumber, mockTheme);

      // THEN
      expect(color).toEqual({ bg: '#FFFFFF', text: '#000000' });
    });

    it('全ての枠番の色が取得できること', () => {
      // GIVEN & WHEN & THEN
      expect(getGateColor(1, mockTheme)).toEqual({
        bg: '#FFFFFF',
        text: '#000000',
      });
      expect(getGateColor(2, mockTheme)).toEqual({
        bg: '#000000',
        text: '#FFFFFF',
      });
      expect(getGateColor(3, mockTheme)).toEqual({
        bg: '#FF0000',
        text: '#FFFFFF',
      });
      expect(getGateColor(4, mockTheme)).toEqual({
        bg: '#0000FF',
        text: '#FFFFFF',
      });
      expect(getGateColor(5, mockTheme)).toEqual({
        bg: '#FFFF00',
        text: '#000000',
      });
      expect(getGateColor(6, mockTheme)).toEqual({
        bg: '#00FF00',
        text: '#000000',
      });
      expect(getGateColor(7, mockTheme)).toEqual({
        bg: '#FFA500',
        text: '#FFFFFF',
      });
      expect(getGateColor(8, mockTheme)).toEqual({
        bg: '#FF69B4',
        text: '#FFFFFF',
      });
    });

    it('無効な枠番の場合、デフォルト色が返されること', () => {
      // GIVEN
      const invalidGateNumber = 99;

      // WHEN
      const color = getGateColor(invalidGateNumber, mockTheme);

      // THEN
      expect(color).toEqual({ bg: '#FF0000', text: '#FFFFFF' }); // 3枠の色（99 % 8 = 3）
    });

    it('枠番カラーが未定義の場合、デフォルト色が返されること', () => {
      // GIVEN
      const themeWithoutGate = createTheme({
        palette: {
          gate: undefined,
          grey: { 300: '#E0E0E0', 800: '#424242' },
        },
      });

      // WHEN
      const color = getGateColor(1, themeWithoutGate);

      // THEN
      expect(color).toEqual({ bg: '#FFFFFF', text: '#000000' }); // 1枠の色（デフォルト）
    });

    it('枠番カラーとデフォルトカラーが未定義の場合、グレー色が返されること', () => {
      // GIVEN
      const themeWithoutGate = createTheme({
        palette: {
          gate: undefined,
          grey: { 300: '#E0E0E0', 800: '#424242' },
        },
      });

      // WHEN
      const color = getGateColor(99, themeWithoutGate);

      // THEN
      expect(color).toEqual({ bg: '#FF0000', text: '#FFFFFF' }); // 3枠の色（99 % 8 = 3）
    });
  });

  describe('sortHorseData', () => {
    it('sortFieldがnullの場合、元のデータがそのまま返されること', () => {
      // GIVEN
      const sortField = null;
      const sortDirection: SortDirection = 'asc';

      // WHEN
      const result = sortHorseData(mockHorseData, sortField, sortDirection);

      // THEN
      expect(result).toEqual(mockHorseData);
    });

    it('馬番で昇順ソートが正しく動作すること', () => {
      // GIVEN
      const sortField: SortField = 'horseNumber';
      const sortDirection: SortDirection = 'asc';

      // WHEN
      const result = sortHorseData(mockHorseData, sortField, sortDirection);

      // THEN
      expect(result[0].horseNumber).toBe(1);
      expect(result[1].horseNumber).toBe(2);
      expect(result[2].horseNumber).toBe(3);
    });

    it('馬番で降順ソートが正しく動作すること', () => {
      // GIVEN
      const sortField: SortField = 'horseNumber';
      const sortDirection: SortDirection = 'desc';

      // WHEN
      const result = sortHorseData(mockHorseData, sortField, sortDirection);

      // THEN
      expect(result[0].horseNumber).toBe(3);
      expect(result[1].horseNumber).toBe(2);
      expect(result[2].horseNumber).toBe(1);
    });

    it('枠番で昇順ソートが正しく動作すること', () => {
      // GIVEN
      const sortField: SortField = 'gateNumber';
      const sortDirection: SortDirection = 'asc';

      // WHEN
      const result = sortHorseData(mockHorseData, sortField, sortDirection);

      // THEN
      expect(result[0].gateNumber).toBe(1);
      expect(result[1].gateNumber).toBe(2);
      expect(result[2].gateNumber).toBe(3);
    });

    it('評価で昇順ソートが正しく動作すること（D > C > B > A > S）', () => {
      // GIVEN
      const horseDataWithDifferentEvaluations: HorseData[] = [
        { ...mockHorseData[0], evaluation: 'B' },
        { ...mockHorseData[1], evaluation: 'S' },
        { ...mockHorseData[2], evaluation: 'A' },
      ];
      const sortField: SortField = 'evaluation';
      const sortDirection: SortDirection = 'asc';

      // WHEN
      const result = sortHorseData(
        horseDataWithDifferentEvaluations,
        sortField,
        sortDirection
      );

      // THEN
      expect(result[0].evaluation).toBe('B'); // 数値が小さい順（B=3）
      expect(result[1].evaluation).toBe('A'); // 数値が小さい順（A=4）
      expect(result[2].evaluation).toBe('S'); // 数値が小さい順（S=5）
    });

    it('評価で降順ソートが正しく動作すること（S > A > B > C > D）', () => {
      // GIVEN
      const horseDataWithDifferentEvaluations: HorseData[] = [
        { ...mockHorseData[0], evaluation: 'B' },
        { ...mockHorseData[1], evaluation: 'S' },
        { ...mockHorseData[2], evaluation: 'A' },
      ];
      const sortField: SortField = 'evaluation';
      const sortDirection: SortDirection = 'desc';

      // WHEN
      const result = sortHorseData(
        horseDataWithDifferentEvaluations,
        sortField,
        sortDirection
      );

      // THEN
      expect(result[0].evaluation).toBe('S'); // 数値が大きい順（S=5）
      expect(result[1].evaluation).toBe('A'); // 数値が大きい順（A=4）
      expect(result[2].evaluation).toBe('B'); // 数値が大きい順（B=3）
    });

    it('期待値で昇順ソートが正しく動作すること', () => {
      // GIVEN
      const sortField: SortField = 'expectedValue';
      const sortDirection: SortDirection = 'asc';

      // WHEN
      const result = sortHorseData(mockHorseData, sortField, sortDirection);

      // THEN
      expect(result[0].expectedValue).toBe(0.8);
      expect(result[1].expectedValue).toBe(1.2);
      expect(result[2].expectedValue).toBe(1.5);
    });

    it('期待値で降順ソートが正しく動作すること', () => {
      // GIVEN
      const sortField: SortField = 'expectedValue';
      const sortDirection: SortDirection = 'desc';

      // WHEN
      const result = sortHorseData(mockHorseData, sortField, sortDirection);

      // THEN
      expect(result[0].expectedValue).toBe(1.5);
      expect(result[1].expectedValue).toBe(1.2);
      expect(result[2].expectedValue).toBe(0.8);
    });

    it('オッズで昇順ソートが正しく動作すること', () => {
      // GIVEN
      const sortField: SortField = 'odds';
      const sortDirection: SortDirection = 'asc';

      // WHEN
      const result = sortHorseData(mockHorseData, sortField, sortDirection);

      // THEN
      expect(result[0].odds).toBe(3.2);
      expect(result[1].odds).toBe(4.5);
      expect(result[2].odds).toBe(6.0);
    });

    it('オッズで降順ソートが正しく動作すること', () => {
      // GIVEN
      const sortField: SortField = 'odds';
      const sortDirection: SortDirection = 'desc';

      // WHEN
      const result = sortHorseData(mockHorseData, sortField, sortDirection);

      // THEN
      expect(result[0].odds).toBe(6.0);
      expect(result[1].odds).toBe(4.5);
      expect(result[2].odds).toBe(3.2);
    });

    it('同じ値の場合、元の順序が保持されること', () => {
      // GIVEN
      const horseDataWithSameValues: HorseData[] = [
        { ...mockHorseData[0], expectedValue: 1.0 },
        { ...mockHorseData[1], expectedValue: 1.0 },
        { ...mockHorseData[2], expectedValue: 1.0 },
      ];
      const sortField: SortField = 'expectedValue';
      const sortDirection: SortDirection = 'asc';

      // WHEN
      const result = sortHorseData(
        horseDataWithSameValues,
        sortField,
        sortDirection
      );

      // THEN
      expect(result[0].id).toBe('1');
      expect(result[1].id).toBe('2');
      expect(result[2].id).toBe('3');
    });

    it('元のデータが変更されないこと（イミュータブル）', () => {
      // GIVEN
      const originalData = [...mockHorseData];
      const sortField: SortField = 'horseNumber';
      const sortDirection: SortDirection = 'asc';

      // WHEN
      sortHorseData(mockHorseData, sortField, sortDirection);

      // THEN
      expect(mockHorseData).toEqual(originalData);
    });
  });
});
