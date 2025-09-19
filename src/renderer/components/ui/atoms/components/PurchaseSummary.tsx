import { type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { type BetTicket } from '../types/purchaseForm';

interface PurchaseSummaryProps {
  tickets: BetTicket[];
  onRemoveTicket: (id: string) => void;
}

export const PurchaseSummary = ({
  tickets,
  onRemoveTicket,
}: PurchaseSummaryProps): JSX.Element => {
  const { t } = useTranslation('purchaseForm');

  // 馬券の種類を翻訳する関数
  const translateBetType = (type: string): string => {
    // "trifecta nagashi" -> "三連単流し" のような形式に翻訳
    const parts = type.split(' ');
    if (parts.length === 1) {
      // 通常の馬券種別
      return t(`betTypes.${parts[0]}`);
    } else if (parts.length === 2) {
      // 流し馬券
      const betType = t(`betTypes.${parts[0]}`);
      const method = t(`betMethods.${parts[1]}`);
      return `${betType}${method}`;
    }
    return type;
  };

  // 選択馬の表示を改善する関数
  const formatSelectedHorses = (ticket: BetTicket): string => {
    if (ticket.axisHorse && ticket.opponentHorses) {
      // 流し馬券の場合
      const axisText = `軸馬: ${ticket.axisHorse}`;
      const opponentText =
        ticket.opponentHorses.length > 0
          ? `相手馬: ${ticket.opponentHorses.join(', ')}`
          : '相手馬: 選択なし';
      return `${axisText}, ${opponentText}`;
    } else if (ticket.columnHorses && ticket.columnHorses.length > 0) {
      // フォーメーション買いの場合
      const columnTexts = ticket.columnHorses.map((column, index) => {
        const columnLabel = `${index + 1}列目`;
        const horsesText = column.length > 0 ? column.join(', ') : '選択なし';
        return `${columnLabel}: ${horsesText}`;
      });
      return columnTexts.join(' | ');
    } else {
      // 通常の馬券の場合
      if (ticket.horses.length === 0) return '選択なし';
      return ticket.horses.join(', ');
    }
  };

  // 合計金額を計算
  const totalAmount = tickets.reduce(
    (sum, ticket) => sum + ticket.totalAmount,
    0
  );

  return (
    <Paper
      sx={{
        p: { xs: 1.5, sm: 2 },
        height: 'fit-content',
        maxHeight: { xs: '50vh', md: 'none' },
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
        {t('purchaseContent.title')}
      </Typography>

      {tickets.length === 0 ? (
        <Typography color='text.secondary' sx={{ textAlign: 'center', py: 4 }}>
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
                        {translateBetType(ticket.type)}
                      </Typography>
                      <Typography
                        variant='caption'
                        color='text.secondary'
                        sx={{ mb: 0.5, display: 'block' }}
                      >
                        {t('purchaseContent.selectedHorses')}:{' '}
                        {formatSelectedHorses(ticket)}
                      </Typography>
                      <Typography
                        variant='caption'
                        color='text.secondary'
                        sx={{ mb: 0.5, display: 'block' }}
                      >
                        {t('purchaseContent.combinations')}:{' '}
                        {ticket.combinations.length}
                        {t('points.unit')}
                      </Typography>
                      <Box
                        sx={{
                          maxHeight: { xs: 60, sm: 80 },
                          overflowY: 'auto',
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 0.25,
                        }}
                      >
                        {ticket.combinations
                          .slice(0, 10)
                          .map((combo, comboIndex) => (
                            <Chip
                              key={comboIndex}
                              label={combo.join('-')}
                              size='small'
                              sx={{
                                fontSize: { xs: '0.6rem', sm: '0.7rem' },
                                height: { xs: 18, sm: 20 },
                                minWidth: 'auto',
                              }}
                            />
                          ))}
                        {ticket.combinations.length > 10 && (
                          <Chip
                            label={`+${ticket.combinations.length - 10}`}
                            size='small'
                            variant='outlined'
                            sx={{
                              fontSize: { xs: '0.6rem', sm: '0.7rem' },
                              height: { xs: 18, sm: 20 },
                              minWidth: 'auto',
                            }}
                          />
                        )}
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
                    onClick={() => onRemoveTicket(ticket.id)}
                    color='error'
                    aria-label={t('buttons.removeTicket')}
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
  );
};
