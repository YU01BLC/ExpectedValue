import { type JSX, useMemo, useState } from 'react';
import { Table, TableContainer, Paper } from '@mui/material';
import type { RaceTableProps, HorseData } from './types/raceTable';
import { sortHorseData } from './utils/raceTableUtils';
import { HorseDetailModal } from './modals/HorseDetailModal';
import { RaceTableHeader } from './table/RaceTableHeader';
import { RaceTableBody } from './table/RaceTableBody';

export const RaceTable = ({
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

      {/* 詳細モーダル */}
      <HorseDetailModal
        horse={selectedHorse}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};
