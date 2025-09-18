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
  Chip,
  Alert,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import {
  type BetTicket,
  type PurchaseFormProps,
  type NagashiType,
} from './types/purchaseForm';
import { BET_TYPES, BET_METHODS } from './constants/betConfig';
import { useBetSelection } from './hooks/useBetSelection';
import { generateTicketCombinations } from './utils/combinationGenerator';
import { calculateCombinations } from './utils/pointCalculator';
import { isAmountValid, validateTicketAddition } from './utils/validation';

export const PurchaseForm = ({
  horses,
  onPurchase,
  onCancel,
}: PurchaseFormProps): JSX.Element => {
  const { t } = useTranslation('purchaseForm');
  const [amount, setAmount] = useState('');
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
    setNagashiType,
  } = useBetSelection(horses);

  // 馬券種別の設定を取得
  const betTypeConfig = BET_TYPES.find(
    (type) => type.value === selectedBetType
  );
  const methodConfig = BET_METHODS.find(
    (method) => method.value === selectedMethod
  );

  // 組み合わせ数を計算
  const combinations = calculateCombinations(
    columnHorses,
    betTypeConfig,
    methodConfig,
    axisHorse,
    nagashiType
  );

  // 馬券を追加
  const handleAddTicket = () => {
    const validationError = validateTicketAddition(
      selectedBetType,
      selectedMethod,
      columnHorses,
      amount,
      nagashiType,
      axisHorse,
      combinations
    );

    if (validationError) {
      setError(t(validationError));
      return;
    }

    const amountNum = parseInt(amount, 10);
    const allHorses = columnHorses.flat();

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
      type: `${betTypeConfig?.label} ${methodConfig?.label}`,
      horses: allHorses.map((h) => `${h}番`),
      combinations: generatedCombinations,
      amount: amountNum,
      totalAmount: amountNum * combinations,
    };

    setTickets([...tickets, newTicket]);
    resetForm();
    setAmount('');
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

  // 合計金額を計算
  const totalAmount = tickets.reduce(
    (sum, ticket) => sum + ticket.totalAmount,
    0
  );

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant='h6' sx={{ mb: 3, color: 'text.primary' }}>
        {t('title')}
      </Typography>

      {/* エラー表示 */}
      {error && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* 左側: 馬券選択 */}
        <Paper sx={{ p: 3, flex: 1 }}>
          <Typography variant='h6' sx={{ mb: 2 }}>
            {t('betSelection.title')}
          </Typography>

          {/* 馬券種別選択 */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>{t('betSelection.betType')}</InputLabel>
            <Select
              value={selectedBetType}
              label={t('betSelection.betType')}
              onChange={(e) => handleBetTypeChange(e.target.value)}
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
                onChange={(e) => handleMethodChange(e.target.value)}
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
            <Box sx={{ mb: 2 }}>
              {selectedMethod === 'nagashi' ? (
                <>
                  {/* 流し馬券の場合：タイプ選択 */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant='subtitle2' sx={{ mb: 1 }}>
                      {t('nagashi.title')}
                    </Typography>
                    <FormControl component='fieldset'>
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: 2,
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <input
                            type='radio'
                            id='multi1'
                            name='nagashiType'
                            value='multi1'
                            checked={nagashiType === 'multi1'}
                            onChange={(e) =>
                              setNagashiType(
                                e.target.value as
                                  | 'multi1'
                                  | 'multi2'
                                  | 'first'
                                  | 'second'
                                  | 'third'
                                  | 'firstSecond'
                              )
                            }
                          />
                          <label htmlFor='multi1' style={{ marginLeft: 8 }}>
                            {t('nagashi.multi1')}
                          </label>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <input
                            type='radio'
                            id='multi2'
                            name='nagashiType'
                            value='multi2'
                            checked={nagashiType === 'multi2'}
                            onChange={(e) =>
                              handleNagashiTypeChange(
                                e.target.value as NagashiType
                              )
                            }
                          />
                          <label htmlFor='multi2' style={{ marginLeft: 8 }}>
                            {t('nagashi.multi2')}
                          </label>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <input
                            type='radio'
                            id='first'
                            name='nagashiType'
                            value='first'
                            checked={nagashiType === 'first'}
                            onChange={(e) =>
                              handleNagashiTypeChange(
                                e.target.value as NagashiType
                              )
                            }
                          />
                          <label htmlFor='first' style={{ marginLeft: 8 }}>
                            {t('nagashi.first')}
                          </label>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <input
                            type='radio'
                            id='second'
                            name='nagashiType'
                            value='second'
                            checked={nagashiType === 'second'}
                            onChange={(e) =>
                              handleNagashiTypeChange(
                                e.target.value as NagashiType
                              )
                            }
                          />
                          <label htmlFor='second' style={{ marginLeft: 8 }}>
                            {t('nagashi.second')}
                          </label>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <input
                            type='radio'
                            id='third'
                            name='nagashiType'
                            value='third'
                            checked={nagashiType === 'third'}
                            onChange={(e) =>
                              handleNagashiTypeChange(
                                e.target.value as NagashiType
                              )
                            }
                          />
                          <label htmlFor='third' style={{ marginLeft: 8 }}>
                            {t('nagashi.third')}
                          </label>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <input
                            type='radio'
                            id='firstSecond'
                            name='nagashiType'
                            value='firstSecond'
                            checked={nagashiType === 'firstSecond'}
                            onChange={(e) =>
                              handleNagashiTypeChange(
                                e.target.value as NagashiType
                              )
                            }
                          />
                          <label
                            htmlFor='firstSecond'
                            style={{ marginLeft: 8 }}
                          >
                            {t('nagashi.firstSecond')}
                          </label>
                        </Box>
                      </Box>
                    </FormControl>
                  </Box>

                  {/* 流し馬券の場合：軸馬選択 */}
                  <Typography variant='subtitle2' sx={{ mb: 1 }}>
                    {t(`horseSelection.axis.${nagashiType}`)}
                  </Typography>
                  <Box
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}
                  >
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
                          ? 1 // 1着固定馬は1頭のみ
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
                              handleAxisHorseToggle(horse.number);
                            } else {
                              handleHorseToggle(horse.number, 0);
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
                            (!isSelected &&
                              (columnHorses[1]?.length || 0) >= 1);

                          return (
                            <Chip
                              key={`second-${horse.number}`}
                              label={`${horse.number}番 ${horse.name}`}
                              color={isSelected ? 'secondary' : 'default'}
                              variant={isSelected ? 'filled' : 'outlined'}
                              onClick={() => handleHorseToggle(horse.number, 1)}
                              disabled={isDisabled}
                              sx={{ mb: 1 }}
                            />
                          );
                        })}
                      </Box>
                    </>
                  )}

                  {/* 相手馬選択（1列のみ） */}
                  <Typography variant='subtitle2' sx={{ mb: 1 }}>
                    {t(`horseSelection.opponent.${nagashiType}`)}
                    <Typography
                      component='span'
                      variant='caption'
                      sx={{ ml: 1 }}
                    >
                      {t('horseSelection.multiple')}
                    </Typography>
                  </Typography>
                  <Box
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}
                  >
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
                      const maxHorses = horses.length; // 流し馬券でも出馬頭数まで選択可能
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
                            isSelected
                              ? 'primary'
                              : isAxis
                              ? 'secondary'
                              : 'default'
                          }
                          variant={isSelected ? 'filled' : 'outlined'}
                          onClick={() =>
                            handleHorseToggle(
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
                </>
              ) : (
                <>
                  {/* 通常馬券の場合：列ごとの選択 */}
                  {betTypeConfig && (
                    <Box sx={{ mb: 2 }}>
                      {Array.from(
                        { length: betTypeConfig.columns },
                        (_, index) => (
                          <Box key={index} sx={{ mb: 2 }}>
                            <Typography variant='subtitle2' sx={{ mb: 1 }}>
                              {betTypeConfig.value === 'win' ||
                              betTypeConfig.value === 'place'
                                ? t('horseSelection.select')
                                : `${index + 1}${t('horseSelection.column')}`}
                              <Typography
                                component='span'
                                variant='caption'
                                sx={{ ml: 1 }}
                              >
                                ({betTypeConfig.description})
                              </Typography>
                              {selectedBetType === 'win' ||
                              selectedBetType === 'place' ? (
                                <Typography
                                  component='span'
                                  variant='caption'
                                  sx={{ ml: 1 }}
                                >
                                  {t('horseSelection.multiple')}
                                </Typography>
                              ) : selectedMethod === 'single' ? (
                                <Typography
                                  component='span'
                                  variant='caption'
                                  sx={{ ml: 1 }}
                                >
                                  {t('horseSelection.single')}
                                </Typography>
                              ) : (
                                <Typography
                                  component='span'
                                  variant='caption'
                                  sx={{ ml: 1 }}
                                >
                                  {t('horseSelection.multiple')}
                                </Typography>
                              )}
                            </Typography>
                            <Box
                              sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
                            >
                              {horses.map((horse) => {
                                const isSelected =
                                  columnHorses[index]?.includes(horse.number) ||
                                  false;
                                const maxHorses =
                                  selectedBetType === 'win' ||
                                  selectedBetType === 'place'
                                    ? horses.length // 単勝・複勝は出馬頭数まで選択可能
                                    : selectedMethod === 'single'
                                    ? 1
                                    : horses.length; // その他は単式なら1頭まで、それ以外は出馬頭数まで
                                const isDisabled =
                                  !isSelected &&
                                  columnHorses[index]?.length >= maxHorses;

                                return (
                                  <Chip
                                    key={`column-${index}-${horse.number}`}
                                    label={`${horse.number}番 ${horse.name}`}
                                    color={isSelected ? 'primary' : 'default'}
                                    variant={isSelected ? 'filled' : 'outlined'}
                                    onClick={() =>
                                      handleHorseToggle(horse.number, index)
                                    }
                                    disabled={isDisabled}
                                    sx={{ mb: 1 }}
                                  />
                                );
                              })}
                            </Box>
                          </Box>
                        )
                      )}
                    </Box>
                  )}
                </>
              )}
            </Box>
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
            <Box
              sx={{ mb: 2, p: 2, bgcolor: 'primary.light', borderRadius: 1 }}
            >
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

        {/* 右側: 購入内容 */}
        <Paper sx={{ p: 3, flex: 1 }}>
          <Typography variant='h6' sx={{ mb: 2 }}>
            {t('purchaseContent.title')}
          </Typography>

          {tickets.length === 0 ? (
            <Typography
              color='text.secondary'
              sx={{ textAlign: 'center', py: 4 }}
            >
              {t('purchaseContent.empty')}
            </Typography>
          ) : (
            <List>
              {tickets.map((ticket, index) => (
                <Box key={ticket.id}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Box>
                          <Typography
                            variant='subtitle1'
                            sx={{ fontWeight: 'bold' }}
                          >
                            {ticket.type}
                          </Typography>
                          <Typography
                            variant='body2'
                            color='text.secondary'
                            sx={{ mb: 1 }}
                          >
                            {t('purchaseContent.selectedHorses')}:{' '}
                            {ticket.horses.join(', ')}
                          </Typography>
                          <Typography
                            variant='body2'
                            color='text.secondary'
                            sx={{ mb: 1 }}
                          >
                            {t('purchaseContent.combinations')}:{' '}
                            {ticket.combinations.length}
                            {t('points.unit')}
                          </Typography>
                          <Box sx={{ maxHeight: 100, overflowY: 'auto' }}>
                            {ticket.combinations.map((combo, comboIndex) => (
                              <Chip
                                key={comboIndex}
                                label={combo.join(' - ')}
                                size='small'
                                sx={{ mr: 0.5, mb: 0.5 }}
                              />
                            ))}
                          </Box>
                        </Box>
                      }
                      secondary={`¥${ticket.amount.toLocaleString()} × ${
                        ticket.combinations.length
                      } = ¥${ticket.totalAmount.toLocaleString()}`}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton
                        edge='end'
                        onClick={() => handleRemoveTicket(ticket.id)}
                        color='error'
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </ListItem>
                  {index < tickets.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          )}

          {/* 合計金額 */}
          <Box sx={{ mt: 3, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
            <Typography
              variant='h6'
              sx={{
                textAlign: 'center',
                color: 'success.contrastText',
                fontWeight: 'bold',
              }}
            >
              {t('purchaseContent.total')}: ¥{totalAmount.toLocaleString()}
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* アクションボタン */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button
          variant='outlined'
          onClick={onCancel}
          sx={{
            borderColor: 'error.main',
            color: 'error.main',
            '&:hover': {
              borderColor: 'error.dark',
              backgroundColor: 'error.light',
              color: 'error.dark',
            },
          }}
        >
          {t('buttons.cancel')}
        </Button>
        <Button
          variant='contained'
          onClick={handlePurchase}
          disabled={tickets.length === 0}
          sx={{
            backgroundColor: 'success.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'success.dark',
            },
            '&:disabled': {
              backgroundColor: 'grey.400',
              color: 'grey.600',
            },
          }}
        >
          {t('buttons.purchase')}
        </Button>
      </Box>
    </Box>
  );
};
