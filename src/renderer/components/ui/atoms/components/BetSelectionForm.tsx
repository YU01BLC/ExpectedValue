import { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { type Horse, type NagashiType } from '../types/purchaseForm';
import { BET_TYPES, BET_METHODS } from '../constants/betConfig';
import { HorseSelector } from './HorseSelector';

interface BetSelectionFormProps {
  horses: Horse[];
  selectedBetType: string;
  selectedMethod: string;
  columnHorses: number[][];
  axisHorse: number | null;
  nagashiType: NagashiType;
  onBetTypeChange: (betType: string) => void;
  onMethodChange: (method: string) => void;
  onHorseToggle: (horseNumber: number, columnIndex: number) => void;
  onAxisHorseToggle: (horseNumber: number) => void;
  onNagashiTypeChange: (type: NagashiType) => void;
  onAddTicket: (amount: number) => void;
  combinations: number;
  error: string;
}

export const BetSelectionForm = ({
  horses,
  selectedBetType,
  selectedMethod,
  columnHorses,
  axisHorse,
  nagashiType,
  onBetTypeChange,
  onMethodChange,
  onHorseToggle,
  onAxisHorseToggle,
  onNagashiTypeChange,
  onAddTicket,
  combinations,
  error,
}: BetSelectionFormProps): JSX.Element => {
  const { t } = useTranslation('purchaseForm');
  const [amount, setAmount] = useState('');

  const isAmountValid = (amount: string): boolean => {
    const amountNum = parseInt(amount, 10);
    return !isNaN(amountNum) && amountNum >= 100 && amountNum % 100 === 0;
  };

  const handleAddTicket = () => {
    const amountNum = parseInt(amount, 10);
    if (isAmountValid(amount)) {
      onAddTicket(amountNum);
      setAmount('');
    }
  };

  return (
    <Paper
      sx={{
        p: { xs: 1.5, sm: 2 },
        height: 'fit-content',
        maxHeight: { xs: '70vh', md: 'none' },
        overflow: { xs: 'auto', md: 'visible' },
      }}
    >
      <Typography
        variant='h6'
        sx={{
          mb: 2,
          fontSize: { xs: '1.1rem', sm: '1.25rem' },
        }}
      >
        {t('betSelection.title')}
      </Typography>

      {/* エラー表示 */}
      {error && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* 馬券種別選択 */}
      <FormControl fullWidth sx={{ mb: 1.5 }}>
        <InputLabel size='small'>{t('betSelection.betType')}</InputLabel>
        <Select
          value={selectedBetType}
          label={t('betSelection.betType')}
          onChange={(e) => onBetTypeChange(e.target.value)}
          size='small'
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
              },
            },
          }}
        >
          {BET_TYPES.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* 買い方選択 */}
      {selectedBetType && (
        <FormControl fullWidth sx={{ mb: 1.5 }}>
          <InputLabel size='small'>{t('betSelection.method')}</InputLabel>
          <Select
            value={selectedMethod}
            label={t('betSelection.method')}
            onChange={(e) => onMethodChange(e.target.value)}
            size='small'
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                },
              },
            }}
          >
            {(selectedBetType === 'win' || selectedBetType === 'place'
              ? BET_METHODS.filter((method) => method.value === 'single')
              : BET_METHODS
            ).map((method) => (
              <MenuItem key={method.value} value={method.value}>
                <Box>
                  <Typography variant='body2'>{method.label}</Typography>
                  <Typography variant='caption' color='text.secondary'>
                    {method.description}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* 馬選択 */}
      {selectedBetType && selectedMethod && (
        <HorseSelector
          horses={horses}
          selectedBetType={selectedBetType}
          selectedMethod={selectedMethod}
          columnHorses={columnHorses}
          axisHorse={axisHorse}
          nagashiType={nagashiType}
          onHorseToggle={onHorseToggle}
          onAxisHorseToggle={onAxisHorseToggle}
          onNagashiTypeChange={onNagashiTypeChange}
        />
      )}

      {/* 金額入力 */}
      <TextField
        fullWidth
        label={t('amount.label')}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder={t('amount.placeholder')}
        size='small'
        sx={{ mb: 1.5 }}
        helperText={
          amount && !isAmountValid(amount)
            ? t('amount.errorText')
            : t('amount.helperText')
        }
        error={amount !== '' && !isAmountValid(amount)}
        InputProps={{
          startAdornment: (
            <Typography sx={{ mr: 1, fontSize: '0.875rem' }}>¥</Typography>
          ),
        }}
      />

      {/* 点数表示 */}
      {selectedBetType && selectedMethod && (
        <Box
          sx={{ mb: 1.5, p: 1.5, bgcolor: 'primary.light', borderRadius: 1 }}
        >
          <Typography
            variant='body2'
            sx={{
              color: 'primary.contrastText',
              fontWeight: 'bold',
              fontSize: '0.875rem',
            }}
          >
            {t('points.label')}: {combinations}
            {t('points.unit')}
          </Typography>
        </Box>
      )}

      {/* 馬券追加ボタン */}
      <Button
        variant='contained'
        onClick={handleAddTicket}
        disabled={
          !selectedBetType ||
          !selectedMethod ||
          !amount ||
          !isAmountValid(amount) ||
          combinations === 0
        }
        startIcon={<AddIcon />}
        fullWidth
        size='small'
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          fontSize: { xs: '0.875rem', sm: '0.9rem' },
          py: 1,
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
          '&:disabled': {
            backgroundColor: 'grey.400',
            color: 'grey.600',
          },
        }}
      >
        {t('buttons.addTicket')}
      </Button>
    </Paper>
  );
};
