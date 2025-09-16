import { createTheme } from '@mui/material/styles';
import {
  getChartColors,
  getGradientColors,
  getEvaluationColor,
  getGateColor,
} from '../themeColors';
import { describe, it, expect } from 'vitest';

describe('themeColors', () => {
  it('基本的なチャートカラーが取得できること', () => {
    // GIVEN
    const theme = createTheme();

    // WHEN
    const colors = getChartColors(theme);

    // THEN
    expect(colors.primary).toBe(theme.palette.primary.main);
    expect(colors.secondary).toBe(theme.palette.secondary.main);
    expect(colors.error).toBe(theme.palette.error.main);
    expect(colors.grey).toBe(theme.palette.grey[500]);
  });

  it('カスタムチャートカラーが取得できること', () => {
    // GIVEN
    const customTheme = createTheme({
      palette: {
        chart: {
          success: '#4CAF50',
          warning: '#FF9800',
          info: '#2196F3',
          purple: '#9C27B0',
        },
      },
    });

    // WHEN
    const colors = getChartColors(customTheme);

    // THEN
    expect(colors.success).toBe('#4CAF50');
    expect(colors.warning).toBe('#FF9800');
    expect(colors.info).toBe('#2196F3');
    expect(colors.purple).toBe('#9C27B0');
  });

  it('チャートカラーがない場合のフォールバックが動作すること', () => {
    // GIVEN
    const themeWithoutChart = createTheme({
      palette: {
        success: { main: '#2E7D32' },
        warning: { main: '#F57C00' },
        info: { main: '#1976D2' },
      },
    });

    // WHEN
    const colors = getChartColors(themeWithoutChart);

    // THEN
    expect(colors.success).toBe('#2E7D32');
    expect(colors.warning).toBe('#F57C00');
    expect(colors.info).toBe('#1976D2');
  });

  it('チャートカラーもsuccess/warning/infoもない場合のフォールバックが動作すること', () => {
    // GIVEN
    const minimalTheme = createTheme({
      palette: {
        primary: { main: '#1976D2' },
        secondary: { main: '#DC004E' },
        error: { main: '#F44336' },
        grey: { 500: '#9E9E9E' },
        // success, warning, infoを明示的にundefinedに設定
        success: undefined,
        warning: undefined,
        info: undefined,
      },
    });

    // WHEN
    const colors = getChartColors(minimalTheme);

    // THEN
    expect(colors.success).toBe('#9E9E9E');
    expect(colors.warning).toBe('#9E9E9E');
    expect(colors.info).toBe('#9E9E9E');
    expect(colors.purple).toBe('#9E9E9E');
  });

  it('グラデーションカラーが取得できること', () => {
    // GIVEN
    const theme = createTheme();

    // WHEN
    const gradients = getGradientColors(theme);

    // THEN
    expect(gradients.primary).toBeDefined();
    expect(gradients.secondary).toBeDefined();
    expect(gradients.success).toBeDefined();
    expect(gradients.warning).toBeDefined();
    expect(gradients.error).toBeDefined();
    expect(gradients.info).toBeDefined();
    expect(gradients.background).toBeDefined();
  });

  it('カスタムテーマでグラデーションカラーが取得できること', () => {
    // GIVEN
    const customTheme = createTheme({
      palette: {
        chart: {
          success: '#4CAF50',
          warning: '#FF9800',
          info: '#2196F3',
          purple: '#9C27B0',
        },
      },
    });

    // WHEN
    const gradients = getGradientColors(customTheme);

    // THEN
    expect(gradients.success).toBeDefined();
    expect(gradients.warning).toBeDefined();
    expect(gradients.info).toBeDefined();
    expect(gradients.purple).toBeDefined();
  });

  it('評価カラーが取得できること', () => {
    // GIVEN
    const theme = createTheme();

    // WHEN
    const sColor = getEvaluationColor('S', theme);
    const aColor = getEvaluationColor('A', theme);
    const bColor = getEvaluationColor('B', theme);
    const cColor = getEvaluationColor('C', theme);
    const dColor = getEvaluationColor('D', theme);
    const invalidColor = getEvaluationColor('X', theme);

    // THEN
    expect(sColor).toBeDefined();
    expect(aColor).toBeDefined();
    expect(bColor).toBeDefined();
    expect(cColor).toBeDefined();
    expect(dColor).toBeDefined();
    expect(invalidColor).toBe(theme.palette.grey[500]); // フォールバック
  });

  it('枠番カラーが取得できること', () => {
    // GIVEN
    const theme = createTheme();

    // WHEN
    const gate1Color = getGateColor(1, theme);
    const gate8Color = getGateColor(8, theme);
    const invalidGateColor = getGateColor(99, theme);

    // THEN
    expect(gate1Color).toBeDefined();
    expect(gate8Color).toBeDefined();
    expect(invalidGateColor).toEqual({
      bg: theme.palette.grey[300],
      text: theme.palette.grey[800],
    }); // フォールバック
  });

  it('評価カラーのフォールバックが正しく動作すること', () => {
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
    expect(color).toBe('#9E9E9E'); // フォールバック
  });

  it('枠番カラーのフォールバックが正しく動作すること', () => {
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
    expect(color).toEqual({
      bg: '#E0E0E0',
      text: '#424242',
    }); // フォールバック
  });
});
