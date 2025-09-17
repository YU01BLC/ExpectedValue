import { type JSX, useMemo, useState } from 'react';
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Grid,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';

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

// 詳細モーダルの型定義
interface HorseDetailModalProps {
  horse: HorseData | null;
  open: boolean;
  onClose: () => void;
}

// 評価の色を取得する関数（テーマカラー使用）
const getEvaluationColor = (evaluation: string, theme: Theme) => {
  return (
    theme.palette.evaluation[
      evaluation as keyof typeof theme.palette.evaluation
    ] ||
    theme.palette.evaluation?.D ||
    theme.palette.grey[500]
  );
};

// 枠番の色を取得する関数（テーマカラー使用）
const getGateColor = (gateNumber: number, theme: Theme) => {
  return (
    theme.palette.gate?.[gateNumber as keyof typeof theme.palette.gate] ||
    theme.palette.gate?.default || {
      bg: theme.palette.grey[300],
      text: theme.palette.grey[800],
    }
  );
};

// 詳細モーダルコンポーネント
const HorseDetailModal = ({
  horse,
  open,
  onClose,
}: HorseDetailModalProps): JSX.Element => {
  const theme = useTheme();

  if (!horse) return <></>;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(10px)',
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h6'>{horse.name}</Typography>
          <IconButton onClick={onClose} size='small'>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
              枠番
            </Typography>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: getGateColor(horse.gateNumber, theme).bg,
                color: getGateColor(horse.gateNumber, theme).text,
                fontWeight: 700,
                fontSize: '0.875rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              {horse.gateNumber}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
              馬番
            </Typography>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: getGateColor(horse.gateNumber, theme).bg,
                color: getGateColor(horse.gateNumber, theme).text,
                fontWeight: 700,
                fontSize: '0.875rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                position: 'relative',
                '&::before': {
                  content: `'${horse.horseNumber}'`,
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '60%',
                  height: '60%',
                  borderRadius: '50%',
                  backgroundColor: getGateColor(horse.gateNumber, theme).text,
                  opacity: 0.1,
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
              評価
            </Typography>
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
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
              オッズ
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', height: 32 }}>
              <Typography variant='body1' fontWeight='bold'>
                {horse.odds}倍
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
              期待値
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', height: 32 }}>
              <Typography variant='h6' color='primary.main'>
                {horse.expectedValue}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
              コメント
            </Typography>
            <Typography variant='body1'>{horse.comment}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='contained'>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const RaceTableResponsive = ({
  horseData,
  sortField,
  sortDirection,
  onSort,
}: RaceTableProps): JSX.Element => {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const [selectedHorse, setSelectedHorse] = useState<HorseData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // ソートされたデータの計算
  const sortedHorseData = useMemo(() => {
    if (!sortField) return horseData;

    return [...horseData].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'horseNumber':
          aValue = a.horseNumber;
          bValue = b.horseNumber;
          break;
        case 'gateNumber':
          aValue = a.gateNumber;
          bValue = b.gateNumber;
          break;
        case 'evaluation':
          aValue = a.evaluation;
          bValue = b.evaluation;
          break;
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

  const handleHorseClick = (horse: HorseData) => {
    setSelectedHorse(horse);
    setModalOpen(true);
  };

  return (
    <>
      {/* デスクトップ用テーブル表示 */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
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
                    direction={
                      sortField === 'gateNumber' ? sortDirection : 'asc'
                    }
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
                    direction={
                      sortField === 'horseNumber' ? sortDirection : 'asc'
                    }
                    onClick={() => onSort('horseNumber')}
                    sx={{ color: 'text.primary', fontWeight: 600 }}
                  >
                    {t('table.horseNumber')}
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={{
                    color: 'text.primary',
                    fontWeight: 600,
                    minWidth: '120px',
                  }}
                >
                  <TableSortLabel
                    active={sortField === 'name'}
                    direction={sortField === 'name' ? sortDirection : 'asc'}
                    onClick={() => onSort('name')}
                    sx={{ color: 'text.primary', fontWeight: 600 }}
                  >
                    {t('table.horseName')}
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={{
                    color: 'text.primary',
                    fontWeight: 600,
                    width: '80px',
                  }}
                >
                  <TableSortLabel
                    active={sortField === 'evaluation'}
                    direction={
                      sortField === 'evaluation' ? sortDirection : 'asc'
                    }
                    onClick={() => onSort('evaluation')}
                    sx={{ color: 'text.primary', fontWeight: 600 }}
                  >
                    {t('table.evaluation')}
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={{
                    color: 'text.primary',
                    fontWeight: 600,
                    width: '100px',
                  }}
                >
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
                <TableCell
                  sx={{
                    color: 'text.primary',
                    fontWeight: 600,
                    width: '80px',
                  }}
                >
                  <TableSortLabel
                    active={sortField === 'odds'}
                    direction={sortField === 'odds' ? sortDirection : 'asc'}
                    onClick={() => onSort('odds')}
                    sx={{ color: 'text.primary', fontWeight: 600 }}
                  >
                    {t('table.odds')}
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={{
                    color: 'text.primary',
                    fontWeight: 600,
                    minWidth: '200px',
                  }}
                >
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
      </Box>

      {/* モバイル用アコーディオン表示 */}
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
            {sortField === 'horseNumber' &&
              (sortDirection === 'asc' ? '↑' : '↓')}
          </Button>
          <Button
            size='small'
            variant={sortField === 'odds' ? 'contained' : 'outlined'}
            onClick={() => onSort('odds')}
            sx={{ minWidth: 'auto', px: 2 }}
          >
            オッズ{' '}
            {sortField === 'odds' && (sortDirection === 'asc' ? '↑' : '↓')}
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

        {sortedHorseData.map((horse) => (
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
              <Box
                sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
              >
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
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: getEvaluationColor(
                      horse.evaluation,
                      theme
                    ),
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
                onClick={() => handleHorseClick(horse)}
              >
                タップして詳細を表示
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* 詳細モーダル */}
      <HorseDetailModal
        horse={selectedHorse}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};
