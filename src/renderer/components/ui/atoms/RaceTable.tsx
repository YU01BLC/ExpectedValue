import { type JSX, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TableSortLabel,
  Box,
  useTheme,
  type Theme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

// ソートの型定義
type SortField =
  | 'horseNumber'
  | 'gateNumber'
  | 'evaluation'
  | 'expectedValue'
  | 'odds';
type SortDirection = 'asc' | 'desc';

// 馬情報の型定義
export interface HorseData {
  id: string;
  name: string;
  horseNumber: number; // 馬番
  gateNumber: number; // 枠番
  evaluation: 'S' | 'A' | 'B' | 'C' | 'D';
  expectedValue: number;
  odds: number;
  comment: string;
}

interface RaceTableProps {
  horseData: HorseData[];
  sortField: SortField | null;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

// 評価の色を取得する関数（テーマカラー使用）
const getEvaluationColor = (evaluation: string, theme: Theme) => {
  return (
    theme.palette.evaluation[
      evaluation as keyof typeof theme.palette.evaluation
    ] || theme.palette.evaluation.D
  );
};

// 枠番の色を取得する関数（テーマカラー使用）
const getGateColor = (gateNumber: number, theme: Theme) => {
  return (
    theme.palette.gate[gateNumber as keyof typeof theme.palette.gate] ||
    theme.palette.gate.default
  );
};

export const RaceTable = ({
  horseData,
  sortField,
  sortDirection,
  onSort,
}: RaceTableProps): JSX.Element => {
  const { t } = useTranslation('common');
  const theme = useTheme();

  // ソートされたデータの計算
  const sortedHorseData = useMemo(() => {
    if (!sortField) return horseData;

    return [...horseData].sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (sortField) {
        case 'horseNumber':
          aValue = a.horseNumber;
          bValue = b.horseNumber;
          break;
        case 'gateNumber':
          aValue = a.gateNumber;
          bValue = b.gateNumber;
          break;
        case 'evaluation': {
          // 評価の順序: S > A > B > C > D
          const evaluationOrder = { S: 5, A: 4, B: 3, C: 2, D: 1 };
          aValue = evaluationOrder[a.evaluation];
          bValue = evaluationOrder[b.evaluation];
          break;
        }
        case 'expectedValue':
          aValue = a.expectedValue;
          bValue = b.expectedValue;
          break;
        case 'odds':
          aValue = a.odds;
          bValue = b.odds;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [horseData, sortField, sortDirection]);

  return (
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                color: 'text.primary',
                fontWeight: 600,
                width: '80px',
              }}
            >
              <TableSortLabel
                active={sortField === 'gateNumber'}
                direction={sortField === 'gateNumber' ? sortDirection : 'asc'}
                onClick={() => onSort('gateNumber')}
                sx={{ color: 'text.primary', fontWeight: 600 }}
              >
                {t('table.gateNumber')}
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{
                color: 'text.primary',
                fontWeight: 600,
                width: '60px',
              }}
            >
              <TableSortLabel
                active={sortField === 'horseNumber'}
                direction={sortField === 'horseNumber' ? sortDirection : 'asc'}
                onClick={() => onSort('horseNumber')}
                sx={{ color: 'text.primary', fontWeight: 600 }}
              >
                {t('table.horseNumber')}
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>
              {t('table.horseName')}
            </TableCell>
            <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>
              <TableSortLabel
                active={sortField === 'evaluation'}
                direction={sortField === 'evaluation' ? sortDirection : 'asc'}
                onClick={() => onSort('evaluation')}
                sx={{ color: 'text.primary', fontWeight: 600 }}
              >
                {t('table.evaluation')}
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>
              <TableSortLabel
                active={sortField === 'expectedValue'}
                direction={
                  sortField === 'expectedValue' ? sortDirection : 'asc'
                }
                onClick={() => onSort('expectedValue')}
                sx={{ color: 'text.primary', fontWeight: 600 }}
              >
                {t('table.expectedValue')}
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>
              <TableSortLabel
                active={sortField === 'odds'}
                direction={sortField === 'odds' ? sortDirection : 'asc'}
                onClick={() => onSort('odds')}
                sx={{ color: 'text.primary', fontWeight: 600 }}
              >
                {t('table.odds')}
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>
              {t('table.comment')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedHorseData.map((horse) => {
            const gateColor = getGateColor(horse.gateNumber, theme);
            return (
              <TableRow key={horse.id}>
                <TableCell sx={{ textAlign: 'center', py: 1 }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      backgroundColor: gateColor.bg,
                      color: gateColor.text,
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                  >
                    {horse.gateNumber}
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: 'center',
                    color: 'text.primary',
                    fontWeight: 600,
                  }}
                >
                  {horse.horseNumber}
                </TableCell>
                <TableCell sx={{ color: 'text.primary' }}>
                  {horse.name}
                </TableCell>
                <TableCell>
                  <Chip
                    label={horse.evaluation}
                    size='small'
                    sx={{
                      backgroundColor: getEvaluationColor(
                        horse.evaluation,
                        theme
                      ),
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ color: 'text.primary' }}>
                  {horse.expectedValue}
                </TableCell>
                <TableCell sx={{ color: 'text.primary' }}>
                  {horse.odds}
                </TableCell>
                <TableCell sx={{ color: 'text.primary' }}>
                  {horse.comment}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
