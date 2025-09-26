import { type JSX, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  Collapse,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Schedule as ScheduleIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import { Card } from './Card';
import { PurchaseHistoryStorage } from '../../../utils/purchaseHistoryStorage';
import {
  type PurchaseHistory,
  type PurchaseHistorySummary,
} from '../../../types/purchaseHistory';

interface PurchaseHistoryCardProps {
  onHistoryClick?: (date: string, venue: string) => void;
  refreshTrigger?: number; // 購入完了時の更新トリガー
}

/**
 * 購入履歴カードコンポーネント
 *
 * 購入履歴を日付・会場別に表示し、当選状況を色分けして表示する。
 * クリックで詳細を展開/折りたたみ可能。
 */
export const PurchaseHistoryCard = ({
  onHistoryClick,
  refreshTrigger,
}: PurchaseHistoryCardProps): JSX.Element => {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const [history, setHistory] = useState<PurchaseHistory[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadHistory = () => {
      const purchaseHistory = PurchaseHistoryStorage.getAll();
      console.log('購入履歴を読み込みました:', purchaseHistory);
      setHistory(purchaseHistory);
    };

    loadHistory();

    // ストレージ変更を監視
    const handleStorageChange = () => {
      loadHistory();
    };

    // refreshTriggerが変更された時に履歴を再読み込み
    if (refreshTrigger) {
      loadHistory();
    }

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refreshTrigger]);

  const handleItemClick = (date: string, venue: string) => {
    onHistoryClick?.(date, venue);
  };

  const handleExpandClick = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const translateBetType = (betType: string) =>
    t(`purchaseForm:betTypes.${betType}`, { defaultValue: betType });

  const getStatusColor = (summary: PurchaseHistorySummary) => {
    if (summary.totalRaces === 0) {
      return theme.palette.grey[500]; // 未開催
    }

    const winRate = summary.winningRaces / summary.totalRaces;
    if (winRate === 1) {
      return theme.palette.success.main; // 全当選
    } else if (winRate > 0) {
      return theme.palette.warning.main; // 一部当選
    } else {
      return theme.palette.error.main; // 全非当選
    }
  };

  const getStatusIcon = (summary: PurchaseHistorySummary) => {
    if (summary.totalRaces === 0) {
      return <ScheduleIcon />;
    }

    const winRate = summary.winningRaces / summary.totalRaces;
    if (winRate === 1) {
      return <CheckCircleIcon />;
    } else if (winRate > 0) {
      return <CheckCircleIcon />;
    } else {
      return <CancelIcon />;
    }
  };

  const getStatusText = (summary: PurchaseHistorySummary) => {
    if (summary.totalRaces === 0) {
      return t('purchaseHistory.status.upcoming', { defaultValue: '未開催' });
    }

    const winRate = summary.winningRaces / summary.totalRaces;
    if (winRate === 1) {
      return t('purchaseHistory.status.allWin', { defaultValue: '全当選' });
    } else if (winRate > 0) {
      return t('purchaseHistory.status.partialWin', {
        wins: summary.winningRaces,
        total: summary.totalRaces,
        defaultValue: `${summary.winningRaces}/${summary.totalRaces}当選`,
      });
    } else {
      return t('purchaseHistory.status.allLose', { defaultValue: '全非当選' });
    }
  };

  if (history.length === 0) {
    return (
      <Card
        title={t('purchaseHistory.title', { defaultValue: '購入履歴' })}
        icon={<HistoryIcon />}
        height={400}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 200,
            color: theme.palette.text.secondary,
          }}
        >
          <Typography variant='body2'>
            {t('purchaseHistory.empty', {
              defaultValue: '購入履歴がありません',
            })}
          </Typography>
        </Box>
      </Card>
    );
  }

  return (
    <Card
      title={t('purchaseHistory.title', { defaultValue: '購入履歴' })}
      icon={<HistoryIcon />}
      height={400}
    >
      <Box
        sx={{
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
        }}
      >
        <List
          dense
          sx={{
            flex: 1,
            overflow: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(148, 163, 184, 0.3) transparent',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(148, 163, 184, 0.3)',
              borderRadius: '3px',
              '&:hover': {
                background: 'rgba(148, 163, 184, 0.5)',
              },
            },
            '&::-webkit-scrollbar-corner': {
              background: 'transparent',
            },
          }}
        >
          {history.map((item, index) => {
            // 表示の一貫性のため、保存値ではなく都度集計
            const totalAmountCalc = item.races
              .flatMap((r) => r.tickets)
              .reduce((sum, t) => {
                const perTicket =
                  (t as any).totalAmount ?? t.amount * (t.points ?? 1);
                return sum + perTicket;
              }, 0);
            const totalPointsCalc = item.races
              .flatMap((r) => r.tickets)
              .reduce((sum, t) => sum + (t.points ?? 0), 0);

            const summary: PurchaseHistorySummary = {
              date: item.date,
              venue: item.venue,
              raceCount: item.races.length,
              totalAmount: totalAmountCalc,
              totalPoints: totalPointsCalc,
              winningRaces: item.races.filter(
                (race) =>
                  race.status === 'finished' &&
                  race.tickets.some((ticket) => ticket.isWinning)
              ).length,
              totalRaces: item.races.filter(
                (race) => race.status === 'finished'
              ).length,
            };

            const isExpanded = expandedItems.has(item.id);
            const statusColor = getStatusColor(summary);

            return (
              <Box key={item.id}>
                <ListItemButton
                  onClick={() => handleItemClick(item.date, item.venue)}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Typography variant='subtitle2'>
                          {item.date} {item.venue}
                        </Typography>
                        <Chip
                          icon={getStatusIcon(summary)}
                          label={getStatusText(summary)}
                          size='small'
                          sx={{
                            backgroundColor: statusColor,
                            color: 'white',
                            fontSize: '0.75rem',
                          }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                        <Typography variant='caption' color='text.secondary'>
                          {t('purchaseHistory.raceCount', {
                            count: summary.raceCount,
                            defaultValue: `${summary.raceCount}レース`,
                          })}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          ¥{summary.totalAmount.toLocaleString()}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {t('purchaseHistory.points', {
                            count: summary.totalPoints,
                            defaultValue: `${summary.totalPoints}点`,
                          })}
                        </Typography>
                      </Box>
                    }
                  />
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExpandClick(item.id);
                    }}
                    size='small'
                  >
                    {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </ListItemButton>

                <Collapse in={isExpanded} timeout='auto' unmountOnExit>
                  <Box sx={{ pl: 2, pr: 2, pb: 1 }}>
                    {item.races.map((race, raceIndex) => (
                      <Box key={raceIndex} sx={{ mb: 1 }}>
                        <Typography
                          variant='body2'
                          sx={{ fontWeight: 'bold', mb: 0.5 }}
                        >
                          {race.raceNumber}R {race.raceName}
                        </Typography>
                        {race.tickets.map((ticket, ticketIndex) => (
                          <Box
                            key={ticketIndex}
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              py: 0.5,
                              px: 1,
                              backgroundColor: theme.palette.background.paper,
                              borderRadius: 0.5,
                              mb: 0.5,
                            }}
                          >
                            <Typography variant='caption'>
                              {translateBetType(ticket.betType || '')}{' '}
                              {ticket.horses.join('-')}
                            </Typography>
                            <Box
                              sx={{
                                display: 'flex',
                                gap: 1,
                                alignItems: 'center',
                              }}
                            >
                              <Typography variant='caption'>
                                {(() => {
                                  const total =
                                    (ticket as any).totalAmount ??
                                    ticket.amount * (ticket.points ?? 1);
                                  return `¥${total.toLocaleString()}`;
                                })()}
                              </Typography>
                              {ticket.isWinning && ticket.payout && (
                                <Chip
                                  label={`+¥${ticket.payout.toLocaleString()}`}
                                  size='small'
                                  color='success'
                                  sx={{ fontSize: '0.7rem' }}
                                />
                              )}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    ))}
                  </Box>
                </Collapse>

                {index < history.length - 1 && <Divider sx={{ my: 1 }} />}
              </Box>
            );
          })}
        </List>
      </Box>
    </Card>
  );
};
