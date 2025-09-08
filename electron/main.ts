/**
 * Electron アプリのメインプロセスエントリ。
 *
 * - レンダラを読み込み（開発: Vite サーバー / 本番: ビルド済み index.html）
 * - セキュリティベストプラクティスの適用（contextIsolation、nodeIntegration 無効、ナビゲーション制御）
 * - 単一インスタンス制御と外部リンクの扱い
 */
import { app, BrowserWindow, shell } from 'electron';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * ESM/CJS の両出力で現在のファイル・ディレクトリを解決します。
 * - CJS ビルド: Node が __filename/__dirname を提供
 * - ESM: import.meta.url から導出
 */
declare const __dirname: string | undefined;
declare const __filename: string | undefined;

const computedFilename =
  typeof __filename !== 'undefined'
    ? __filename
    : fileURLToPath(import.meta.url);
const computedDirname =
  typeof __dirname !== 'undefined' ? __dirname : dirname(computedFilename);

/**
 * アプリの単一ウィンドウ参照。
 * 閉じられた場合は null になり、macOS の activate で再生成されます。
 */
let win: BrowserWindow | null = null;

/** アプリの多重起動を防止します。 */
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
}
app.on('second-instance', () => {
  if (win) {
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

/** メインウィンドウを作成し、セキュリティポリシーを適用します。 */
const createWindow = () => {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      /** preload: レンダラ前に実行され安全APIを公開するスクリプトのパス */
      preload: join(computedDirname, 'preload.js'),
      /** contextIsolation: レンダラとpreloadのグローバルを分離（必ずtrue推奨） */
      contextIsolation: true,
      /** nodeIntegration: レンダラのNode.js API可否（false推奨、機能はpreload経由） */
      nodeIntegration: false,
      /** sandbox: サンドボックス有効化（要件次第、互換性配慮で現状false） */
      sandbox: false,
    },
  });

  // セキュリティ: 新規ウィンドウを抑止し、http(s) は既定ブラウザで開く
  win.webContents.setWindowOpenHandler(({ url }) => {
    try {
      const parsed = new URL(url);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        shell.openExternal(url);
      }
    } catch {}
    return { action: 'deny' };
  });

  // セキュリティ: 任意ナビゲーションを抑止（file:// のみ許可）
  win.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('file://')) {
      event.preventDefault();
    }
  });

  // セキュリティ: 権限リクエストは既定で拒否
  win.webContents.session.setPermissionRequestHandler(
    (_webContents, _permission, callback) => {
      callback(false);
    }
  );

  // 本番: メニューバーを非表示（DevTools は必要時のみ手動で開く）
  if (process.env.NODE_ENV !== 'development') {
    win.setMenuBarVisibility(false);
    // DevToolsは開かない（必要になれば明示的に開く）
  }

  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(join(computedDirname, '../dist/index.html'));
  }

  win.on('closed', () => {
    win = null;
  });
};

app.whenReady().then(() => {
  // Windows 通知などの識別子
  app.setAppUserModelId('com.expected-value.app');
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
