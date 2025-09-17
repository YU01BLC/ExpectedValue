import { type JSX } from 'react';
import {
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { RaceTableMobileViewProps } from '../types/raceTable';
import { getEvaluationColor, getGateColor } from '../utils/raceTableUtils';

/**
 * モバイル用のレーステーブル表示コンポーネント
 * アコーディオン形式で馬データを表示
 */
export const RaceTableMobileView = ({
  horseData,
  sortField,
  sortDirection,
  onSort,
  onHorseClick,
}: RaceTableMobileViewProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
      {/* ソートボタン */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        <Button
          size='small'
          variant={sortField === 'horseNumber' ? 'contained' : 'outlined'}
          onClick={() => onSort('horseNumber')}
          sx={{ minWidth: 'auto', px: 2 }}
        >
          馬番{' '}
          {sortField === 'horseNumber' && (sortDirection === 'asc' ? '↑' : '↓')}
        </Button>
        <Button
          size='small'
          variant={sortField === 'odds' ? 'contained' : 'outlined'}
          onClick={() => onSort('odds')}
          sx={{ minWidth: 'auto', px: 2 }}
        >
          オッズ {sortField === 'odds' && (sortDirection === 'asc' ? '↑' : '↓')}
        </Button>
        <Button
          size='small'
          variant={sortField === 'expectedValue' ? 'contained' : 'outlined'}
          onClick={() => onSort('expectedValue')}
          sx={{ minWidth: 'auto', px: 2 }}
        >
          期待値{' '}
          {sortField === 'expectedValue' &&
            (sortDirection === 'asc' ? '↑' : '↓')}
        </Button>
      </Box>

      {horseData.map((horse) => (
        <Accordion
          key={horse.id}
          sx={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            mb: 1,
            '&:before': {
              display: 'none',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              '& .MuiAccordionSummary-content': {
                alignItems: 'flex-start',
                flexDirection: 'column',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {/* 枠番と馬番を組み合わせた表示 */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: getGateColor(horse.gateNumber, theme).bg,
                  color: getGateColor(horse.gateNumber, theme).text,
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  mr: 2,
                  flexShrink: 0,
                }}
              >
                {horse.horseNumber}
              </Box>

              {/* 馬名とオッズを並列表示 */}
              <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <Typography
                  variant='body1'
                  fontWeight={600}
                  sx={{ flex: 1, mr: 1 }}
                >
                  {horse.name}
                </Typography>
                <Typography
                  variant='body2'
                  fontWeight={600}
                  color='primary.main'
                >
                  {horse.odds}倍
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: getEvaluationColor(horse.evaluation, theme),
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                {horse.evaluation}
              </Box>
              <Typography variant='body2' color='text.secondary'>
                期待値:{' '}
                <span
                  style={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                  }}
                >
                  {horse.expectedValue}
                </span>
              </Typography>
            </Box>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ cursor: 'pointer' }}
              onClick={() => onHorseClick(horse)}
            >
              タップして詳細を表示
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};
