'use client'

import { useEffect, useState } from "react";

import { auth, db } from "../firebase";
import { collection, query, addDoc, getDoc, doc, where, getDocs } from "firebase/firestore";

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
        } else {
          router.push('/');
        }
      });

      if (authUser) {
        const userQuery = await query(collection(db, 'users'), where('uid', '==', authUser.uid));
        const userObj = (await getDocs(userQuery)).docs[0];

        if (userObj === undefined) {
          setUser(await addDoc(collection(db, 'users'), {uid: authUser.uid, apiKey: authUser.uid.substring(0, 6).toUpperCase()}));
        } else {
          setUser(userObj);
        }
      }


      setLoading(false);
    };

    checkAuthentication();
  }, [router, authUser]);

  const page = !loading ? (
  <div className="h-screen flex flex-col justify-center align-middle">
    <Navbar />
    <h1 className="ml-2 font-bold">API Key: {user?.get('apiKey')}</h1>
    <HistoryTable user={authUser} />
  </div>
  ) : <>Loading...</>

  return (
  <>
    {page}
  </>
  );
}