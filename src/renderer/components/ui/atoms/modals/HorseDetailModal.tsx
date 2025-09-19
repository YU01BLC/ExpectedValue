import { type JSX, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  Typography,
  useTheme,
  Grid,
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

  // エラーハンドリング: 馬データが存在しない場合は早期リターン
  if (!horse) {
    return <></>;
  }

  // 馬の詳細情報の計算（メモ化）
  const horseDetails = useMemo(() => {
    const gateColor = getGateColor(horse.gateNumber, theme, 18); // デフォルト18頭
    const evaluationColor = getEvaluationColor(horse.evaluation, theme);

    return {
      gateColor,
      evaluationColor,
    };
  }, [horse.gateNumber, horse.evaluation, theme]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      fullScreen={{ xs: true, sm: false }}
      aria-labelledby='horse-detail-title'
      aria-describedby='horse-detail-content'
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(10px)',
          m: { xs: 0, sm: 2 },
          maxHeight: { xs: '100vh', sm: '90vh' },
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
        <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
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
                backgroundColor: horseDetails.gateColor.bg,
                color: horseDetails.gateColor.text,
                fontWeight: 700,
                fontSize: '0.875rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              {horse.gateNumber}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
              馬番
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', height: 32 }}>
              <Typography variant='h6' fontWeight='bold'>
                {horse.horseNumber}
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
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
                backgroundColor: horseDetails.evaluationColor,
                color: 'white',
                fontWeight: 700,
                fontSize: '0.875rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              {horse.evaluation}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
              オッズ
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', height: 32 }}>
              <Typography variant='body1' fontWeight='bold'>
                {horse.odds}倍
              </Typography>
            </Box>
          </Grid>
          <Grid size={12}>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
              期待値
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', height: 32 }}>
              <Typography variant='h6' color='primary.main'>
                {horse.expectedValue}
              </Typography>
            </Box>
          </Grid>
          <Grid size={12}>
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
