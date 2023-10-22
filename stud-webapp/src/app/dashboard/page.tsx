'use client'

import { useEffect, useState } from "react";

import { auth, db } from "../firebase";
import { collection, query, addDoc } from "firebase/firestore";

import Navbar from "../components/Navbar";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<User | undefined>();
  const [newSession, setNewSession] = useState<{
    uid: string;
    breaks: string[],
    checkins: string[],
    current_state: string,
    tabs: string[],
    tasks: string[]
  }>({ 
    uid: '',
    breaks: [], 
    checkins: [],
    current_state: '',
    tabs: [],
    tasks: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const addSession = async (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();

    setNewSession({
      uid: user ? user.uid : '',
      breaks: newSession.breaks,
      checkins: newSession.checkins,
      current_state: newSession.current_state,
      tabs: newSession.tabs,
      tasks: newSession.tasks,
    });
    if (newSession.tasks.length !== 0 && newSession.uid !== '') {
      await addDoc(collection(db, 'study_sessions'), newSession);
      setNewSession({ 
        uid: '',
        breaks: [], 
        checkins: [],
        current_state: '',
        tabs: [],
        tasks: [], 
      });
      router.push('/session');
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await auth.onAuthStateChanged(function(check_user) {
        if (check_user) {
          setUser(check_user);
          setLoading(false);
        } else {
          router.push('/');
        }
      });
    };

    const query_sessions = query(collection(db, 'study_sessions'));

    checkAuthentication();
  }, [router]);

  const page = !loading ? (
  <div className="h-screen flex flex-col justify-center align-middle">
    <Navbar given_user={user} />
    <div className="h-full w-full flex flex-col align-center justify-center max-w-screen">
      <div className="w-full flex justify-center">
        <button className="p-2 cursor-pointer text-white bg-gradient-to-r from-blue-500 to-blue-500 hover:to-teal-400 m-4 mb-8 rounded-md">
          Start Study Session
        </button>
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
  </div>
  ) : <>Loading...</>

  return (
  <>
    {page}
  </>
  );
}