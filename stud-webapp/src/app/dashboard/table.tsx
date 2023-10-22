import Modal from '../components/Modal';

export default function HistoryTable({} : {}) {
  return (
  <div className="h-full w-full flex flex-col align-center justify-center max-w-screen">
    <div className="w-full flex justify-center">
      <Modal />
    </div>
    <div className="w-full flex justify-center">
      <h1 className="text-3xl font-bold">🕰️ Study History</h1>
    </div>
    <table className="self-center max-w-lg w-full m-5 table-auto border border-slate-500 rounded-lg border-separate border-spacing-5">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">Time</th>
          <th className="border border-slate-600 rounded-md">Title</th>
          <th className="border border-slate-600 rounded-md">Productivity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>4h 32min</td>
          <td>Problem Set</td>
          <td>81.5%</td>
        </tr>
      </tbody>
    </table>
  </div>
  );
}