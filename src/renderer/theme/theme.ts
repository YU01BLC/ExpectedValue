import { createTheme } from '@mui/material/styles';

/**
 * カスタムカラーパレット
 */
const customColors = {
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
} as const;

/**
 * MUIテーマ設定
 * - ダークモード対応
 * - カスタムカラーパレット
 * - タイポグラフィ設定
 * - レスポンシブ対応
 */
export const createAppTheme = () => {
  return createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: customColors.blue[400],
        light: customColors.blue[300],
        dark: customColors.blue[500],
      },
      secondary: {
        main: customColors.green[500],
        light: customColors.green[400],
        dark: customColors.green[600],
      },
      error: {
        main: customColors.red[400],
        light: customColors.red[300],
        dark: customColors.red[500],
      },
      background: {
        default: customColors.slate[900],
        paper: 'rgba(30, 41, 59, 0.72)', // ガラス風
      },
      text: {
        primary: customColors.slate[200],
        secondary: customColors.slate[400],
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '3.75rem',
        fontWeight: 900,
        letterSpacing: '-0.025em',
      },
      h2: {
        fontSize: '2.25rem',
        fontWeight: 800,
        letterSpacing: '-0.025em',
      },
      h3: {
        fontSize: '1.875rem',
        fontWeight: 700,
        letterSpacing: '-0.025em',
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 700,
        letterSpacing: '0',
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        letterSpacing: '0',
      },
      h6: {
        fontSize: '1.125rem',
        fontWeight: 600,
        letterSpacing: '0.025em',
      },
      body1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.43,
      },
    },
    shape: {
      borderRadius: 12,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            background:
              'linear-gradient(180deg, rgba(30,41,59,0.72) 0%, rgba(30,41,59,0.46) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(148, 163, 184, .25)',
            boxShadow: '0 18px 48px rgba(2,6,23,.55)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
    },
  });
};
