import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

/**
 * 回収率推移のサンプルデータ。
 * - グラフ描画のための暫定データ。
 */
const sampleData = [
  { t: '2025-08-01', rate: 95 },
  { t: '2025-08-08', rate: 102 },
  { t: '2025-08-15', rate: 88 },
  { t: '2025-08-22', rate: 110 },
  { t: '2025-08-29', rate: 98 },
];

/**
 * 期待値分析ページ。
 * - 回収率推移の折れ線グラフを描画するデモ実装。
 */
const Analysis = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>期待値分析（サンプル）</h2>

      <div className='bg-white rounded shadow p-4'>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='t' />
              <YAxis domain={[50, 150]} />
              <Tooltip />
              <Line
                type='monotone'
                dataKey='rate'
                stroke='#3182ce'
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className='text-sm text-gray-500 mt-2'>
          折れ線は回収率（％）の推移イメージです。
        </p>
      </div>
    </div>
  );
};

export default Analysis;
