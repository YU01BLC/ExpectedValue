import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material/styles';
import { I18nextProvider } from 'react-i18next';
import { createAppTheme } from '@renderer/theme/theme';
import i18n from '../../../../i18n';
import { RaceAnalysisModal } from '../RaceAnalysisModal';

// テスト用のテーマ
const theme = createAppTheme();

const defaultProps = {
  open: true,
  onClose: vi.fn(),
};

const renderWithProviders = (props = defaultProps) => {
  return render(
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <RaceAnalysisModal {...props} />
      </I18nextProvider>
    </ThemeProvider>
  );
};

describe('RaceAnalysisModal', () => {
  it('モーダルが開いている時に表示されること', () => {
    // GIVEN
    renderWithProviders();

    // THEN
    expect(screen.getByText('レース分析モーダル')).toBeInTheDocument();
  });

  it('モーダルが閉じている時に表示されないこと', () => {
    // GIVEN
    renderWithProviders({ open: false, onClose: vi.fn() });

    // THEN
    expect(screen.queryByText('レース分析モーダル')).not.toBeInTheDocument();
  });

  it('購入フォームを開くボタンが表示されること', () => {
    // GIVEN
    renderWithProviders();

    // THEN
    expect(screen.getByText('購入フォームを開く')).toBeInTheDocument();
  });

  it('購入フォームを開くボタンが機能すること', async () => {
    // GIVEN
    const user = userEvent.setup();
    renderWithProviders();

    // WHEN
    const purchaseButton = screen.getByText('購入フォームを開く');
    await user.click(purchaseButton);

    // THEN
    expect(screen.getByText('購入フォーム')).toBeInTheDocument();
  });

  it('全頭診断テーブルが表示されること', () => {
    // GIVEN
    renderWithProviders();

    // THEN
    expect(screen.getByText('全頭診断')).toBeInTheDocument();
  });

  it('推奨買い目が表示されること', () => {
    // GIVEN
    renderWithProviders();

    // THEN
    expect(screen.getAllByText('推奨買い目')).toHaveLength(2); // 2つの推奨買い目セクションが存在
  });
});
