import { type JSX } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  useTheme,
} from '@mui/material';
import { getEvaluationColor } from '../utils/themeColors';

// 馬情報の型定義
export interface HorseData {
  id: string;
  name: string;
  evaluation: 'S' | 'A' | 'B' | 'C' | 'D';
  winRate: number;
  odds: number;
  ev: number;
  recommendation: string;
}

interface ListTableProps {
  horseData: HorseData[];
}

export const ListTable = ({ horseData }: ListTableProps): JSX.Element => {
  const theme = useTheme();
  return (
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>
              馬名
            </TableCell>
            <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>
              評価
            </TableCell>
            <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>
              勝率%
            </TableCell>
            <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>
              オッズ
            </TableCell>
            <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>
              EV値
            </TableCell>
            <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>
              推奨
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {horseData.map((horse) => (
            <TableRow key={horse.id}>
              <TableCell sx={{ color: 'text.primary' }}>{horse.name}</TableCell>
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
                {horse.winRate}%
              </TableCell>
              <TableCell sx={{ color: 'text.primary' }}>{horse.odds}</TableCell>
              <TableCell sx={{ color: 'text.primary' }}>{horse.ev}</TableCell>
              <TableCell sx={{ color: 'text.primary' }}>
                {horse.recommendation}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
