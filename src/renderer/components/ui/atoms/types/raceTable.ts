import { type Theme } from '@mui/material';

// ソートの型定義
export type SortField =
  | 'horseNumber'
  | 'gateNumber'
  | 'evaluation'
  | 'expectedValue'
  | 'odds';

export type SortDirection = 'asc' | 'desc';

// 馬情報の型定義
export interface HorseData {
  id: string;
  name: string;
  horseNumber: number; // 馬番
  gateNumber: number; // 枠番
  evaluation: 'S' | 'A' | 'B' | 'C' | 'D';
  expectedValue: number;
  odds: number;
  comment: string;
}

// テーブルプロパティの型定義
export interface RaceTableProps {
  horseData: HorseData[];
  sortField: SortField | null;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

// 詳細モーダルの型定義
export interface HorseDetailModalProps {
  horse: HorseData | null;
  open: boolean;
  onClose: () => void;
}

// テーブルヘッダーの型定義
export interface RaceTableHeaderProps {
  sortField: SortField | null;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

// テーブルボディの型定義
export interface RaceTableBodyProps {
  horseData: HorseData[];
  onHorseClick: (horse: HorseData) => void;
}

// モバイルビューの型定義
export interface RaceTableMobileViewProps {
  horseData: HorseData[];
  sortField: SortField | null;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  onHorseClick: (horse: HorseData) => void;
}

// 色の型定義
export interface ColorInfo {
  bg: string;
  text: string;
}
