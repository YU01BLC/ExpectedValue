import { type JSX } from 'react';
import {
  TableBody,
  TableRow,
  TableCell,
  Box,
  Chip,
  useTheme,
} from '@mui/material';
import type { RaceTableBodyProps } from '../types/raceTable';
import { getEvaluationColor, getGateColor } from '../utils/raceTableUtils';

/**
 * レーステーブルのボディコンポーネント
 * 馬データを表示し、クリック時に詳細モーダルを開く
 */
export const RaceTableBody = ({
  horseData,
  onHorseClick,
}: RaceTableBodyProps): JSX.Element => {
  const theme = useTheme();

  return (
    <TableBody>
      {horseData.map((horse) => {
        const gateColor = getGateColor(
          horse.gateNumber,
          theme,
          horseData.length
        );
        return (
          <TableRow
            key={horse.id}
            hover
            onClick={() => onHorseClick(horse)}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
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
            <TableCell sx={{ color: 'text.primary' }}>{horse.name}</TableCell>
            <TableCell>
              <Chip
                label={horse.evaluation}
                size='small'
                sx={{
                  backgroundColor: getEvaluationColor(horse.evaluation, theme),
                  color: 'white',
                  fontWeight: 600,
                }}
              />
            </TableCell>
            <TableCell sx={{ color: 'text.primary' }}>
              {horse.expectedValue}
            </TableCell>
            <TableCell sx={{ color: 'text.primary' }}>{horse.odds}</TableCell>
            <TableCell sx={{ color: 'text.primary' }}>
              {horse.comment}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};
