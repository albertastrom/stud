"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import { auth } from "../firebase";

const ON_TIME = 5; // prod: 15 mins for "on" time
const OFF_TIME = 2; // prod: 5 mins for "off" time

export default function SessionPage() {
  const [secondsLeft, setSecondsLeft] = useState<number>(ON_TIME);
  const [isPaused, setIsPaused] = useState(false);
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

    if (isPaused) {
      return;
    }
    
    if (secondsLeft <= 0) {
      setButtonsVisible(true);
      playSound("sounds/timerEnd.mp3");
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prevSeconds) => Math.max(prevSeconds - 1, 0));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [secondsLeft, router, isPaused]);

  const formattedTime = formatTime(secondsLeft);
  const isTimerExpired = secondsLeft === 0;
  const togglePause = () => {
    if (secondsLeft > 0) {
      setIsPaused(!isPaused);
    }
  };

  const continueClick = () => {
    setButtonAnimation("opacity-0 scale-125");
    playSound("sounds/continueClick.mp3");
    setTimeout(() => {
      setButtonsVisible(false);
      setSecondsLeft(ON_TIME);
      setTimerColor("text-blue-500");
      setButtonAnimation("");
    }, 500);
  };

  const breakClick = () => {
    setButtonAnimation("opacity-0 scale-125");
    playSound("sounds/breakClick.mp3");
    setTimeout(() => {
      setButtonsVisible(false);
      setSecondsLeft(OFF_TIME);
      setTimerColor("text-orange-400");
      setButtonAnimation("");
    }, 500);
  };

  // sound from Zapsplat.com
  const playSound = (src: string) => {
    const audio = new Audio(src);
    audio.play();
  };

  const page = !loading ? (
    <div className="h-screen flex flex-col justify-center items-center overflow-hidden">
      <Navbar />
      <span
        onClick={togglePause}
        className={`${timerColor} h-full relative z-0 transition-all duration-500 ${
          isTimerExpired
            ? "opacity-0 transform scale-125"
            : "opacity-20 hover:opacity-40"
        } text-[300px] font-bold font-mono text-center mb-12 cursor-pointer select-none`}
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
