import '@testing-library/jest-dom';

// ResizeObserverのモック
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// テスト環境でのチャートサイズ警告を抑制
const originalConsoleWarn = console.warn;
console.warn = (message: string) => {
  if (
    message.includes(
      'The width(0) and height(0) of chart should be greater than 0'
    )
  ) {
    return;
  }
  originalConsoleWarn(message);
};
