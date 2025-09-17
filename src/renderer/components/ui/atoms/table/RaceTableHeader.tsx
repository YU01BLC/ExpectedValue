import { type JSX } from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { RaceTableHeaderProps } from '../types/raceTable';

/**
 * レーステーブルのヘッダーコンポーネント
 *
 * レーステーブルのヘッダー部分を表示し、ソート機能を提供するコンポーネント。
 * MUIのTableSortLabelを使用してソート可能な列にソート機能を実装。
 * テーマカラーを使用してスタイリングを行い、保守性を向上。
 *
 * @param props - コンポーネントのプロパティ
 * @param props.sortField - 現在のソート対象フィールド
 * @param props.sortDirection - ソート方向（'asc' | 'desc'）
 * @param props.onSort - ソート実行時のコールバック関数
 * @returns レーステーブルのヘッダー要素
 *
 * @example
 * ```tsx
 * <RaceTableHeader
 *   sortField="expectedValue"
 *   sortDirection="desc"
 *   onSort={(field) => handleSort(field)}
 * />
 * ```
 */
export const RaceTableHeader = ({
  sortField,
  sortDirection,
  onSort,
}: RaceTableHeaderProps): JSX.Element => {
  const { t } = useTranslation('common');
  const theme = useTheme();

  // 共通のヘッダーセルスタイル（テーマカラー使用）
  const headerCellStyle = {
    backgroundColor: theme.palette.table.header.background,
    color: theme.palette.table.header.text,
    borderBottom: `1px solid ${theme.palette.table.header.border}`,
    boxShadow: `0 2px 8px ${theme.palette.table.header.shadow}`,
    fontWeight: 600,
    whiteSpace: 'nowrap' as const,
  };

  // ソートラベルのスタイル（テーマカラー使用）
  const sortLabelStyle = {
    color: theme.palette.table.header.text,
    fontWeight: 600,
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell
          sx={{
            ...headerCellStyle,
            width: '80px',
          }}
        >
          <TableSortLabel
            active={sortField === 'gateNumber'}
            direction={sortField === 'gateNumber' ? sortDirection : 'asc'}
            onClick={() => onSort('gateNumber')}
            sx={sortLabelStyle}
          >
            {t('table.gateNumber')}
          </TableSortLabel>
        </TableCell>
        <TableCell
          sx={{
            ...headerCellStyle,
            width: '60px',
          }}
        >
          <TableSortLabel
            active={sortField === 'horseNumber'}
            direction={sortField === 'horseNumber' ? sortDirection : 'asc'}
            onClick={() => onSort('horseNumber')}
            sx={sortLabelStyle}
          >
            {t('table.horseNumber')}
          </TableSortLabel>
        </TableCell>
        <TableCell
          sx={{
            ...headerCellStyle,
            minWidth: '120px',
          }}
        >
          {t('table.horseName')}
        </TableCell>
        <TableCell
          sx={{
            ...headerCellStyle,
            width: '80px',
          }}
        >
          <TableSortLabel
            active={sortField === 'evaluation'}
            direction={sortField === 'evaluation' ? sortDirection : 'asc'}
            onClick={() => onSort('evaluation')}
            sx={sortLabelStyle}
          >
            {t('table.evaluation')}
          </TableSortLabel>
        </TableCell>
        <TableCell
          sx={{
            ...headerCellStyle,
            width: '120px',
          }}
        >
          <TableSortLabel
            active={sortField === 'expectedValue'}
            direction={sortField === 'expectedValue' ? sortDirection : 'asc'}
            onClick={() => onSort('expectedValue')}
            sx={sortLabelStyle}
          >
            {t('table.expectedValue')}
          </TableSortLabel>
        </TableCell>
        <TableCell
          sx={{
            ...headerCellStyle,
            width: '80px',
          }}
        >
          <TableSortLabel
            active={sortField === 'odds'}
            direction={sortField === 'odds' ? sortDirection : 'asc'}
            onClick={() => onSort('odds')}
            sx={sortLabelStyle}
          >
            {t('table.odds')}
          </TableSortLabel>
        </TableCell>
        <TableCell
          sx={{
            ...headerCellStyle,
            minWidth: '200px',
          }}
        >
          {t('table.comment')}
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
