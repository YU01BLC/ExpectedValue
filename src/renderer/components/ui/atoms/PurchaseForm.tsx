import { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

import { type BetTicket, type PurchaseFormProps } from './types/purchaseForm';
import { BET_TYPES, BET_METHODS } from './constants/betConfig';
import { useBetSelection } from './hooks/useBetSelection';
import { generateTicketCombinations } from './utils/combinationGenerator';
import { calculateCombinations } from './utils/pointCalculator';
import { validateTicketAddition } from './utils/validation';
import { BetSelectionForm } from './components/BetSelectionForm';
import { PurchaseSummary } from './components/PurchaseSummary';
import { ActionButtons } from './components/ActionButtons';

export const PurchaseForm = ({
  horses,
  onPurchase,
  onCancel,
}: PurchaseFormProps): JSX.Element => {
  const { t } = useTranslation('purchaseForm');
  const [tickets, setTickets] = useState<BetTicket[]>([]);
  const [error, setError] = useState('');

  const {
    selectedBetType,
    selectedMethod,
    columnHorses,
    axisHorse,
    nagashiType,
    handleHorseToggle,
    handleAxisHorseToggle,
    handleBetTypeChange,
    handleMethodChange,
    handleNagashiTypeChange,
    resetForm,
  } = useBetSelection(horses);

  // 組み合わせ数を計算
  const betTypeConfig = BET_TYPES.find(
    (type) => type.value === selectedBetType
  );
  const methodConfig = BET_METHODS.find(
    (method) => method.value === selectedMethod
  );

  const combinations = calculateCombinations(
    columnHorses,
    betTypeConfig,
    methodConfig,
    axisHorse,
    nagashiType
  );

  // 馬券を追加
  const handleAddTicket = (amount: number) => {
    const validationError = validateTicketAddition(
      selectedBetType,
      selectedMethod,
      columnHorses,
      amount.toString(),
      nagashiType,
      axisHorse,
      combinations
    );

    if (validationError) {
      setError(t(validationError));
      return;
    }

    // 組み合わせを生成
    const generatedCombinations = generateTicketCombinations(
      columnHorses,
      selectedBetType,
      selectedMethod,
      axisHorse,
      nagashiType
    );

    const newTicket: BetTicket = {
      id: `ticket-${Date.now()}`,
      type: `${selectedBetType} ${selectedMethod}`,
      horses: columnHorses.flat().map((h) => `${h}番`),
      combinations: generatedCombinations,
      amount: amount,
      totalAmount: amount * combinations,
    };

    setTickets([...tickets, newTicket]);
    resetForm();
    setError('');
  };

  // 馬券を削除
  const handleRemoveTicket = (id: string) => {
    setTickets(tickets.filter((ticket) => ticket.id !== id));
  };

  // 購入実行
  const handlePurchase = () => {
    if (tickets.length === 0) {
      setError(t('errors.ticketsRequired'));
      return;
    }
    onPurchase(tickets);
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant='h6' sx={{ mb: 3, color: 'text.primary' }}>
        {t('title')}
      </Typography>

      <Box sx={{ display: 'flex', gap: 3 }}>
        <BetSelectionForm
          horses={horses}
          selectedBetType={selectedBetType}
          selectedMethod={selectedMethod}
          columnHorses={columnHorses}
          axisHorse={axisHorse}
          nagashiType={nagashiType}
          onBetTypeChange={handleBetTypeChange}
          onMethodChange={handleMethodChange}
          onHorseToggle={handleHorseToggle}
          onAxisHorseToggle={handleAxisHorseToggle}
          onNagashiTypeChange={handleNagashiTypeChange}
          onAddTicket={handleAddTicket}
          combinations={combinations}
          error={error}
        />

        <PurchaseSummary
          tickets={tickets}
          onRemoveTicket={handleRemoveTicket}
        />
      </Box>

      <ActionButtons
        onCancel={onCancel}
        onPurchase={handlePurchase}
        isPurchaseDisabled={tickets.length === 0}
      />
    </Box>
  );
};
