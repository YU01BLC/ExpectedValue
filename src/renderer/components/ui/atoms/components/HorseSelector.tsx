import { type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  useTheme,
} from '@mui/material';
import { getGateColor } from '../utils/raceTableUtils';
import { type Horse, type NagashiType } from '../types/purchaseForm';

interface HorseSelectorProps {
  horses: Horse[];
  selectedBetType: string;
  selectedMethod: string;
  columnHorses: number[][];
  axisHorse: number | null;
  nagashiType: NagashiType;
  onHorseToggle: (horseNumber: number, columnIndex: number) => void;
  onAxisHorseToggle: (horseNumber: number) => void;
  onNagashiTypeChange: (type: NagashiType) => void;
}

export const HorseSelector = ({
  horses,
  selectedBetType,
  selectedMethod,
  columnHorses,
  axisHorse,
  nagashiType,
  onHorseToggle,
  onAxisHorseToggle,
  onNagashiTypeChange,
}: HorseSelectorProps): JSX.Element => {
  const { t } = useTranslation('purchaseForm');
  const theme = useTheme();

  if (selectedMethod === 'nagashi') {
    return (
      <Box sx={{ mb: 2 }}>
        {/* 流し馬券の場合：タイプ選択 */}
        <Box sx={{ mb: 2 }}>
          <Typography variant='subtitle2' sx={{ mb: 1 }}>
            {t('nagashi.title')}
          </Typography>
          <FormControl component='fieldset'>
            <RadioGroup
              value={nagashiType}
              onChange={(e) =>
                onNagashiTypeChange(e.target.value as NagashiType)
              }
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(3, 1fr)',
                },
                gap: { xs: 0.5, sm: 1 },
              }}
            >
              <FormControlLabel
                value='multi1'
                control={<Radio size='small' />}
                label={t('nagashi.multi1')}
                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
              />
              <FormControlLabel
                value='multi2'
                control={<Radio size='small' />}
                label={t('nagashi.multi2')}
                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
              />
              <FormControlLabel
                value='first'
                control={<Radio size='small' />}
                label={t('nagashi.first')}
                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
              />
              <FormControlLabel
                value='second'
                control={<Radio size='small' />}
                label={t('nagashi.second')}
                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
              />
              <FormControlLabel
                value='third'
                control={<Radio size='small' />}
                label={t('nagashi.third')}
                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
              />
              <FormControlLabel
                value='firstSecond'
                control={<Radio size='small' />}
                label={t('nagashi.firstSecond')}
                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
              />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* 軸馬選択テーブル */}
        <Typography variant='subtitle2' sx={{ mb: 1 }}>
          {t(`horseSelection.axis.${nagashiType}`)}
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 2, maxHeight: 300 }}>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', minWidth: 60 }}>
                  馬番
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>馬名</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  {nagashiType === 'firstSecond' ? '1着' : '軸馬'}
                </TableCell>
                {nagashiType === 'firstSecond' && (
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    2着
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {horses.map((horse) => {
                const isSelected =
                  nagashiType === 'first' ||
                  nagashiType === 'second' ||
                  nagashiType === 'third' ||
                  nagashiType === 'multi1'
                    ? axisHorse === horse.number
                    : nagashiType === 'firstSecond'
                    ? columnHorses[0]?.includes(horse.number) || false
                    : columnHorses[0]?.includes(horse.number) || false;
                const isSecondSelected =
                  nagashiType === 'firstSecond'
                    ? columnHorses[1]?.includes(horse.number) || false
                    : false;
                const maxAxisHorses =
                  nagashiType === 'multi2'
                    ? 2
                    : nagashiType === 'firstSecond'
                    ? 1
                    : 1;
                const isDisabled =
                  !isSelected &&
                  (nagashiType === 'first' ||
                  nagashiType === 'second' ||
                  nagashiType === 'third' ||
                  nagashiType === 'multi1'
                    ? axisHorse !== null
                    : (columnHorses[0]?.length || 0) >= maxAxisHorses);

                return (
                  <TableRow key={`axis-${horse.number}`}>
                    <TableCell>
                      <Box
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          backgroundColor: getGateColor(
                            horse.gateNumber,
                            theme,
                            horses.length
                          ).bg,
                          color: getGateColor(
                            horse.gateNumber,
                            theme,
                            horses.length
                          ).text,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: '0.8rem',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          border: '2px solid white',
                        }}
                      >
                        {horse.number}
                      </Box>
                    </TableCell>
                    <TableCell>{horse.name}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Checkbox
                        checked={isSelected}
                        onChange={() => {
                          if (
                            nagashiType === 'first' ||
                            nagashiType === 'second' ||
                            nagashiType === 'third' ||
                            nagashiType === 'multi1'
                          ) {
                            onAxisHorseToggle(horse.number);
                          } else {
                            onHorseToggle(horse.number, 0);
                          }
                        }}
                        disabled={isDisabled}
                        size='small'
                      />
                    </TableCell>
                    {nagashiType === 'firstSecond' && (
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Checkbox
                          checked={isSecondSelected}
                          onChange={() => onHorseToggle(horse.number, 1)}
                          disabled={
                            !isSecondSelected &&
                            (columnHorses[1]?.length || 0) >= 1
                          }
                          size='small'
                        />
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 相手馬選択テーブル */}
        <Typography variant='subtitle2' sx={{ mb: 1 }}>
          {t(`horseSelection.opponent.${nagashiType}`)}
          <Typography component='span' variant='caption' sx={{ ml: 1 }}>
            {t('horseSelection.multiple')}
          </Typography>
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 2, maxHeight: 300 }}>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', minWidth: 60 }}>
                  馬番
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>馬名</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  {nagashiType === 'firstSecond' ? '3着' : '相手馬'}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {horses.map((horse) => {
                const isSelected =
                  nagashiType === 'firstSecond'
                    ? columnHorses[2]?.includes(horse.number) || false
                    : columnHorses[1]?.includes(horse.number) || false;
                const isAxis =
                  nagashiType === 'first' ||
                  nagashiType === 'second' ||
                  nagashiType === 'third' ||
                  nagashiType === 'multi1'
                    ? axisHorse === horse.number
                    : nagashiType === 'firstSecond'
                    ? columnHorses[0]?.includes(horse.number) ||
                      columnHorses[1]?.includes(horse.number) ||
                      false
                    : columnHorses[0]?.includes(horse.number) || false;
                const maxHorses = horses.length;
                const isDisabled =
                  isAxis ||
                  (!isSelected &&
                    (nagashiType === 'firstSecond'
                      ? (columnHorses[2]?.length || 0) >= maxHorses
                      : (columnHorses[1]?.length || 0) >= maxHorses));

                return (
                  <TableRow key={`opponent-${horse.number}`}>
                    <TableCell>
                      <Box
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          backgroundColor: getGateColor(
                            horse.gateNumber,
                            theme,
                            horses.length
                          ).bg,
                          color: getGateColor(
                            horse.gateNumber,
                            theme,
                            horses.length
                          ).text,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: '0.8rem',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          border: '2px solid white',
                        }}
                      >
                        {horse.number}
                      </Box>
                    </TableCell>
                    <TableCell>{horse.name}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Checkbox
                        checked={isSelected}
                        onChange={() =>
                          onHorseToggle(
                            horse.number,
                            nagashiType === 'firstSecond' ? 2 : 1
                          )
                        }
                        disabled={isDisabled}
                        size='small'
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  // 通常馬券の場合
  const getColumnCount = () => {
    if (selectedBetType === 'win' || selectedBetType === 'place') return 1;
    if (selectedMethod === 'box') return 1; // ボックスは一列目のみ
    if (
      selectedBetType === 'bracket' ||
      selectedBetType === 'quinella' ||
      selectedBetType === 'exacta' ||
      selectedBetType === 'wide'
    )
      return 2;
    if (selectedBetType === 'trio' || selectedBetType === 'trifecta') return 3;
    return 1;
  };

  const getColumnLabel = (index: number) => {
    if (selectedBetType === 'win' || selectedBetType === 'place') {
      return t('horseSelection.select');
    }
    if (selectedMethod === 'box') {
      return t('horseSelection.boxSelection');
    }
    if (selectedBetType === 'trifecta') {
      const labels = ['1着', '2着', '3着'];
      return labels[index] || `${index + 1}${t('horseSelection.column')}`;
    }
    if (selectedBetType === 'trio') {
      const labels = ['1着', '2着', '3着'];
      return labels[index] || `${index + 1}${t('horseSelection.column')}`;
    }
    if (selectedBetType === 'exacta') {
      const labels = ['1着', '2着'];
      return labels[index] || `${index + 1}${t('horseSelection.column')}`;
    }
    if (selectedBetType === 'quinella' || selectedBetType === 'wide') {
      const labels = ['1着', '2着'];
      return labels[index] || `${index + 1}${t('horseSelection.column')}`;
    }
    return `${index + 1}${t('horseSelection.column')}`;
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant='subtitle2' sx={{ mb: 1 }}>
        {selectedBetType === 'win' || selectedBetType === 'place'
          ? t('horseSelection.select')
          : t('horseSelection.columnSelection')}
        <Typography component='span' variant='caption' sx={{ ml: 1 }}>
          (
          {selectedBetType === 'win' || selectedBetType === 'place'
            ? t('horseSelection.multiple')
            : selectedMethod === 'single'
            ? t('horseSelection.single')
            : t('horseSelection.multiple')}
          )
        </Typography>
      </Typography>

      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', minWidth: 60 }}>
                馬番
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>馬名</TableCell>
              {Array.from({ length: getColumnCount() }, (_, index) => (
                <TableCell
                  key={index}
                  sx={{ fontWeight: 'bold', textAlign: 'center' }}
                >
                  {getColumnLabel(index)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {horses.map((horse) => (
              <TableRow key={horse.number}>
                <TableCell>
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      backgroundColor: getGateColor(
                        horse.gateNumber,
                        theme,
                        horses.length
                      ).bg,
                      color: getGateColor(
                        horse.gateNumber,
                        theme,
                        horses.length
                      ).text,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      border: '2px solid white',
                    }}
                  >
                    {horse.number}
                  </Box>
                </TableCell>
                <TableCell>{horse.name}</TableCell>
                {Array.from({ length: getColumnCount() }, (_, index) => {
                  const isSelected =
                    columnHorses[index]?.includes(horse.number) || false;
                  const maxHorses =
                    selectedBetType === 'win' || selectedBetType === 'place'
                      ? horses.length
                      : selectedMethod === 'single'
                      ? 1
                      : horses.length;
                  const isDisabled =
                    !isSelected &&
                    (columnHorses[index]?.length || 0) >= maxHorses;

                  return (
                    <TableCell key={index} sx={{ textAlign: 'center' }}>
                      <Checkbox
                        checked={isSelected}
                        onChange={() => onHorseToggle(horse.number, index)}
                        disabled={isDisabled}
                        size='small'
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
