import { type JSX } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTranslation } from 'react-i18next';

interface PurchaseSuccessModalProps {
  open: boolean;
  onClose: () => void;
  totalAmount: number;
  totalPoints: number;
}

/**
 * 購入成功モーダルコンポーネント
 */
export const PurchaseSuccessModal = ({
  open,
  onClose,
  totalAmount,
  totalPoints,
}: PurchaseSuccessModalProps): JSX.Element => {
  const { t } = useTranslation('purchaseForm');

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        <CheckCircleIcon sx={{ fontSize: '2rem', color: '#4CAF50' }} />
        {t('success.title')}
      </DialogTitle>

      <DialogContent sx={{ textAlign: 'center', py: 3 }}>
        <Typography variant='h6' sx={{ mb: 2, color: 'white' }}>
          {t('success.message')}
        </Typography>

        <Box
          sx={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 2,
            p: 2,
            mb: 2,
          }}
        >
          <Typography variant='body1' sx={{ color: 'white', mb: 1 }}>
            {t('success.totalAmount')}: ¥{totalAmount.toLocaleString()}
          </Typography>
          <Typography variant='body1' sx={{ color: 'white' }}>
            {t('success.totalPoints')}: {totalPoints}点
          </Typography>
        </Box>

        <Typography variant='body2' sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          {t('success.note')}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button
          onClick={onClose}
          variant='contained'
          sx={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            px: 4,
            py: 1,
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.3)',
            },
          }}
        >
          {t('success.close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
