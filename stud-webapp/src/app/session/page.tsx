"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import { auth } from "../firebase";

export default function SessionPage() {
  const [secondsLeft, setSecondsLeft] = useState<number>(15);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [timerColor, setTimerColor] = useState<string>("text-blue-500");
  const [buttonAnimation, setButtonAnimation] = useState("");
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      await auth.onAuthStateChanged(function (check_user) {
        if (check_user) {
          setUser(check_user);
          setLoading(false);
        } else {
          router.push("/");
        }
      });
    };
    checkAuthentication();

    if (secondsLeft <= 0) {
      setButtonsVisible(true);
      playSound("/timerEnd.mp3");
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prevSeconds) => Math.max(prevSeconds - 1, 0));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [secondsLeft, router]);

  const formattedTime = formatTime(secondsLeft);
  const isTimerExpired = secondsLeft === 0;

  const continueClick = () => {
    setButtonAnimation("opacity-0 scale-125");
    playSound("/continueClick.mp3");
    setTimeout(() => {
      setButtonsVisible(false);
      setSecondsLeft(15);
      setTimerColor("text-blue-500");
      setButtonAnimation("");
    }, 500);
  };

  const breakClick = () => {
    setButtonAnimation("opacity-0 scale-125");
    playSound("/breakClick.mp3");
    setTimeout(() => {
      setButtonsVisible(false);
      setSecondsLeft(5);
      setTimerColor("text-orange-400");
      setButtonAnimation("");
    }, 500);
  };

  const playSound = (src: string) => {
    const audio = new Audio(src);
    audio.play();
  };

  const page = !loading ? (
    <div className="bg-gradient-to-r from-sky-200 h-screen flex flex-col justify-center items-center overflow-hidden">
      <Navbar given_user={user} />
      <span
        className={`${timerColor} h-full transition-all duration-500 ${
          isTimerExpired
            ? "opacity-0 transform scale-125"
            : "opacity-20 hover:opacity-40"
        } text-[300px] font-bold font-mono text-center mb-12`}
      >
        {formattedTime}
      </span>

      {buttonsVisible && (
        <div
          className="flex justify-between w-1/3 transition-all transform duration-500 ease-in-out"
          style={{
            bottom: isTimerExpired ? "30%" : "0%",
            position: "absolute",
          }}
        >
          <button
            onClick={continueClick}
            className={`transform transition-all ${buttonAnimation} duration-500 ease-in-out hover:scale-110`}
          >
            <div className="bg-green-100 rounded-full p-9 shadow-lg text-6xl">
              👍
            </div>
          </button>
          <button
            onClick={breakClick}
            className={`transform transition-all ${buttonAnimation} duration-500 ease-in-out hover:scale-110`}
          >
            <div className="bg-rose-200 rounded-full p-9 shadow-lg text-6xl">
              🖐️
            </div>
          </button>
        </div>
      )}
    </div>
  ) : (
    <>Loading...</>
  );

  return (
    <>{page}</>
  );
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}
