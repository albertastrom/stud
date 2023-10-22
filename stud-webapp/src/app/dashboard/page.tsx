'use client'

import { useEffect, useState } from "react";

import { auth, db } from "../firebase";
import { collection, query, addDoc } from "firebase/firestore";

import Navbar from "../components/Navbar";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import HistoryTable from "./table";

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
    <Navbar />
    <HistoryTable />
  </div>
  ) : <>Loading...</>

  return (
  <>
    {page}
  </>
  );
}