import { Theme } from '@mui/material/styles';
import { getChartColors } from '../utils/themeColors';

// チャートデータ生成関数（テーマベース）
export const createChartData = (theme: Theme) => {
  const colors = getChartColors(theme);

  return {
    courseTendency: [
      { name: '先行有利', value: 45, color: colors.success },
      { name: '差し有利', value: 30, color: colors.info },
      { name: '逃げ有利', value: 15, color: colors.warning },
      { name: 'その他', value: 10, color: colors.grey },
    ],
    legQuality: [
      { name: '逃げ', value: 25, color: colors.error },
      { name: '先行', value: 35, color: colors.warning },
      { name: '差し', value: 30, color: colors.info },
      { name: '追込', value: 10, color: colors.purple },
    ],
    pedigreeAptitude: [
      { subject: 'スピード', A: 85, B: 70, fullMark: 100 },
      { subject: 'スタミナ', A: 75, B: 90, fullMark: 100 },
      { subject: '瞬発力', A: 95, B: 80, fullMark: 100 },
      { subject: '持久力', A: 70, B: 95, fullMark: 100 },
      { subject: '柔軟性', A: 80, B: 85, fullMark: 100 },
      { subject: 'バランス', A: 90, B: 80, fullMark: 100 },
    ],
  };
};
