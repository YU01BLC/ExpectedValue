import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import i18n from '@renderer/i18n';
import { createAppTheme } from '@renderer/theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import { RaceTableHeader } from '../RaceTableHeader';
import type { SortField, SortDirection } from '../../types/raceTable';

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

describe('RaceTableHeader', () => {
  const defaultProps = {
    sortField: null as SortField | null,
    sortDirection: 'asc' as SortDirection,
    onSort: vi.fn(),
  };

  it('全てのヘッダー列が表示されること', () => {
    // GIVEN
    renderWithProviders(<RaceTableHeader {...defaultProps} />);

    // THEN
    expect(
      screen.getByRole('columnheader', { name: '枠番' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: '馬番' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: '馬名' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: '評価' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: '期待値' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'オッズ' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'コメント' })
    ).toBeInTheDocument();
  });

  it('枠番ソートボタンクリック時にonSortが呼ばれること', () => {
    // GIVEN
    const mockOnSort = vi.fn();
    const props = { ...defaultProps, onSort: mockOnSort };
    renderWithProviders(<RaceTableHeader {...props} />);

    // WHEN
    const gateNumberHeader = screen.getByRole('columnheader', { name: '枠番' });
    const sortButton = gateNumberHeader.querySelector('[role="button"]');
    fireEvent.click(sortButton!);

    // THEN
    expect(mockOnSort).toHaveBeenCalledWith('gateNumber');
  });

  it('馬番ソートボタンクリック時にonSortが呼ばれること', () => {
    // GIVEN
    const mockOnSort = vi.fn();
    const props = { ...defaultProps, onSort: mockOnSort };
    renderWithProviders(<RaceTableHeader {...props} />);

    // WHEN
    const horseNumberHeader = screen.getByRole('columnheader', {
      name: '馬番',
    });
    const sortButton = horseNumberHeader.querySelector('[role="button"]');
    fireEvent.click(sortButton!);

    // THEN
    expect(mockOnSort).toHaveBeenCalledWith('horseNumber');
  });

  it('評価ソートボタンクリック時にonSortが呼ばれること', () => {
    // GIVEN
    const mockOnSort = vi.fn();
    const props = { ...defaultProps, onSort: mockOnSort };
    renderWithProviders(<RaceTableHeader {...props} />);

    // WHEN
    const evaluationHeader = screen.getByRole('columnheader', { name: '評価' });
    const sortButton = evaluationHeader.querySelector('[role="button"]');
    fireEvent.click(sortButton!);

    // THEN
    expect(mockOnSort).toHaveBeenCalledWith('evaluation');
  });

  it('期待値ソートボタンクリック時にonSortが呼ばれること', () => {
    // GIVEN
    const mockOnSort = vi.fn();
    const props = { ...defaultProps, onSort: mockOnSort };
    renderWithProviders(<RaceTableHeader {...props} />);

    // WHEN
    const expectedValueHeader = screen.getByRole('columnheader', {
      name: '期待値',
    });
    const sortButton = expectedValueHeader.querySelector('[role="button"]');
    fireEvent.click(sortButton!);

    // THEN
    expect(mockOnSort).toHaveBeenCalledWith('expectedValue');
  });

  it('オッズソートボタンクリック時にonSortが呼ばれること', () => {
    // GIVEN
    const mockOnSort = vi.fn();
    const props = { ...defaultProps, onSort: mockOnSort };
    renderWithProviders(<RaceTableHeader {...props} />);

    // WHEN
    const oddsHeader = screen.getByRole('columnheader', { name: 'オッズ' });
    const sortButton = oddsHeader.querySelector('[role="button"]');
    fireEvent.click(sortButton!);

    // THEN
    expect(mockOnSort).toHaveBeenCalledWith('odds');
  });

  it('馬名とコメント列はソートボタンがないこと', () => {
    // GIVEN
    renderWithProviders(<RaceTableHeader {...defaultProps} />);

    // WHEN
    const horseNameHeader = screen.getByRole('columnheader', { name: '馬名' });
    const commentHeader = screen.getByRole('columnheader', {
      name: 'コメント',
    });

    // THEN
    expect(horseNameHeader.querySelector('[role="button"]')).toBeNull();
    expect(commentHeader.querySelector('[role="button"]')).toBeNull();
  });

  it('ソートフィールドが選択されている場合、ソートアイコンが表示されること', () => {
    // GIVEN
    const props = {
      ...defaultProps,
      sortField: 'horseNumber' as SortField,
      sortDirection: 'asc' as SortDirection,
    };
    renderWithProviders(<RaceTableHeader {...props} />);

    // THEN
    const horseNumberHeader = screen.getByRole('columnheader', {
      name: '馬番',
    });
    const sortButton = horseNumberHeader.querySelector('[role="button"]');
    expect(sortButton).toHaveClass('Mui-active');
  });

  it('昇順ソートの場合、昇順アイコンが表示されること', () => {
    // GIVEN
    const props = {
      ...defaultProps,
      sortField: 'expectedValue' as SortField,
      sortDirection: 'asc' as SortDirection,
    };
    renderWithProviders(<RaceTableHeader {...props} />);

    // THEN
    const expectedValueHeader = screen.getByRole('columnheader', {
      name: '期待値',
    });
    const sortButton = expectedValueHeader.querySelector('[role="button"]');
    expect(sortButton).toHaveClass('MuiTableSortLabel-directionAsc');
  });

  it('降順ソートの場合、降順アイコンが表示されること', () => {
    // GIVEN
    const props = {
      ...defaultProps,
      sortField: 'odds' as SortField,
      sortDirection: 'desc' as SortDirection,
    };
    renderWithProviders(<RaceTableHeader {...props} />);

    // THEN
    const oddsHeader = screen.getByRole('columnheader', { name: 'オッズ' });
    const sortButton = oddsHeader.querySelector('[role="button"]');
    expect(sortButton).toHaveClass('MuiTableSortLabel-directionDesc');
  });

  it('ソートフィールドがnullの場合、ソートアイコンが非アクティブ状態になること', () => {
    // GIVEN
    const props = {
      ...defaultProps,
      sortField: null,
    };
    renderWithProviders(<RaceTableHeader {...props} />);

    // THEN
    const horseNumberHeader = screen.getByRole('columnheader', {
      name: '馬番',
    });
    const sortButton = horseNumberHeader.querySelector('[role="button"]');
    expect(sortButton).not.toHaveClass('MuiTableSortLabel-active');
  });

  it('異なるソートフィールドが選択されている場合、他の列は非アクティブ状態になること', () => {
    // GIVEN
    const props = {
      ...defaultProps,
      sortField: 'evaluation' as SortField,
      sortDirection: 'asc' as SortDirection,
    };
    renderWithProviders(<RaceTableHeader {...props} />);

    // THEN
    const horseNumberHeader = screen.getByRole('columnheader', {
      name: '馬番',
    });
    const horseNumberSortButton =
      horseNumberHeader.querySelector('[role="button"]');
    expect(horseNumberSortButton).not.toHaveClass('Mui-active');

    const evaluationHeader = screen.getByRole('columnheader', { name: '評価' });
    const evaluationSortButton =
      evaluationHeader.querySelector('[role="button"]');
    expect(evaluationSortButton).toHaveClass('Mui-active');
  });

  it('全てのソート可能な列でソートが動作すること', () => {
    // GIVEN
    const mockOnSort = vi.fn();
    const props = { ...defaultProps, onSort: mockOnSort };
    renderWithProviders(<RaceTableHeader {...props} />);

    // WHEN & THEN
    const sortableColumns = ['枠番', '馬番', '評価', '期待値', 'オッズ'];

    sortableColumns.forEach((columnName) => {
      const header = screen.getByRole('columnheader', { name: columnName });
      const sortButton = header.querySelector('[role="button"]');
      fireEvent.click(sortButton!);
    });

    // THEN
    expect(mockOnSort).toHaveBeenCalledTimes(5);
    expect(mockOnSort).toHaveBeenCalledWith('gateNumber');
    expect(mockOnSort).toHaveBeenCalledWith('horseNumber');
    expect(mockOnSort).toHaveBeenCalledWith('evaluation');
    expect(mockOnSort).toHaveBeenCalledWith('expectedValue');
    expect(mockOnSort).toHaveBeenCalledWith('odds');
  });

  it('テーマカラーが正しく適用されること', () => {
    // GIVEN
    renderWithProviders(<RaceTableHeader {...defaultProps} />);

    // THEN
    const headers = screen.getAllByRole('columnheader');
    headers.forEach((header) => {
      expect(header).toHaveStyle({
        color: 'rgb(255, 255, 255)',
      });
    });
  });

  it('ソートラベルのスタイルが正しく適用されること', () => {
    // GIVEN
    renderWithProviders(<RaceTableHeader {...defaultProps} />);

    // THEN
    const sortButtons = screen.getAllByRole('button');
    sortButtons.forEach((button) => {
      expect(button).toHaveStyle({
        color: 'rgb(255, 255, 255)',
      });
    });
  });
});
