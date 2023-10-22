'use client'

import { useEffect, useState } from "react";

import { auth } from "../firebase";
import Navbar from "../components/Navbar";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      await auth.onAuthStateChanged(function(check_user) {
        if (check_user) {
          setUser(check_user)
          setLoading(false);
        } else {
          router.push('/');
        }
      });
    };
    checkAuthentication();
  }, [router]);

  const page = !loading ? (
  <>
    <Navbar given_user={user} />
    <div className="w-full flex flex-col justify-center max-w-screen mt-5">

      <div className="w-full flex justify-center">
        <h1 className="text-3xl font-bold">🕰️ Study History</h1>
      </div>
      <table className="self-center max-w-lg w-full m-5 table-auto border border-slate-500 rounded-lg border-separate border-spacing-5">
        <thead>
          <tr>
            <th className="border border-slate-600">Time</th>
            <th className="border border-slate-600">Title</th>
            <th className="border border-slate-600">Productivity</th>
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
  </>
  ) : <>Loading...</>

  return (
  <>
    {page}
  </>
  );
}