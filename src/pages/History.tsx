/**
 * 購入履歴/回収率ページ。
 * - MVP段階ではダミーの集計表示のみ実装。
 */
const History = () => {
  // ここは後で IndexedDB / 集計ロジックに繋げます
  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>購入履歴 / 回収率</h2>

      <div className='grid grid-cols-3 gap-4 mb-6'>
        <div className='p-4 bg-white rounded shadow'>累計投資: ¥123,456</div>
        <div className='p-4 bg-white rounded shadow'>累計払戻: ¥98,765</div>
        <div className='p-4 bg-white rounded shadow'>回収率: 80%</div>
      </div>

      <div className='bg-white rounded border p-4'>
        <p className='text-sm text-gray-500'>
          履歴はここに一覧表示されます（MVPでは最小表示でOK）。
        </p>
      </div>
    </div>
  );
};

export default History;
