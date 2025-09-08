import { useNavigate } from 'react-router';

export const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <aside className='w-60 bg-white border-r p-4 flex flex-col gap-4'>
      <h2 className='text-lg font-bold'>Expected Value</h2>
      <nav className='flex flex-col gap-2'>
        <button className='text-left' onClick={() => navigate('/')}>
          🏠 Dashboard
        </button>
        <button className='text-left' onClick={() => navigate('/horses')}>
          🐎 馬一覧
        </button>
        <button className='text-left' onClick={() => navigate('/analysis')}>
          📊 期待値分析
        </button>
        <button className='text-left' onClick={() => navigate('/history')}>
          📜 履歴
        </button>
      </nav>
    </aside>
  );
};
