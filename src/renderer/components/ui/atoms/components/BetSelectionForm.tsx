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
    <Paper sx={{ p: 3, flex: 1 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        {t('betSelection.title')}
      </Typography>

      {/* エラー表示 */}
      {error && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* 馬券種別選択 */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>{t('betSelection.betType')}</InputLabel>
        <Select
          value={selectedBetType}
          label={t('betSelection.betType')}
          onChange={(e) => onBetTypeChange(e.target.value)}
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
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>{t('betSelection.method')}</InputLabel>
          <Select
            value={selectedMethod}
            label={t('betSelection.method')}
            onChange={(e) => onMethodChange(e.target.value)}
          >
            {(selectedBetType === 'win' || selectedBetType === 'place'
              ? BET_METHODS.filter((method) => method.value === 'single')
              : BET_METHODS
            ).map((method) => (
              <MenuItem key={method.value} value={method.value}>
                <Box>
                  <Typography variant='body1'>{method.label}</Typography>
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
        sx={{ mb: 2 }}
        helperText={
          amount && !isAmountValid(amount)
            ? t('amount.errorText')
            : t('amount.helperText')
        }
        error={amount !== '' && !isAmountValid(amount)}
        InputProps={{
          startAdornment: <Typography sx={{ mr: 1 }}>¥</Typography>,
        }}
      />

      {/* 点数表示 */}
      {selectedBetType && selectedMethod && (
        <Box sx={{ mb: 2, p: 2, bgcolor: 'primary.light', borderRadius: 1 }}>
          <Typography
            variant='body2'
            sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}
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
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
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
