const mockData = [
  { num: 1, name: 'サンプルA', rank: 'A', prob: 0.32, odds: 1.8, ev: 0.95 },
  { num: 2, name: 'サンプルB', rank: 'S', prob: 0.18, odds: 7.2, ev: 1.3 },
];

const Horses = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>出走馬一覧（ダミーデータ）</h2>
      <div className='overflow-auto bg-white rounded border'>
        <table className='w-full table-auto'>
          <thead className='text-left bg-slate-100'>
            <tr>
              <th className='p-2'>枠</th>
              <th className='p-2'>馬名</th>
              <th className='p-2'>評価</th>
              <th className='p-2'>勝率</th>
              <th className='p-2'>オッズ</th>
              <th className='p-2'>EV</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((h) => (
              <tr key={h.num} className='border-t'>
                <td className='p-2'>{h.num}</td>
                <td className='p-2'>{h.name}</td>
                <td className='p-2 font-bold'>{h.rank}</td>
                <td className='p-2'>{(h.prob * 100).toFixed(1)}%</td>
                <td className='p-2'>{h.odds}</td>
                <td className='p-2'>{h.ev.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Horses;
