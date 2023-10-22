'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useUserAuth } from "../context/AuthContext";
import Image from "next/image";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

const logOut = () => {
  signOut(auth);
};

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await auth.onAuthStateChanged(function(currentUser) {
        setUser(currentUser);
      });
      setLoading(false);
    };
    checkAuthentication();
  }, [user, router]);

  return (
    <div className="h-20 w-full border-b-2 flex items-center justify-between p-2">
      <ul className="flex">
        <li className="p-2 cursor-pointer">
          <Link href="/" className="p-0">
            <Image 
              src="/stud_logo.png"
              alt="Stud Logo"
              width={100}
              height={100}
              priority 
              />
          </Link>
        </li>
      </ul>

      {loading ? null : !user ? (
        <ul className="flex">
          <li onClick={handleSignIn} className="p-2 cursor-pointer">
            Login
          </li>
          <li onClick={handleSignIn} className="p-2 cursor-pointer">
            Sign up
          </li>
        </ul>
      ) : (
        <div className="flex flex-row justify-between w-full">
          <p>Welcome, {user.displayName}</p>
          <p className="cursor-pointer" onClick={handleSignOut}>
            Sign out
          </p>
        </div>
      )}
    </div>
  );
};

export default Navbar;