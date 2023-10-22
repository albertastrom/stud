'use client'

import Image from 'next/image';
import Link from 'next/link';

import {
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "./firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

export default function Home() {
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await auth.onAuthStateChanged(function(currentUser) {
        if (currentUser) {
          router.push('/dashboard')
        }
      });
    };
    checkAuthentication();
  }, [router]);


  return (
    <main className="flex flex-col items-center justify-between p-24 overflow-hidden max-h-screen">
      <section className="relative">
        {/* Illustration behind hero content */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1" aria-hidden="true">
          <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
                <stop stopColor="#FFF" offset="0%" />
                <stop stopColor="#EAEAEA" offset="77.402%" />
                <stop stopColor="#DFDFDF" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="url(#illustration-01)" fillRule="evenodd">
              <circle cx="1232" cy="128" r="128" />
              <circle cx="155" cy="443" r="64" />
            </g>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Hero content */}
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Section header */}
            <div className="text-center pb-12 md:pb-16">
              <Link href="/" className="p-0">
                <Image 
                  src="/stud_logo.png"
                  alt="Stud Logo"
                  className='dark:invert'
                  width={100}
                  height={100}
                  priority 
                  />
              </Link>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">stud</span></h1>
              <div className="max-w-3xl mx-auto">
                <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">Make studying easy, fun, and trackable.</p>
                <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                  <ul className="flex w-full justify-center">
                    <li onClick={handleSignIn} className="p-2 cursor-pointer text-white bg-gradient-to-r from-blue-500 to-blue-500 hover:to-teal-400 mb-4 rounded-md">
                      Login
                    </li>
                    <li onClick={handleSignIn} className="p-2 cursor-pointer">
                      Sign up
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
