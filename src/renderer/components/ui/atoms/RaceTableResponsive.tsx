import { type JSX, useMemo, useState } from 'react';
import { Table, TableContainer, Paper, Box } from '@mui/material';
import type { RaceTableProps, HorseData } from './types/raceTable';
import { sortHorseData } from './utils/raceTableUtils';
import { HorseDetailModal } from './modals/HorseDetailModal';
import { RaceTableHeader } from './table/RaceTableHeader';
import { RaceTableBody } from './table/RaceTableBody';
import { RaceTableMobileView } from './mobile/RaceTableMobileView';

/**
 * レスポンシブなレーステーブルコンポーネント
 * デスクトップではテーブル表示、モバイルではアコーディオン表示
 * MUIのベストプラクティスに従い、適切なコンポーネント分割を実装
 */
export const RaceTableResponsive = ({
  horseData,
  sortField,
  sortDirection,
  onSort,
}: RaceTableProps): JSX.Element => {
  const [selectedHorse, setSelectedHorse] = useState<HorseData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // ソートされたデータの計算
  const sortedHorseData = useMemo(() => {
    return sortHorseData(horseData, sortField, sortDirection);
  }, [horseData, sortField, sortDirection]);

  // 馬データのクリックハンドラー
  const handleHorseClick = (horse: HorseData) => {
    setSelectedHorse(horse);
    setModalOpen(true);
  };

  return (
    <>
      {/* デスクトップ用テーブル表示 */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Table stickyHeader>
            <RaceTableHeader
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={onSort}
            />
            <RaceTableBody
              horseData={sortedHorseData}
              onHorseClick={handleHorseClick}
            />
          </Table>
        </TableContainer>
      </Box>

      {/* モバイル用アコーディオン表示 */}
      <RaceTableMobileView
        horseData={sortedHorseData}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={onSort}
        onHorseClick={handleHorseClick}
      />

      {/* 詳細モーダル */}
      <HorseDetailModal
        horse={selectedHorse}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};
