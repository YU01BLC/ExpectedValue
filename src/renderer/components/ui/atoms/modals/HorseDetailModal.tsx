import { type JSX } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  Typography,
  Grid,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { HorseDetailModalProps } from '../types/raceTable';
import { getEvaluationColor, getGateColor } from '../utils/raceTableUtils';

/**
 * 馬の詳細情報を表示するモーダルコンポーネント
 * MUIのベストプラクティスに従い、適切なアクセシビリティ属性を設定
 */
export const HorseDetailModal = ({
  horse,
  open,
  onClose,
}: HorseDetailModalProps): JSX.Element => {
  const theme = useTheme();

  if (!horse) return <></>;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      aria-labelledby='horse-detail-title'
      aria-describedby='horse-detail-content'
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(10px)',
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
      }}
    >
      <DialogTitle id='horse-detail-title'>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h6' component='div'>
            {horse.name} の詳細
          </Typography>
          <IconButton
            onClick={onClose}
            aria-label='閉じる'
            sx={{ color: 'text.secondary' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent id='horse-detail-content'>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
              枠番
            </Typography>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: getGateColor(horse.gateNumber, theme).bg,
                color: getGateColor(horse.gateNumber, theme).text,
                fontWeight: 700,
                fontSize: '0.875rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              {horse.gateNumber}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
              馬番
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', height: 32 }}>
              <Typography variant='h6' fontWeight='bold'>
                {horse.horseNumber}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
              評価
            </Typography>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: getEvaluationColor(horse.evaluation, theme),
                color: 'white',
                fontWeight: 700,
                fontSize: '0.875rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              {horse.evaluation}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
              オッズ
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', height: 32 }}>
              <Typography variant='body1' fontWeight='bold'>
                {horse.odds}倍
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
              期待値
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', height: 32 }}>
              <Typography variant='h6' color='primary.main'>
                {horse.expectedValue}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
              コメント
            </Typography>
            <Typography variant='body1'>{horse.comment}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='contained'>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};
