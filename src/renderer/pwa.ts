// PWA Service Worker登録
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// インストールプロンプトの処理
let deferredPrompt: BeforeInstallPromptEvent | null = null;

window.addEventListener('beforeinstallprompt', (e) => {
  // デフォルトのインストールプロンプトを防ぐ
  e.preventDefault();
  // イベントを保存して後で使用
  deferredPrompt = e as BeforeInstallPromptEvent;

  // インストールボタンを表示（オプション）
  console.log('PWAインストール可能');
});

// インストールボタンのクリック処理
export const installPWA = async () => {
  if (deferredPrompt) {
    // インストールプロンプトを表示
    deferredPrompt.prompt();
    // ユーザーの選択を待つ
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    // プロンプトをクリア
    deferredPrompt = null;
  }
};
