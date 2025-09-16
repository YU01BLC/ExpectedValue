import { useTheme } from '@mui/material/styles';
import type { Palette } from '@mui/material/styles';

/**
 * テーマパレットキーが有効かどうかをチェックする型ガード
 */
const isValidPaletteKey = (
  key: string,
  palette: Palette
): key is keyof Palette => {
  if (!(key in palette)) return false;

  const paletteValue = palette[key as keyof Palette];
  if (!paletteValue || typeof paletteValue !== 'object') return false;

  return (
    'main' in paletteValue &&
    typeof (paletteValue as { main: string }).main === 'string'
  );
};

/**
 * テーマカラーを解決するカスタムフック
 *
 * @param colorKey - テーマパレットのキーまたはカラーコード
 * @param fallback - フォールバック値
 * @returns 解決されたカラー値
 */
export const useThemeColor = (colorKey?: string, fallback?: string): string => {
  const theme = useTheme();

  if (!colorKey) {
    return fallback || '';
  }

  // テーマパレットキーとして解決を試行
  if (isValidPaletteKey(colorKey, theme.palette)) {
    const paletteValue = theme.palette[colorKey as keyof Palette] as {
      main: string;
    };
    return paletteValue.main;
  }

  // カラーコードとしてそのまま返す
  return colorKey;
};
