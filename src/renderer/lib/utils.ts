import { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

/**
 * 複数のクラス名を結合し、Tailwindの競合ユーティリティをマージする。
 * @param inputs - クラス名、条件付きクラスの配列
 * @returns マージ済みのクラス文字列
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
