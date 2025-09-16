import { renderHook } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { useThemeColor } from '../useThemeColor';
import { describe, it, expect } from 'vitest';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('useThemeColor', () => {
  it('テーマパレットキーが正しく解決されること', () => {
    // GIVEN
    const colorKey = 'primary';

    // WHEN
    const { result } = renderHook(() => useThemeColor(colorKey), { wrapper });

    // THEN
    expect(result.current).toBe('#1976d2');
  });

  it('secondaryパレットキーが正しく解決されること', () => {
    // GIVEN
    const colorKey = 'secondary';

    // WHEN
    const { result } = renderHook(() => useThemeColor(colorKey), { wrapper });

    // THEN
    expect(result.current).toBe('#dc004e');
  });

  it('カラーコードがそのまま返されること', () => {
    // GIVEN
    const colorKey = '#ff0000';

    // WHEN
    const { result } = renderHook(() => useThemeColor(colorKey), { wrapper });

    // THEN
    expect(result.current).toBe('#ff0000');
  });

  it('存在しないパレットキーの場合、カラーコードとして返されること', () => {
    // GIVEN
    const colorKey = 'nonexistent';

    // WHEN
    const { result } = renderHook(() => useThemeColor(colorKey), { wrapper });

    // THEN
    expect(result.current).toBe('nonexistent');
  });

  it('colorKeyがundefinedの場合、フォールバック値が返されること', () => {
    // GIVEN
    const fallback = 'fallback-color';

    // WHEN
    const { result } = renderHook(() => useThemeColor(undefined, fallback), {
      wrapper,
    });

    // THEN
    expect(result.current).toBe('fallback-color');
  });

  it('colorKeyが空文字の場合、フォールバック値が返されること', () => {
    // GIVEN
    const fallback = 'fallback-color';

    // WHEN
    const { result } = renderHook(() => useThemeColor('', fallback), {
      wrapper,
    });

    // THEN
    expect(result.current).toBe('fallback-color');
  });

  it('パレット値がオブジェクトでない場合、カラーコードとして返されること', () => {
    // GIVEN
    const colorKey = 'text';

    // WHEN
    const { result } = renderHook(() => useThemeColor(colorKey), { wrapper });

    // THEN
    expect(result.current).toBe('text');
  });

  it('パレット値にmainプロパティがない場合、カラーコードとして返されること', () => {
    // GIVEN
    const colorKey = 'background';

    // WHEN
    const { result } = renderHook(() => useThemeColor(colorKey), { wrapper });

    // THEN
    expect(result.current).toBe('background');
  });

  it('パレット値がnullの場合、カラーコードとして返されること', () => {
    // GIVEN
    const customTheme = createTheme({
      palette: {
        custom: null as never,
      },
    });
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
    );
    const colorKey = 'custom';

    // WHEN
    const { result } = renderHook(() => useThemeColor(colorKey), { wrapper });

    // THEN
    expect(result.current).toBe('custom');
  });
});
