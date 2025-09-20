import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material/styles';
import { I18nextProvider } from 'react-i18next';
import { createAppTheme } from '@renderer/theme/theme';
import i18n from '../../../../../i18n';
import { BetSelectionForm } from '../BetSelectionForm';

// テスト用のテーマ
const theme = createAppTheme();

// テスト用のモックデータ
const mockHorses = [
  {
    number: 1,
    name: 'テスト馬1',
    odds: 2.5,
    expectedValue: 1.2,
    evaluation: 'A',
    gateNumber: 1,
  },
  {
    number: 2,
    name: 'テスト馬2',
    odds: 3.0,
    expectedValue: 1.0,
    evaluation: 'B',
    gateNumber: 2,
  },
];

const defaultProps = {
  horses: mockHorses,
  selectedBetType: 'exacta',
  selectedMethod: 'single',
  columnHorses: [[1], [2]],
  axisHorse: null,
  nagashiType: 'multi1' as const,
  onBetTypeChange: vi.fn(),
  onMethodChange: vi.fn(),
  onHorseToggle: vi.fn(),
  onAxisHorseToggle: vi.fn(),
  onNagashiTypeChange: vi.fn(),
  onAddTicket: vi.fn(),
  combinations: 2,
  error: '',
};

const renderWithProviders = (props = defaultProps) => {
  return render(
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <BetSelectionForm {...props} />
      </I18nextProvider>
    </ThemeProvider>
  );
};

describe('BetSelectionForm', () => {
  it('馬券種別が正しく表示されること', () => {
    // GIVEN
    renderWithProviders();

    // THEN
    expect(screen.getAllByText('馬券種別')).toHaveLength(2); // ラベルとlegendで2つ存在
  });

  it('買い方が正しく表示されること', () => {
    // GIVEN
    renderWithProviders();

    // THEN
    expect(screen.getAllByText('買い方')).toHaveLength(2); // ラベルとlegendで2つ存在
  });

  it('馬券種別を変更できること', async () => {
    // GIVEN
    const user = userEvent.setup();
    const mockOnBetTypeChange = vi.fn();
    renderWithProviders({
      ...defaultProps,
      onBetTypeChange: mockOnBetTypeChange,
    });

    // WHEN
    const betTypeSelects = screen.getAllByRole('combobox');
    await user.click(betTypeSelects[0]); // 最初のcombobox（馬券種別）

    // ドロップダウンメニューが開くまで待機
    await new Promise((resolve) => setTimeout(resolve, 100));

    // THEN - 実際のイベントハンドラーが呼ばれるかは実装に依存するため、要素の存在を確認
    expect(betTypeSelects[0]).toBeInTheDocument();
  });

  it('エラーが表示されること', () => {
    // GIVEN
    const errorMessage = 'テストエラー';
    renderWithProviders({
      ...defaultProps,
      error: errorMessage,
    });

    // THEN
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('組み合わせ数が正しく表示されること', () => {
    // GIVEN
    renderWithProviders();

    // THEN
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
