import type { JSX } from 'react';
import { useState } from 'react';
import {
  Box,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Button,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import SearchIcon from '@mui/icons-material/Search';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { type Dayjs } from 'dayjs';
import 'dayjs/locale/ja';

// 会場データ
const VENUES = [
  { value: 'tokyo', label: '東京' },
  { value: 'nakayama', label: '中山' },
  { value: 'hanshin', label: '阪神' },
  { value: 'kyoto', label: '京都' },
  { value: 'hakodate', label: '函館' },
  { value: 'sapporo', label: '札幌' },
  { value: 'fukushima', label: '福島' },
  { value: 'niigata', label: '新潟' },
  { value: 'kokura', label: '小倉' },
  { value: 'chukyo', label: '中京' },
] as const;

// レース番号データ（レース名のサンプル）
const RACES = [
  { value: 1, label: '1R', raceName: '2歳未勝利' },
  { value: 2, label: '2R', raceName: '3歳未勝利' },
  { value: 3, label: '3R', raceName: '4歳以上未勝利' },
  { value: 4, label: '4R', raceName: '1勝クラス' },
  { value: 5, label: '5R', raceName: '2勝クラス' },
  { value: 6, label: '6R', raceName: '3勝クラス' },
  { value: 7, label: '7R', raceName: 'オープン' },
  { value: 8, label: '8R', raceName: 'G3' },
  { value: 9, label: '9R', raceName: 'G2' },
  { value: 10, label: '10R', raceName: 'G1' },
  { value: 11, label: '11R', raceName: 'G1' },
  { value: 12, label: '12R', raceName: 'G1' },
] as const;

export interface SearchFilters {
  date: Dayjs | null;
  venue: string;
  raceNumber: number;
}

interface SearchAreaProps {
  onFiltersChange: (filters: SearchFilters) => void;
  onSearchClick: (filters: SearchFilters) => void;
  initialFilters?: Partial<SearchFilters>;
}

export const SearchArea = ({
  onFiltersChange,
  onSearchClick,
  initialFilters = {},
}: SearchAreaProps): JSX.Element => {
  const [filters, setFilters] = useState<SearchFilters>({
    date: initialFilters.date || dayjs(),
    venue: initialFilters.venue || 'tokyo',
    raceNumber: initialFilters.raceNumber || 1,
  });

  const handleDateChange = (newDate: Dayjs | null): void => {
    const newFilters = { ...filters, date: newDate };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleVenueChange = (venue: string): void => {
    const newFilters = { ...filters, venue };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleRaceChange = (raceNumber: number): void => {
    const newFilters = { ...filters, raceNumber };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const selectedRace = RACES.find((race) => race.value === filters.raceNumber);

  const handleSearchClick = (): void => {
    onSearchClick(filters);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ja'>
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Typography
          variant='h6'
          sx={{
            mb: 2,
            color: 'text.primary',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          🔍 レース検索
        </Typography>

        <Grid container spacing={2} alignItems='end'>
          {/* 開催日 */}
          <Grid item xs={12} sm={6} md={2.5}>
            <DatePicker
              label='開催日'
              value={filters.date}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'small',
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      },
                    },
                  },
                },
              }}
            />
          </Grid>

          {/* 会場 */}
          <Grid item xs={12} sm={6} md={2.5}>
            <FormControl fullWidth size='small'>
              <InputLabel>会場</InputLabel>
              <Select
                value={filters.venue}
                label='会場'
                onChange={(e) => handleVenueChange(e.target.value)}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                }}
              >
                {VENUES.map((venue) => (
                  <MenuItem key={venue.value} value={venue.value}>
                    {venue.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* レース番号 */}
          <Grid item xs={12} sm={6} md={2.5}>
            <FormControl fullWidth size='small'>
              <InputLabel>レース番号</InputLabel>
              <Select
                value={filters.raceNumber}
                label='レース番号'
                onChange={(e) => handleRaceChange(Number(e.target.value))}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                }}
              >
                {RACES.map((race) => (
                  <MenuItem key={race.value} value={race.value}>
                    {race.label} - {race.raceName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* レース名表示 */}
          <Grid item xs={12} sm={6} md={2.5}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: '40px',
                px: 2,
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: 1,
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <Typography
                variant='body2'
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {selectedRace?.raceName || 'レース名を選択してください'}
              </Typography>
            </Box>
          </Grid>

          {/* 検索ボタン */}
          <Grid item xs={12} sm={12} md={2}>
            <Button
              variant='contained'
              startIcon={<SearchIcon />}
              onClick={handleSearchClick}
              fullWidth
              sx={{
                height: '40px',
                borderRadius: 1,
                textTransform: 'none',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background:
                    'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                },
              }}
            >
              検索
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </LocalizationProvider>
  );
};
