import { type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  useTheme,
} from '@mui/material';
import { getGateColor } from '../utils/raceTableUtils';
import { type Horse, type NagashiType } from '../types/purchaseForm';

interface HorseSelectorProps {
  horses: Horse[];
  selectedBetType: string;
  selectedMethod: string;
  columnHorses: number[][];
  axisHorse: number | null;
  nagashiType: NagashiType;
  onHorseToggle: (horseNumber: number, columnIndex: number) => void;
  onAxisHorseToggle: (horseNumber: number) => void;
  onNagashiTypeChange: (type: NagashiType) => void;
}

export const HorseSelector = ({
  horses,
  selectedBetType,
  selectedMethod,
  columnHorses,
  axisHorse,
  nagashiType,
  onHorseToggle,
  onAxisHorseToggle,
  onNagashiTypeChange,
}: HorseSelectorProps): JSX.Element => {
  const { t } = useTranslation('common');
  const { t: tPurchase } = useTranslation('purchaseForm');
  const theme = useTheme();

  // 枠連の場合
  if (selectedBetType === 'wakuren') {
    // 枠連の流し専用UI
    if (selectedMethod === 'nagashi') {
      // horses から存在する枠番号集合を抽出（gateNumberを利用）
      const wakuList = Array.from(
        new Set(horses.map((h) => h.gateNumber))
      ).sort((a, b) => a - b);

      return (
        <Box sx={{ mb: 2 }}>
          {/* 軸枠選択（1つのみ） */}
          <Typography variant='subtitle2' sx={{ mb: 1 }}>
            {tPurchase('horseSelection.axis.multi1')}
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 2, maxHeight: 300 }}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', minWidth: 60 }}>
                    枠番
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>馬番</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {t('table.axisHorse')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wakuList.map((wakuNumber) => {
                  const wakuHorses = horses.filter(
                    (horse) => horse.gateNumber === wakuNumber
                  );
                  const isSelected = wakuHorses.some(
                    (horse) => axisHorse === horse.number
                  );
                  return (
                    <TableRow key={`axis-waku-${wakuNumber}`}>
                      <TableCell>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            backgroundColor:
                              theme.palette.gate[
                                wakuNumber as keyof typeof theme.palette.gate
                              ]?.bg || theme.palette.gate.default.bg,
                            color:
                              theme.palette.gate[
                                wakuNumber as keyof typeof theme.palette.gate
                              ]?.text || theme.palette.gate.default.text,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '0.8rem',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                            border: '2px solid white',
                          }}
                        >
                          {wakuNumber}
                        </Box>
                      </TableCell>
                      <TableCell>
                        {wakuHorses.map((horse) => horse.number).join(', ')}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Radio
                          checked={isSelected}
                          onChange={() => {
                            if (wakuHorses.length > 0) {
                              onAxisHorseToggle(wakuHorses[0].number);
                            }
                          }}
                          size='small'
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* 相手枠選択（複数選択可） */}
          <Typography variant='subtitle2' sx={{ mb: 1 }}>
            {tPurchase('horseSelection.opponent.multi1')}
            <Typography component='span' variant='caption' sx={{ ml: 1 }}>
              {tPurchase('horseSelection.multiple')}
            </Typography>
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 2, maxHeight: 300 }}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', minWidth: 60 }}>
                    枠番
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>馬番</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {t('table.opponentHorse')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wakuList.map((wakuNumber) => {
                  const wakuHorses = horses.filter(
                    (horse) => horse.gateNumber === wakuNumber
                  );
                  const isAxisWaku = wakuHorses.some(
                    (horse) => axisHorse === horse.number
                  );
                  const isSelectedOpp = wakuHorses.some((horse) =>
                    (columnHorses[1] || []).includes(horse.number)
                  );
                  return (
                    <TableRow key={`opp-waku-${wakuNumber}`}>
                      <TableCell>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            backgroundColor:
                              theme.palette.gate[
                                wakuNumber as keyof typeof theme.palette.gate
                              ]?.bg || theme.palette.gate.default.bg,
                            color:
                              theme.palette.gate[
                                wakuNumber as keyof typeof theme.palette.gate
                              ]?.text || theme.palette.gate.default.text,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '0.8rem',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                            border: '2px solid white',
                          }}
                        >
                          {wakuNumber}
                        </Box>
                      </TableCell>
                      <TableCell>
                        {wakuHorses.map((horse) => horse.number).join(', ')}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Checkbox
                          checked={isSelectedOpp}
                          onChange={() => {
                            if (isSelectedOpp) {
                              // 外す: 当該枠の全馬を相手カラムから外す
                              wakuHorses.forEach((horse) => {
                                if (
                                  (columnHorses[1] || []).includes(horse.number)
                                ) {
                                  onHorseToggle(horse.number, 1);
                                }
                              });
                            } else {
                              // 付ける: 当該枠の全馬を相手カラムへ追加
                              wakuHorses.forEach((horse) => {
                                if (
                                  !(columnHorses[1] || []).includes(
                                    horse.number
                                  )
                                ) {
                                  onHorseToggle(horse.number, 1);
                                }
                              });
                            }
                          }}
                          disabled={isAxisWaku}
                          size='small'
                          sx={{
                            opacity: isAxisWaku ? 0.3 : 1,
                            '&.Mui-disabled': { color: 'text.disabled' },
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      );
    }

    // 枠連の単式・フォーメーション用UI
    // 動的な枠番計算（JRAの正しいルール）
    const getWakuNumber = (horseNumber: number): number => {
      const totalHorses = horses.length;

      if (totalHorses <= 8) {
        // 8頭以下: 1枠1頭制（馬番 = 枠番）
        return horseNumber;
      } else if (totalHorses === 9) {
        // 9頭: 1-7枠に1頭ずつ、8枠に2頭
        return horseNumber <= 7 ? horseNumber : 8;
      } else if (totalHorses === 10) {
        // 10頭: 1-6枠に1頭ずつ、7枠に2頭、8枠に2頭
        if (horseNumber <= 6) return horseNumber;
        if (horseNumber <= 8) return 7;
        return 8;
      } else if (totalHorses === 11) {
        // 11頭: 1-5枠に1頭ずつ、6-8枠に2頭ずつ
        if (horseNumber <= 5) return horseNumber;
        if (horseNumber <= 7) return 6;
        if (horseNumber <= 9) return 7;
        return 8;
      } else if (totalHorses === 12) {
        // 12頭: 1-4枠に1頭ずつ、5-8枠に2頭ずつ
        if (horseNumber <= 4) return horseNumber;
        if (horseNumber <= 6) return 5;
        if (horseNumber <= 8) return 6;
        if (horseNumber <= 10) return 7;
        return 8;
      } else if (totalHorses === 13) {
        // 13頭: 1-3枠に1頭ずつ、4-8枠に2頭ずつ
        if (horseNumber <= 3) return horseNumber;
        if (horseNumber <= 5) return 4;
        if (horseNumber <= 7) return 5;
        if (horseNumber <= 9) return 6;
        if (horseNumber <= 11) return 7;
        return 8;
      } else if (totalHorses === 14) {
        // 14頭: 1枠に1頭、2-6枠に2頭ずつ、7-8枠に2頭ずつ
        if (horseNumber === 1) return 1;
        if (horseNumber <= 4) return 2;
        if (horseNumber <= 6) return 3;
        if (horseNumber <= 8) return 4;
        if (horseNumber <= 10) return 5;
        if (horseNumber <= 12) return 6;
        if (horseNumber <= 14) return 7;
        return 8;
      } else if (totalHorses === 15) {
        // 15頭: 1枠に1頭、2-7枠に2頭ずつ、8枠に2頭
        if (horseNumber === 1) return 1;
        if (horseNumber <= 3) return 2;
        if (horseNumber <= 5) return 3;
        if (horseNumber <= 7) return 4;
        if (horseNumber <= 9) return 5;
        if (horseNumber <= 11) return 6;
        if (horseNumber <= 13) return 7;
        return 8;
      } else if (totalHorses === 16) {
        // 16頭: 1-8枠に2頭ずつ
        if (horseNumber <= 2) return 1;
        if (horseNumber <= 4) return 2;
        if (horseNumber <= 6) return 3;
        if (horseNumber <= 8) return 4;
        if (horseNumber <= 10) return 5;
        if (horseNumber <= 12) return 6;
        if (horseNumber <= 14) return 7;
        return 8;
      } else if (totalHorses === 17) {
        // 17頭: 1-7枠に2頭ずつ、8枠に3頭
        if (horseNumber <= 2) return 1;
        if (horseNumber <= 4) return 2;
        if (horseNumber <= 6) return 3;
        if (horseNumber <= 8) return 4;
        if (horseNumber <= 10) return 5;
        if (horseNumber <= 12) return 6;
        if (horseNumber <= 14) return 7;
        return 8;
      } else if (totalHorses === 18) {
        // 18頭: 1-6枠に2頭ずつ、7-8枠に3頭ずつ
        if (horseNumber <= 2) return 1;
        if (horseNumber <= 4) return 2;
        if (horseNumber <= 6) return 3;
        if (horseNumber <= 8) return 4;
        if (horseNumber <= 10) return 5;
        if (horseNumber <= 12) return 6;
        if (horseNumber <= 15) return 7;
        return 8;
      }

      // フォールバック（通常は発生しない）
      return Math.ceil(horseNumber / 2);
    };

    // 最大枠数を計算（JRAの正しいルール）
    const maxWaku = (() => {
      const totalHorses = horses.length;
      if (totalHorses <= 8) {
        return totalHorses; // 1枠1頭制
      } else {
        return 8; // 9頭以上は常に8枠制
      }
    })();

    return (
      <Box sx={{ mb: 2 }}>
        <Typography variant='subtitle2' sx={{ mb: 1 }}>
          {tPurchase('horseSelection.columnSelection')} (
          {selectedMethod === 'single'
            ? tPurchase('horseSelection.single')
            : selectedMethod === 'formation'
            ? tPurchase('horseSelection.multiple')
            : tPurchase('horseSelection.boxSelection')}
          )
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 2, maxHeight: 300 }}>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', minWidth: 60 }}>
                  枠番
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>馬番</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  {tPurchase('horseSelection.column').replace('{number}', '1')}
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  {tPurchase('horseSelection.column').replace('{number}', '2')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: maxWaku }, (_, wakuIndex) => {
                const wakuNumber = wakuIndex + 1;
                const wakuHorses = horses.filter(
                  (horse) => getWakuNumber(horse.number) === wakuNumber
                );

                // この枠の馬が1列目で選択されているかチェック
                const isFirstSelected = wakuHorses.some((horse) =>
                  columnHorses[0]?.includes(horse.number)
                );
                // この枠の馬が2列目で選択されているかチェック
                const isSecondSelected = wakuHorses.some((horse) =>
                  columnHorses[1]?.includes(horse.number)
                );

                // 1列目で他の枠が選択されているかチェック
                const isOtherWakuInFirst =
                  columnHorses[0]?.some(
                    (horseNumber) => getWakuNumber(horseNumber) !== wakuNumber
                  ) || false;
                // 2列目で他の枠が選択されているかチェック
                const isOtherWakuInSecond =
                  columnHorses[1]?.some(
                    (horseNumber) => getWakuNumber(horseNumber) !== wakuNumber
                  ) || false;

                return (
                  <TableRow key={wakuNumber}>
                    <TableCell>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          backgroundColor:
                            theme.palette.gate[
                              wakuNumber as keyof typeof theme.palette.gate
                            ]?.bg || theme.palette.gate.default.bg,
                          color:
                            theme.palette.gate[
                              wakuNumber as keyof typeof theme.palette.gate
                            ]?.text || theme.palette.gate.default.text,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: '0.8rem',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          border: '2px solid white',
                        }}
                      >
                        {wakuNumber}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {wakuHorses.map((horse) => horse.number).join(', ')}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Checkbox
                        checked={isFirstSelected}
                        onChange={() => {
                          // 枠内の全馬を1列目に追加/削除（トグル動作）
                          if (isFirstSelected) {
                            // 既に選択されている場合は削除
                            wakuHorses.forEach((horse) => {
                              if (columnHorses[0]?.includes(horse.number)) {
                                onHorseToggle(horse.number, 0);
                              }
                            });
                          } else {
                            // 選択されていない場合は追加
                            wakuHorses.forEach((horse) => {
                              if (!columnHorses[0]?.includes(horse.number)) {
                                onHorseToggle(horse.number, 0);
                              }
                            });
                          }
                        }}
                        disabled={
                          selectedMethod === 'single'
                            ? isOtherWakuInFirst
                            : selectedMethod === 'formation'
                            ? // フォーメーション: 反対列に同じ枠が選ばれていたら無効（ただし自分が選択中なら解除可）
                              isSecondSelected && !isFirstSelected
                            : false
                        }
                        color='primary'
                        size='small'
                        sx={{
                          opacity:
                            (selectedMethod === 'single' &&
                              isOtherWakuInFirst) ||
                            (selectedMethod === 'formation' &&
                              isSecondSelected &&
                              !isFirstSelected)
                              ? 0.3
                              : 1,
                          '&.Mui-disabled': {
                            color: 'text.disabled',
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Checkbox
                        checked={isSecondSelected}
                        onChange={() => {
                          // 枠内の全馬を2列目に追加/削除（トグル動作）
                          if (isSecondSelected) {
                            // 既に選択されている場合は削除
                            wakuHorses.forEach((horse) => {
                              if (columnHorses[1]?.includes(horse.number)) {
                                onHorseToggle(horse.number, 1);
                              }
                            });
                          } else {
                            // 選択されていない場合は追加
                            wakuHorses.forEach((horse) => {
                              if (!columnHorses[1]?.includes(horse.number)) {
                                onHorseToggle(horse.number, 1);
                              }
                            });
                          }
                        }}
                        disabled={
                          selectedMethod === 'single'
                            ? isOtherWakuInSecond
                            : selectedMethod === 'formation'
                            ? isFirstSelected && !isSecondSelected
                            : false
                        }
                        color='primary'
                        size='small'
                        sx={{
                          opacity:
                            (selectedMethod === 'single' &&
                              isOtherWakuInSecond) ||
                            (selectedMethod === 'formation' &&
                              isFirstSelected &&
                              !isSecondSelected)
                              ? 0.3
                              : 1,
                          '&.Mui-disabled': {
                            color: 'text.disabled',
                          },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  if (selectedMethod === 'nagashi') {
    return (
      <Box sx={{ mb: 2 }}>
        {/* 流し馬券の場合：タイプ選択 */}
        <Box sx={{ mb: 2 }}>
          <Typography variant='subtitle2' sx={{ mb: 1 }}>
            {tPurchase('nagashi.title')}
          </Typography>
          <FormControl component='fieldset'>
            <RadioGroup
              value={nagashiType}
              onChange={(e) =>
                onNagashiTypeChange(e.target.value as NagashiType)
              }
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(3, 1fr)',
                },
                gap: { xs: 0.5, sm: 1 },
              }}
            >
              <FormControlLabel
                value='multi1'
                control={<Radio size='small' />}
                label={tPurchase('nagashi.multi1')}
                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
              />
              {/* 三連複・三連単でのみ表示（軸2頭流し） */}
              {(selectedBetType === 'trio' ||
                selectedBetType === 'trifecta') && (
                <FormControlLabel
                  value='multi2'
                  control={<Radio size='small' />}
                  label={tPurchase('nagashi.multi2')}
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                />
              )}
              {/* 馬単・三連単でのみ表示（固定流し） */}
              {(selectedBetType === 'exacta' ||
                selectedBetType === 'trifecta') && (
                <>
                  <FormControlLabel
                    value='first'
                    control={<Radio size='small' />}
                    label={tPurchase('nagashi.first')}
                    sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                  />
                  <FormControlLabel
                    value='second'
                    control={<Radio size='small' />}
                    label={tPurchase('nagashi.second')}
                    sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                  />
                </>
              )}
              {/* 三連単でのみ表示（3着固定、1着・2着固定） */}
              {selectedBetType === 'trifecta' && (
                <>
                  <FormControlLabel
                    value='third'
                    control={<Radio size='small' />}
                    label={tPurchase('nagashi.third')}
                    sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                  />
                  <FormControlLabel
                    value='firstSecond'
                    control={<Radio size='small' />}
                    label={tPurchase('nagashi.firstSecond')}
                    sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                  />
                </>
              )}
            </RadioGroup>
          </FormControl>
        </Box>

        {/* 枠連の流し専用UI */}
        {selectedBetType === 'wakuren' && selectedMethod === 'nagashi' ? (
          <>
            {/* 軸馬選択（枠単位） */}
            <Typography variant='subtitle2' sx={{ mb: 1 }}>
              {tPurchase('horseSelection.axis.multi1')}
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 2, maxHeight: 300 }}>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', minWidth: 60 }}>
                      枠番
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>馬番</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                      {t('table.axisHorse')}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.from(
                    { length: Math.ceil(horses.length / 2) },
                    (_, wakuIndex) => {
                      const wakuNumber = wakuIndex + 1;
                      const wakuHorses = horses.filter(
                        (horse) => Math.ceil(horse.number / 2) === wakuNumber
                      );
                      const isSelected = wakuHorses.some(
                        (horse) => axisHorse === horse.number
                      );

                      return (
                        <TableRow key={`axis-waku-${wakuNumber}`}>
                          <TableCell>
                            <Box
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                backgroundColor:
                                  theme.palette.gate[
                                    wakuNumber as keyof typeof theme.palette.gate
                                  ]?.bg || theme.palette.gate.default.bg,
                                color:
                                  theme.palette.gate[
                                    wakuNumber as keyof typeof theme.palette.gate
                                  ]?.text || theme.palette.gate.default.text,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                fontSize: '0.8rem',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                border: '2px solid white',
                              }}
                            >
                              {wakuNumber}
                            </Box>
                          </TableCell>
                          <TableCell>
                            {wakuHorses.map((horse) => horse.number).join(', ')}
                          </TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            <Radio
                              checked={isSelected}
                              onChange={() => {
                                // この枠の最初の馬を軸馬として設定
                                if (wakuHorses.length > 0) {
                                  onAxisHorseToggle(wakuHorses[0].number);
                                }
                              }}
                              size='small'
                            />
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <>
            {/* 他の馬券種の軸馬選択テーブル */}
            <Typography variant='subtitle2' sx={{ mb: 1 }}>
              {tPurchase(`horseSelection.axis.${nagashiType}`)}
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 2, maxHeight: 300 }}>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', minWidth: 60 }}>
                      {t('table.horseNumber')}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>
                      {t('table.horseName')}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                      {nagashiType === 'firstSecond'
                        ? t('table.firstPlace')
                        : t('table.axisHorse')}
                    </TableCell>
                    {nagashiType === 'firstSecond' && (
                      <TableCell
                        sx={{ fontWeight: 'bold', textAlign: 'center' }}
                      >
                        {t('table.secondPlace')}
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
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
                    const isSecondSelected =
                      nagashiType === 'firstSecond'
                        ? columnHorses[1]?.includes(horse.number) || false
                        : false;
                    const maxAxisHorses =
                      nagashiType === 'multi2'
                        ? 2
                        : nagashiType === 'firstSecond'
                        ? 1
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
                      <TableRow key={`axis-${horse.number}`}>
                        <TableCell>
                          <Box
                            sx={{
                              width: 28,
                              height: 28,
                              borderRadius: '50%',
                              backgroundColor: getGateColor(
                                horse.gateNumber,
                                theme,
                                horses.length
                              ).bg,
                              color: getGateColor(
                                horse.gateNumber,
                                theme,
                                horses.length
                              ).text,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              fontSize: '0.8rem',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                              border: '2px solid white',
                            }}
                          >
                            {horse.number}
                          </Box>
                        </TableCell>
                        <TableCell>{horse.name}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Checkbox
                            checked={isSelected}
                            onChange={() => {
                              if (
                                nagashiType === 'first' ||
                                nagashiType === 'second' ||
                                nagashiType === 'third' ||
                                nagashiType === 'multi1'
                              ) {
                                onAxisHorseToggle(horse.number);
                              } else {
                                onHorseToggle(horse.number, 0);
                              }
                            }}
                            disabled={isDisabled}
                            size='small'
                          />
                        </TableCell>
                        {nagashiType === 'firstSecond' && (
                          <TableCell sx={{ textAlign: 'center' }}>
                            <Checkbox
                              checked={isSecondSelected}
                              onChange={() => onHorseToggle(horse.number, 1)}
                              disabled={
                                !isSecondSelected &&
                                (columnHorses[1]?.length || 0) >= 1
                              }
                              size='small'
                            />
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {/* 相手馬選択テーブル */}
        <Typography variant='subtitle2' sx={{ mb: 1 }}>
          {tPurchase(`horseSelection.opponent.${nagashiType}`)}
          <Typography component='span' variant='caption' sx={{ ml: 1 }}>
            {tPurchase('horseSelection.multiple')}
          </Typography>
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 2, maxHeight: 300 }}>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', minWidth: 60 }}>
                  {t('table.horseNumber')}
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  {t('table.horseName')}
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  {nagashiType === 'firstSecond'
                    ? t('table.thirdPlace')
                    : t('table.opponentHorse')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
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
                const maxHorses = horses.length;
                const isDisabled =
                  isAxis ||
                  (!isSelected &&
                    (nagashiType === 'firstSecond'
                      ? (columnHorses[2]?.length || 0) >= maxHorses
                      : (columnHorses[1]?.length || 0) >= maxHorses));

                return (
                  <TableRow key={`opponent-${horse.number}`}>
                    <TableCell>
                      <Box
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          backgroundColor: getGateColor(
                            horse.gateNumber,
                            theme,
                            horses.length
                          ).bg,
                          color: getGateColor(
                            horse.gateNumber,
                            theme,
                            horses.length
                          ).text,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: '0.8rem',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          border: '2px solid white',
                        }}
                      >
                        {horse.number}
                      </Box>
                    </TableCell>
                    <TableCell>{horse.name}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Checkbox
                        checked={isSelected}
                        onChange={() =>
                          onHorseToggle(
                            horse.number,
                            nagashiType === 'firstSecond' ? 2 : 1
                          )
                        }
                        disabled={isDisabled}
                        size='small'
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  // 通常馬券の場合
  const getColumnCount = () => {
    if (selectedBetType === 'win' || selectedBetType === 'place') return 1;
    if (selectedMethod === 'box') return 1; // ボックスは一列目のみ
    if (
      selectedBetType === 'bracket' ||
      selectedBetType === 'quinella' ||
      selectedBetType === 'exacta' ||
      selectedBetType === 'wide'
    )
      return 2;
    if (selectedBetType === 'trio' || selectedBetType === 'trifecta') return 3;
    return 1;
  };

  const getColumnLabel = (index: number) => {
    if (selectedBetType === 'win' || selectedBetType === 'place') {
      return tPurchase('horseSelection.select');
    }
    if (selectedMethod === 'box') {
      return tPurchase('horseSelection.boxSelection');
    }
    if (selectedBetType === 'trifecta') {
      const labels = [
        t('table.firstPlace'),
        t('table.secondPlace'),
        t('table.thirdPlace'),
      ];
      return (
        labels[index] || `${index + 1}${tPurchase('horseSelection.column')}`
      );
    }
    if (selectedBetType === 'trio') {
      const labels = [
        t('table.firstPlace'),
        t('table.secondPlace'),
        t('table.thirdPlace'),
      ];
      return (
        labels[index] || `${index + 1}${tPurchase('horseSelection.column')}`
      );
    }
    if (selectedBetType === 'exacta') {
      const labels = [t('table.firstPlace'), t('table.secondPlace')];
      return (
        labels[index] || `${index + 1}${tPurchase('horseSelection.column')}`
      );
    }
    if (selectedBetType === 'quinella' || selectedBetType === 'wide') {
      const labels = [t('table.firstPlace'), t('table.secondPlace')];
      return (
        labels[index] || `${index + 1}${tPurchase('horseSelection.column')}`
      );
    }
    return `${index + 1}${tPurchase('horseSelection.column')}`;
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant='subtitle2' sx={{ mb: 1 }}>
        {selectedBetType === 'win' || selectedBetType === 'place'
          ? tPurchase('horseSelection.select')
          : tPurchase('horseSelection.columnSelection')}
        <Typography component='span' variant='caption' sx={{ ml: 1 }}>
          (
          {selectedBetType === 'win' || selectedBetType === 'place'
            ? tPurchase('horseSelection.multiple')
            : selectedMethod === 'single'
            ? tPurchase('horseSelection.single')
            : tPurchase('horseSelection.multiple')}
          )
        </Typography>
      </Typography>

      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', minWidth: 60 }}>
                {t('table.horseNumber')}
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                {t('table.horseName')}
              </TableCell>
              {Array.from({ length: getColumnCount() }, (_, index) => (
                <TableCell
                  key={index}
                  sx={{ fontWeight: 'bold', textAlign: 'center' }}
                >
                  {getColumnLabel(index)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {horses.map((horse) => (
              <TableRow key={horse.number}>
                <TableCell>
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      backgroundColor: getGateColor(
                        horse.gateNumber,
                        theme,
                        horses.length
                      ).bg,
                      color: getGateColor(
                        horse.gateNumber,
                        theme,
                        horses.length
                      ).text,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      border: '2px solid white',
                    }}
                  >
                    {horse.number}
                  </Box>
                </TableCell>
                <TableCell>{horse.name}</TableCell>
                {Array.from({ length: getColumnCount() }, (_, index) => {
                  const isSelected =
                    columnHorses[index]?.includes(horse.number) || false;
                  const maxHorses =
                    selectedBetType === 'win' || selectedBetType === 'place'
                      ? horses.length
                      : selectedMethod === 'single'
                      ? 1
                      : horses.length;
                  const isDisabled =
                    !isSelected &&
                    (columnHorses[index]?.length || 0) >= maxHorses;

                  return (
                    <TableCell key={index} sx={{ textAlign: 'center' }}>
                      <Checkbox
                        checked={isSelected}
                        onChange={() => onHorseToggle(horse.number, index)}
                        disabled={isDisabled}
                        size='small'
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
