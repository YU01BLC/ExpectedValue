import { useNavigate } from 'react-router';

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className='max-w-4xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>ダッシュボード</h2>
      <p className='mb-6'>
        馬の期待値分析ツールへようこそ。左のナビから機能を選んでください。
      </p>

      <div className='flex gap-4'>
        <button
          className='px-4 py-2 bg-blue-600 text-white rounded'
          onClick={() => navigate('/horses')}
        >
          🐎 馬一覧へ
        </button>
        <button
          className='px-4 py-2 bg-green-600 text-white rounded'
          onClick={() => navigate('/analysis')}
        >
          📊 期待値分析へ
        </button>
        <button
          className='px-4 py-2 bg-gray-700 text-white rounded'
          onClick={() => navigate('/history')}
        >
          📜 履歴へ
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
