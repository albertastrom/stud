'use client'

import { useEffect, useState } from "react";

import { auth, db } from "../firebase";
import { collection, query, addDoc, getDoc, doc } from "firebase/firestore";

import Navbar from "../components/Navbar";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import HistoryTable from "./table";

export default function Dashboard() {
  const [authUser, setAuthUser] = useState<User>();
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      await auth.onAuthStateChanged(function(check_user) {
        if (check_user) {
          setAuthUser(check_user);
          setLoading(false);
        } else {
          router.push('/');
        }
      });

      if (authUser) {
        const userObj = await getDoc(doc(db, 'users', authUser.uid));

        if (userObj === undefined) {
          await addDoc(collection(db, 'users'), {uid: authUser.uid, apiKey: authUser.uid});
        } else {
          setUser(userObj);
        }
      }
    };

    const query_sessions = query(collection(db, 'study_sessions'));

    checkAuthentication();
  }, [router, authUser]);

  const page = !loading ? (
  <div className="h-screen flex flex-col justify-center align-middle">
    <Navbar />
    <HistoryTable user={authUser} />
  </div>
  ) : <>Loading...</>

  return (
  <>
    {page}
  </>
  );
}