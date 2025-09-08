import { MainLayout } from '@/components/layout/MainLayout.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useNavigate } from 'react-router';

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <div className='space-y-4'>
        <h2 className='text-2xl font-bold'>ようこそ</h2>
        <p>馬の期待値分析ツールへようこそ！</p>

        <div className='flex gap-4'>
          <Button onClick={() => navigate('/')}>🏠 ダッシュボードへ</Button>
          <Button onClick={() => navigate('/horses')}>🐎 馬一覧へ</Button>
          <Button onClick={() => navigate('/analysis')}>📊 期待値分析へ</Button>
          <Button onClick={() => navigate('/history')}>📜 履歴へ</Button>
        </div>
      </div>
    </MainLayout>
  );
}
