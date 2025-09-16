import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createAppTheme } from '@renderer/theme/theme';
import { SearchArea, type SearchFilters } from '../SearchArea';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

const theme = createAppTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('SearchArea', () => {
  it('基本的な検索エリアが表示されること', () => {
    // GIVEN
    const mockOnFiltersChange = vi.fn();
    const mockOnSearchClick = vi.fn();

    // WHEN
    renderWithTheme(
      <SearchArea
        onFiltersChange={mockOnFiltersChange}
        onSearchClick={mockOnSearchClick}
      />
    );

    // THEN
    expect(screen.getByText('🔍 レース検索')).toBeInTheDocument();
    expect(screen.getAllByText('開催日')).toHaveLength(2); // ラベルとDatePicker内のテキスト
    expect(screen.getAllByText('会場')).toHaveLength(2); // ラベルとSelect内のテキスト
    expect(screen.getAllByText('レース番号')).toHaveLength(2); // ラベルとSelect内のテキスト
    expect(screen.getByText('検索')).toBeInTheDocument();
  });

  it('初期値が正しく設定されること', () => {
    // GIVEN
    const mockOnFiltersChange = vi.fn();
    const mockOnSearchClick = vi.fn();
    const initialFilters: Partial<SearchFilters> = {
      venue: 'hanshin',
      raceNumber: 5,
    };

    // WHEN
    renderWithTheme(
      <SearchArea
        onFiltersChange={mockOnFiltersChange}
        onSearchClick={mockOnSearchClick}
        initialFilters={initialFilters}
      />
    );

    // THEN
    expect(screen.getByText('阪神')).toBeInTheDocument();
    expect(screen.getByText('5R - 2勝クラス')).toBeInTheDocument();
  });

  it('会場選択が動作すること', async () => {
    // GIVEN
    const user = userEvent.setup();
    const mockOnFiltersChange = vi.fn();
    const mockOnSearchClick = vi.fn();

    // WHEN
    renderWithTheme(
      <SearchArea
        onFiltersChange={mockOnFiltersChange}
        onSearchClick={mockOnSearchClick}
      />
    );

    // THEN
    const comboboxes = screen.getAllByRole('combobox');
    const venueSelect = comboboxes[0]; // 最初のcomboboxが会場
    await user.click(venueSelect);

    expect(screen.getByText('中山')).toBeInTheDocument();
    expect(screen.getByText('阪神')).toBeInTheDocument();
    expect(screen.getByText('京都')).toBeInTheDocument();
  });

  it('レース番号選択が動作すること', async () => {
    // GIVEN
    const user = userEvent.setup();
    const mockOnFiltersChange = vi.fn();
    const mockOnSearchClick = vi.fn();

    // WHEN
    renderWithTheme(
      <SearchArea
        onFiltersChange={mockOnFiltersChange}
        onSearchClick={mockOnSearchClick}
      />
    );

    // THEN
    const comboboxes = screen.getAllByRole('combobox');
    const raceSelect = comboboxes[1]; // 2番目のcomboboxがレース番号
    await user.click(raceSelect);

    expect(screen.getAllByText('1R - 2歳未勝利')).toHaveLength(2); // SelectとMenuItemで2回出現
    expect(screen.getByText('2R - 3歳未勝利')).toBeInTheDocument();
    expect(screen.getByText('3R - 4歳以上未勝利')).toBeInTheDocument();
  });

  it('検索ボタンクリック時にコールバックが呼ばれること', async () => {
    // GIVEN
    const user = userEvent.setup();
    const mockOnFiltersChange = vi.fn();
    const mockOnSearchClick = vi.fn();

    // WHEN
    renderWithTheme(
      <SearchArea
        onFiltersChange={mockOnFiltersChange}
        onSearchClick={mockOnSearchClick}
      />
    );

    const searchButton = screen.getByRole('button', { name: '検索' });
    await user.click(searchButton);

    // THEN
    expect(mockOnSearchClick).toHaveBeenCalledTimes(1);
  });

  it('会場変更時にonFiltersChangeが呼ばれること', async () => {
    // GIVEN
    const user = userEvent.setup();
    const mockOnFiltersChange = vi.fn();
    const mockOnSearchClick = vi.fn();

    // WHEN
    renderWithTheme(
      <SearchArea
        onFiltersChange={mockOnFiltersChange}
        onSearchClick={mockOnSearchClick}
      />
    );

    const comboboxes = screen.getAllByRole('combobox');
    const venueSelect = comboboxes[0];
    await user.click(venueSelect);
    await user.click(screen.getByText('中山'));

    // THEN
    expect(mockOnFiltersChange).toHaveBeenCalledWith(
      expect.objectContaining({
        venue: 'nakayama',
        raceNumber: 1,
      })
    );
  });

  it('レース番号変更時にonFiltersChangeが呼ばれること', async () => {
    // GIVEN
    const user = userEvent.setup();
    const mockOnFiltersChange = vi.fn();
    const mockOnSearchClick = vi.fn();

    // WHEN
    renderWithTheme(
      <SearchArea
        onFiltersChange={mockOnFiltersChange}
        onSearchClick={mockOnSearchClick}
      />
    );

    const comboboxes = screen.getAllByRole('combobox');
    const raceSelect = comboboxes[1];
    await user.click(raceSelect);
    await user.click(screen.getByText('2R - 3歳未勝利'));

    // THEN
    expect(mockOnFiltersChange).toHaveBeenCalledWith(
      expect.objectContaining({
        venue: 'tokyo',
        raceNumber: 2,
      })
    );
  });

  it('日付変更時にonFiltersChangeが呼ばれること', async () => {
    // GIVEN
    const user = userEvent.setup();
    const mockOnFiltersChange = vi.fn();
    const mockOnSearchClick = vi.fn();

    // WHEN
    renderWithTheme(
      <SearchArea
        onFiltersChange={mockOnFiltersChange}
        onSearchClick={mockOnSearchClick}
      />
    );

    // DatePickerの年をクリックして変更
    const yearElement = screen.getByRole('spinbutton', { name: 'Year' });
    await user.click(yearElement);
    await user.clear(yearElement);
    await user.type(yearElement, '2024');

    // THEN
    expect(mockOnFiltersChange).toHaveBeenCalledWith(
      expect.objectContaining({
        venue: 'tokyo',
        raceNumber: 1,
        date: expect.any(Object),
      })
    );
  });
});
