import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "firebase/auth";

import { auth } from "../firebase";
// import SetupModal from "./setup";

const logOut = () => {
  signOut(auth);
};

const Navbar = () => {
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-20 w-full border-b-2 flex items-center justify-between p-2 z-10">
      <ul className="flex">
        <li className="p-2 cursor-pointer">
          <Link href="/dashboard" className="p-0">
            <Image 
              src="/stud_logo1.png"
              alt="Stud Logo"
              className='dark:invert'
              width={100}
              height={100}
              priority 
              />
          </Link>
        </li>
      </ul>
      <div className="flex flex-row justify-between w-full ml-5 mr-5 font-bold">
        <p></p>
        <p className="cursor-pointer" onClick={handleSignOut}>
          Sign out
        </p>
      </div>
    </div>
  );
};

export default Navbar;