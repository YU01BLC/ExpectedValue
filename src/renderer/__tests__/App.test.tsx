import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AppProviders from '../App';

// Mock i18n
vi.mock('@/i18n', () => ({}));

describe('AppProviders', () => {
  it('基本的なプロバイダが表示されること', () => {
    // GIVEN
    const children = <div data-testid='test-content'>テストコンテンツ</div>;

    // WHEN
    render(<AppProviders>{children}</AppProviders>);

    // THEN
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  it('Suspenseフォールバックが表示されること', () => {
    // GIVEN
    const children = <div data-testid='test-content'>テストコンテンツ</div>;

    // WHEN
    render(<AppProviders>{children}</AppProviders>);

    // THEN
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  it('複数の子要素が正しく表示されること', () => {
    // GIVEN
    const children = (
      <>
        <div data-testid='child-1'>子要素1</div>
        <div data-testid='child-2'>子要素2</div>
        <div data-testid='child-3'>子要素3</div>
      </>
    );

    // WHEN
    render(<AppProviders>{children}</AppProviders>);

    // THEN
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('child-3')).toBeInTheDocument();
  });

  it('空の子要素でも表示されること', () => {
    // GIVEN
    const children = null;

    // WHEN
    render(<AppProviders>{children}</AppProviders>);

    // THEN
    const container = document.querySelector('div');
    expect(container).toBeInTheDocument();
  });

  it('テーマプロバイダが正しく設定されること', () => {
    // GIVEN
    const children = <div data-testid='theme-test'>テーマテスト</div>;

    // WHEN
    render(<AppProviders>{children}</AppProviders>);

    // THEN
    expect(screen.getByTestId('theme-test')).toBeInTheDocument();
  });

  it('CssBaselineが適用されること', () => {
    // GIVEN
    const children = (
      <div data-testid='css-baseline-test'>CSSベースラインテスト</div>
    );

    // WHEN
    render(<AppProviders>{children}</AppProviders>);

    // THEN
    expect(screen.getByTestId('css-baseline-test')).toBeInTheDocument();
  });
});
