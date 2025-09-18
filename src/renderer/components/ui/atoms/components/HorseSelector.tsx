import { type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Chip,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
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
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 2,
              }}
            >
              <FormControlLabel
                value='multi1'
                control={<Radio />}
                label={t('nagashi.multi1')}
              />
              <FormControlLabel
                value='multi2'
                control={<Radio />}
                label={t('nagashi.multi2')}
              />
              <FormControlLabel
                value='first'
                control={<Radio />}
                label={t('nagashi.first')}
              />
              <FormControlLabel
                value='second'
                control={<Radio />}
                label={t('nagashi.second')}
              />
              <FormControlLabel
                value='third'
                control={<Radio />}
                label={t('nagashi.third')}
              />
              <FormControlLabel
                value='firstSecond'
                control={<Radio />}
                label={t('nagashi.firstSecond')}
              />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* 軸馬選択 */}
        <Typography variant='subtitle2' sx={{ mb: 1 }}>
          {t(`horseSelection.axis.${nagashiType}`)}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
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
              <Chip
                key={`axis-${horse.number}`}
                label={`${horse.number}番 ${horse.name}`}
                color={isSelected ? 'secondary' : 'default'}
                variant={isSelected ? 'filled' : 'outlined'}
                onClick={() => {
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
                sx={{ mb: 1 }}
              />
            );
          })}
        </Box>

        {/* 1着・2着固定流しの場合：2着固定馬選択 */}
        {nagashiType === 'firstSecond' && (
          <>
            <Typography variant='subtitle2' sx={{ mb: 1 }}>
              {t('horseSelection.secondFixed')}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                mb: 2,
              }}
            >
              {horses.map((horse) => {
                const isSelected =
                  columnHorses[1]?.includes(horse.number) || false;
                const isFirstHorse =
                  columnHorses[0]?.includes(horse.number) || false;
                const isDisabled =
                  isFirstHorse ||
                  (!isSelected && (columnHorses[1]?.length || 0) >= 1);

                return (
                  <Chip
                    key={`second-${horse.number}`}
                    label={`${horse.number}番 ${horse.name}`}
                    color={isSelected ? 'secondary' : 'default'}
                    variant={isSelected ? 'filled' : 'outlined'}
                    onClick={() => onHorseToggle(horse.number, 1)}
                    disabled={isDisabled}
                    sx={{ mb: 1 }}
                  />
                );
              })}
            </Box>
          </>
        )}

        {/* 相手馬選択 */}
        <Typography variant='subtitle2' sx={{ mb: 1 }}>
          {t(`horseSelection.opponent.${nagashiType}`)}
          <Typography component='span' variant='caption' sx={{ ml: 1 }}>
            {t('horseSelection.multiple')}
          </Typography>
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
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
              <Chip
                key={`opponent-${horse.number}`}
                label={`${horse.number}番 ${horse.name}`}
                color={
                  isSelected ? 'primary' : isAxis ? 'secondary' : 'default'
                }
                variant={isSelected ? 'filled' : 'outlined'}
                onClick={() =>
                  onHorseToggle(
                    horse.number,
                    nagashiType === 'firstSecond' ? 2 : 1
                  )
                }
                disabled={isDisabled}
                sx={{ mb: 1 }}
              />
            );
          })}
        </Box>
      </Box>
    );
  }

  // 通常馬券の場合
  const getColumnCount = () => {
    if (selectedBetType === 'win' || selectedBetType === 'place') return 1;
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

  return (
    <Box sx={{ mb: 2 }}>
      {Array.from({ length: getColumnCount() }, (_, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography variant='subtitle2' sx={{ mb: 1 }}>
            {selectedBetType === 'win' || selectedBetType === 'place'
              ? t('horseSelection.select')
              : `${index + 1}${t('horseSelection.column')}`}
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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {horses.map((horse) => {
              const isSelected =
                columnHorses[index]?.includes(horse.number) || false;
              const maxHorses =
                selectedBetType === 'win' || selectedBetType === 'place'
                  ? horses.length
                  : selectedMethod === 'single'
                  ? 1
                  : horses.length;
              const isDisabled =
                !isSelected && (columnHorses[index]?.length || 0) >= maxHorses;

              return (
                <Chip
                  key={`column-${index}-${horse.number}`}
                  label={`${horse.number}番 ${horse.name}`}
                  color={isSelected ? 'primary' : 'default'}
                  variant={isSelected ? 'filled' : 'outlined'}
                  onClick={() => onHorseToggle(horse.number, index)}
                  disabled={isDisabled}
                  sx={{ mb: 1 }}
                />
              );
            })}
          </Box>
        </Box>
      ))}
    </Box>
  );
};
