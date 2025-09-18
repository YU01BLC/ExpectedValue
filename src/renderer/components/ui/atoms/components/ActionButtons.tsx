import { type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';

interface ActionButtonsProps {
  onCancel: () => void;
  onPurchase: () => void;
  isPurchaseDisabled: boolean;
}

export const ActionButtons = ({
  onCancel,
  onPurchase,
  isPurchaseDisabled,
}: ActionButtonsProps): JSX.Element => {
  const { t } = useTranslation('purchaseForm');

  return (
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
        onClick={onPurchase}
        disabled={isPurchaseDisabled}
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
  );
};
