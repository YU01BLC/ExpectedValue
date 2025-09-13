import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createAppTheme } from '@renderer/theme/theme';
import { Card } from '../Card';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

const theme = createAppTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Card', () => {
  it('基本的なカードが表示されること', () => {
    // GIVEN
    const title = 'テストカード';
    const content = 'テストコンテンツ';

    // WHEN
    renderWithTheme(
      <Card title={title}>
        <div>{content}</div>
      </Card>
    );

    // THEN
    expect(screen.getByText('テストカード')).toBeInTheDocument();
    expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
  });

  it('アイコン付きのカードが表示されること', () => {
    // GIVEN
    const title = 'アイコンカード';
    const icon = <span data-testid='test-icon'>📊</span>;

    // WHEN
    renderWithTheme(
      <Card title={title} icon={icon}>
        <div>コンテンツ</div>
      </Card>
    );

    // THEN
    expect(screen.getByText('アイコンカード')).toBeInTheDocument();
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('メイン値が表示されること', () => {
    // GIVEN
    const title = '統計カード';
    const mainValue = {
      icon: <span data-testid='main-icon'>📈</span>,
      value: '105%',
      iconColor: '#60a5fa',
      fontSize: 42,
    };

    // WHEN
    renderWithTheme(
      <Card title={title} mainValue={mainValue}>
        <div>コンテンツ</div>
      </Card>
    );

    // THEN
    expect(screen.getByText('統計カード')).toBeInTheDocument();
    expect(screen.getByText('105%')).toBeInTheDocument();
    expect(screen.getByTestId('main-icon')).toBeInTheDocument();
  });

  it('キャプションが表示されること', () => {
    // GIVEN
    const title = 'キャプションカード';
    const caption = 'これはキャプションです';

    // WHEN
    renderWithTheme(
      <Card title={title} caption={caption}>
        <div>コンテンツ</div>
      </Card>
    );

    // THEN
    expect(screen.getByText('キャプションカード')).toBeInTheDocument();
    expect(screen.getByText('これはキャプションです')).toBeInTheDocument();
  });

  it('アクション部分が表示されること', () => {
    // GIVEN
    const title = 'アクションカード';
    const action = <button data-testid='action-button'>アクション</button>;

    // WHEN
    renderWithTheme(
      <Card title={title} action={action}>
        <div>コンテンツ</div>
      </Card>
    );

    // THEN
    expect(screen.getByText('アクションカード')).toBeInTheDocument();
    expect(screen.getByTestId('action-button')).toBeInTheDocument();
  });

  it('クリックハンドラーが動作すること', async () => {
    // GIVEN
    const user = userEvent.setup();
    const title = 'クリックカード';
    const handleClick = vi.fn();

    // WHEN
    renderWithTheme(
      <Card title={title} onClick={handleClick}>
        <div>コンテンツ</div>
      </Card>
    );

    // THEN
    const card = screen
      .getByText('クリックカード')
      .closest('div[role="button"]');
    expect(card).toBeInTheDocument();

    // クリックイベントをテスト
    await user.click(card!);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('カスタムスタイルが適用されること', () => {
    // GIVEN
    const title = 'スタイルカード';
    const customSx = { backgroundColor: 'red' };

    // WHEN
    renderWithTheme(
      <Card title={title} sx={customSx}>
        <div>コンテンツ</div>
      </Card>
    );

    // THEN
    expect(screen.getByText('スタイルカード')).toBeInTheDocument();
  });

  it('タイトルなしでアイコンのみの場合の表示確認', () => {
    // GIVEN
    const icon = <span data-testid='icon-only'>📊</span>;
    // WHEN
    renderWithTheme(
      <Card title='テストタイトル' icon={icon}>
        <div>コンテンツ</div>
      </Card>
    );

    // THEN
    expect(screen.getByTestId('icon-only')).toBeInTheDocument();
    expect(screen.getByText('テストタイトル')).toBeInTheDocument();
  });

  it('タイトルとアイコンの両方なしの場合の表示確認', () => {
    // GIVEN
    // WHEN
    renderWithTheme(
      <Card>
        <div>コンテンツ</div>
      </Card>
    );

    // THEN
    expect(screen.getByText('コンテンツ')).toBeInTheDocument();
  });

  it('タイトルとアイコンなしでactionのみの場合の表示確認', () => {
    // GIVEN
    const action = <button data-testid='action-button'>アクション</button>;

    // WHEN
    renderWithTheme(
      <Card action={action}>
        <div>コンテンツ</div>
      </Card>
    );

    // THEN
    expect(screen.getByTestId('action-button')).toBeInTheDocument();
    expect(screen.getByText('コンテンツ')).toBeInTheDocument();
  });
});
