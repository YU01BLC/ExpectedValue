import { Theme } from '@mui/material/styles';

// 評価の色を取得する関数（テーマカラー使用）
export const getEvaluationColor = (
  evaluation: string,
  theme: Theme
): string => {
  return (
    theme.palette.evaluation?.[
      evaluation as keyof typeof theme.palette.evaluation
    ] ||
    theme.palette.evaluation?.D ||
    theme.palette.grey[500]
  );
};

// 枠番の色を取得する関数（テーマカラー使用）
export const getGateColor = (gateNumber: number, theme: Theme) => {
  return (
    theme.palette.gate?.[gateNumber as keyof typeof theme.palette.gate] ||
    theme.palette.gate?.default || {
      bg: theme.palette.grey[300],
      text: theme.palette.grey[800],
    }
  );
};

// チャート用のカラーパレット（テーマベース）
export const getChartColors = (theme: Theme) => ({
  primary: theme.palette.primary.main,
  secondary: theme.palette.secondary.main,
  success:
    theme.palette.chart?.success ||
    theme.palette.success?.main ||
    theme.palette.grey[500],
  warning:
    theme.palette.chart?.warning ||
    theme.palette.warning?.main ||
    theme.palette.grey[500],
  error: theme.palette.error.main,
  info:
    theme.palette.chart?.info ||
    theme.palette.info?.main ||
    theme.palette.grey[500],
  purple: theme.palette.chart?.purple || theme.palette.grey[500],
  grey: theme.palette.grey[500],
});

// グラデーションカラー（テーマベース）
export const getGradientColors = (theme: Theme) => {
  const chartColors = getChartColors(theme);
  return {
    primary: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    secondary: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
    success: `linear-gradient(135deg, ${chartColors.success} 0%, ${chartColors.success}80 100%)`,
    warning: `linear-gradient(135deg, ${chartColors.warning} 0%, ${chartColors.warning}80 100%)`,
    error: `linear-gradient(135deg, ${chartColors.error} 0%, ${chartColors.error}80 100%)`,
    info: `linear-gradient(135deg, ${chartColors.info} 0%, ${chartColors.info}80 100%)`,
    purple: `linear-gradient(135deg, ${chartColors.purple} 0%, ${chartColors.purple}80 100%)`,
    background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
  };
};
