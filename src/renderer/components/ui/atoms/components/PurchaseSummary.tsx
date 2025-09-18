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

  // 合計金額を計算
  const totalAmount = tickets.reduce(
    (sum, ticket) => sum + ticket.totalAmount,
    0
  );

  return (
    <Paper sx={{ p: 3, flex: 1 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
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
