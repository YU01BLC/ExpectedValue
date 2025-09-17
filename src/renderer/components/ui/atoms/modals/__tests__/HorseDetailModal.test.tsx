import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import i18n from '@renderer/i18n';
import { createAppTheme } from '@renderer/theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import { HorseDetailModal } from '../HorseDetailModal';
import type { HorseData } from '../../types/raceTable';

// テスト用のテーマプロバイダー
const TestThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = createAppTheme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

// テスト用のレンダリング関数
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <I18nextProvider i18n={i18n}>
      <TestThemeProvider>{component}</TestThemeProvider>
    </I18nextProvider>
  );
};

describe('HorseDetailModal', () => {
  const mockHorse: HorseData = {
    id: '1',
    name: 'テスト馬',
    horseNumber: 5,
    gateNumber: 3,
    evaluation: 'A',
    expectedValue: 1.25,
    odds: 4.5,
    comment: 'テストコメント',
  };

  const defaultProps = {
    horse: mockHorse,
    open: true,
    onClose: vi.fn(),
  };

  it('馬データが提供された場合、モーダルが表示されること', () => {
    // GIVEN
    renderWithProviders(<HorseDetailModal {...defaultProps} />);

    // THEN
    expect(screen.getByText('テスト馬 の詳細')).toBeInTheDocument();
    expect(screen.getByText('枠番')).toBeInTheDocument();
    expect(screen.getByText('馬番')).toBeInTheDocument();
    expect(screen.getByText('評価')).toBeInTheDocument();
    expect(screen.getByText('オッズ')).toBeInTheDocument();
    expect(screen.getByText('期待値')).toBeInTheDocument();
    expect(screen.getByText('コメント')).toBeInTheDocument();
  });

  it('馬データがnullの場合、何も表示されないこと', () => {
    // GIVEN
    const propsWithNullHorse = {
      ...defaultProps,
      horse: null,
    };

    // WHEN
    const { container } = renderWithProviders(
      <HorseDetailModal {...propsWithNullHorse} />
    );

    // THEN
    expect(container.firstChild).toBeNull();
  });

  it('馬の詳細情報が正しく表示されること', () => {
    // GIVEN
    renderWithProviders(<HorseDetailModal {...defaultProps} />);

    // THEN
    expect(screen.getByText('5')).toBeInTheDocument(); // 馬番
    expect(screen.getByText('3')).toBeInTheDocument(); // 枠番
    expect(screen.getByText('A')).toBeInTheDocument(); // 評価
    expect(screen.getByText('4.5倍')).toBeInTheDocument(); // オッズ
    expect(screen.getByText('1.25')).toBeInTheDocument(); // 期待値
    expect(screen.getByText('テストコメント')).toBeInTheDocument(); // コメント
  });

  it('閉じるボタンクリック時にonCloseが呼ばれること', () => {
    // GIVEN
    const mockOnClose = vi.fn();
    const props = { ...defaultProps, onClose: mockOnClose };
    renderWithProviders(<HorseDetailModal {...props} />);

    // WHEN
    const closeButton = screen.getByLabelText('閉じる');
    fireEvent.click(closeButton);

    // THEN
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('閉じるボタン（テキスト）クリック時にonCloseが呼ばれること', () => {
    // GIVEN
    const mockOnClose = vi.fn();
    const props = { ...defaultProps, onClose: mockOnClose };
    renderWithProviders(<HorseDetailModal {...props} />);

    // WHEN
    const closeTextButton = screen.getByText('閉じる');
    fireEvent.click(closeTextButton);

    // THEN
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('モーダルが閉じている場合、表示されないこと', () => {
    // GIVEN
    const propsWithClosedModal = {
      ...defaultProps,
      open: false,
    };

    // WHEN
    renderWithProviders(<HorseDetailModal {...propsWithClosedModal} />);

    // THEN
    expect(screen.queryByText('テスト馬 の詳細')).not.toBeInTheDocument();
  });

  it('アクセシビリティ属性が正しく設定されていること', () => {
    // GIVEN
    renderWithProviders(<HorseDetailModal {...defaultProps} />);

    // THEN
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText('閉じる')).toBeInTheDocument();
  });

  it('異なる馬データで正しく表示されること', () => {
    // GIVEN
    const differentHorse: HorseData = {
      id: '2',
      name: '別の馬',
      horseNumber: 8,
      gateNumber: 7,
      evaluation: 'S',
      expectedValue: 2.0,
      odds: 2.5,
      comment: '別のコメント',
    };

    const props = {
      ...defaultProps,
      horse: differentHorse,
    };

    // WHEN
    renderWithProviders(<HorseDetailModal {...props} />);

    // THEN
    expect(screen.getByText('別の馬 の詳細')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument(); // 馬番
    expect(screen.getByText('7')).toBeInTheDocument(); // 枠番
    expect(screen.getByText('S')).toBeInTheDocument(); // 評価
    expect(screen.getByText('2.5倍')).toBeInTheDocument(); // オッズ
    expect(screen.getByText('2')).toBeInTheDocument(); // 期待値
    expect(screen.getByText('別のコメント')).toBeInTheDocument(); // コメント
  });

  it('評価がDの場合も正しく表示されること', () => {
    // GIVEN
    const horseWithDEvaluation: HorseData = {
      ...mockHorse,
      evaluation: 'D',
    };

    const props = {
      ...defaultProps,
      horse: horseWithDEvaluation,
    };

    // WHEN
    renderWithProviders(<HorseDetailModal {...props} />);

    // THEN
    expect(screen.getByText('D')).toBeInTheDocument();
  });

  it('期待値が0の場合も正しく表示されること', () => {
    // GIVEN
    const horseWithZeroExpectedValue: HorseData = {
      ...mockHorse,
      expectedValue: 0,
    };

    const props = {
      ...defaultProps,
      horse: horseWithZeroExpectedValue,
    };

    // WHEN
    renderWithProviders(<HorseDetailModal {...props} />);

    // THEN
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('オッズが小数点以下の場合も正しく表示されること', () => {
    // GIVEN
    const horseWithDecimalOdds: HorseData = {
      ...mockHorse,
      odds: 3.7,
    };

    const props = {
      ...defaultProps,
      horse: horseWithDecimalOdds,
    };

    // WHEN
    renderWithProviders(<HorseDetailModal {...props} />);

    // THEN
    expect(screen.getByText('3.7倍')).toBeInTheDocument();
  });
});
