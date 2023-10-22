'use client'

import { useState } from "react";
import { signOut } from "firebase/auth";

import { auth } from "../firebase";

const logOut = () => {
  signOut(auth); 
};

export default function dashboard() {
  // const { user } = useUserAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   const checkAuthentication = async () => {
  //     await auth.onAuthStateChanged(function(user) {
  //       if (user) {
  //         router.push('/dashboard');
  //       }
  //     });

  //     setLoading(false);
  //   };
  //   checkAuthentication();
  // }, [user, router]);

  return (
  <></>
  );
}