/**
 * Preload: レンダラ起動前に隔離環境で走るスクリプト。
 * contextBridge: 隔離環境からレンダラへ「安全な最小API」を公開する仕組み。
 */
import { contextBridge } from 'electron';

/** window.api: レンダラから呼べる公開API（必要最小限のみ公開） */
contextBridge.exposeInMainWorld('api', {
  /**
   * ping: Preload疎通確認用（常に 'pong' を返す）
   * @returns 文字列 'pong'
   */
  ping: () => 'pong',
});

declare global {
  interface Window {
    api: {
      /** ping: 接続確認用に常に 'pong' を返す */
      ping: () => string;
    };
  }
}
