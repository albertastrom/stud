import { User } from 'firebase/auth';
import Modal from '../components/Modal';
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import { getDocs } from 'firebase/firestore/lite';

export default function HistoryTable({ user } : { user: User | undefined }) {
  const [taskObjs, setTaskObjs] = useState<any[]>();

  async function getHistory() {
    const userObj = await getDoc(doc(db, 'users', user ? user.uid : ''));
    const sessionsQuery = await query(collection(db, 'study_sessions'), where("uid", "==", userObj.id));
    const sessionObjs = await getDocs(sessionsQuery);
    sessionObjs.docs.map(async (value, index) => {
      const tasksQuery = await query(collection(db, 'tasks'), where('uid', '==', sessionObjs.docs[0].id));
      const taskObjs = await getDocs(tasksQuery);
      setTaskObjs(taskObjs.docs.concat(taskObjs.docs));
    });
  }

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      getHistory();
    }
    return () => { ignore = true; }
  });
  

  return (
  <div className="h-full w-full flex flex-col align-center justify-center max-w-screen">
    <div className="w-full flex justify-center">
      <Modal user={user} />
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