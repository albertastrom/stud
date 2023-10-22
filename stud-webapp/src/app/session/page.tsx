"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

const ON_TIME = 5; // prod: 15 mins for "on" time
const OFF_TIME = 2; // prod: 5 mins for "off" time

export default function SessionPage() {
  const [currentState, setCurrentState] = useState<any>();
  let isBreak = false;

  const [secondsLeft, setSecondsLeft] = useState<number>(1000);
  const [isPaused, setIsPaused] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [timerColor, setTimerColor] = useState<string>("text-blue-500");
  const [buttonAnimation, setButtonAnimation] = useState("");
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      const getHistory = async () => {
        const userObj = await getDoc(doc(db, 'users', user ? user.uid : ''));
        const sessionsQuery = await query(collection(db, 'study_sessions'), where("uid", "==", userObj.id), where('active', '==', true));
        const sessionObjs = await getDocs(sessionsQuery);
        const sessionObj = sessionObjs.docs[0];
        const c_state = await getDoc(doc(db, 'check_ins', sessionObj.get('current_state')));
        const b_state = await getDoc(doc(db, 'breaks', sessionObj.get('current_state')));
    
        console.log(c_state)
        console.log(b_state)

        if (c_state) {
          setCurrentState(c_state);
          isBreak = false;
        } else if (b_state) {
          setCurrentState(b_state);
          isBreak = true;
        }
      }
      getHistory();
    }

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


    setTimeout(() => {
      setLoading(false)
    }, 500);
    return () => {
      ignore = true;
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
    playSound("session/sounds/continueClick.mp3");
    setCurrentState({
      uid: currentState.get('uid'),
      start_time: currentState.get('start_time'),
      duration: currentState.get('duration'),
      end_time: Date.now() + ON_TIME,
      isDone: false,
      isPaused: false
    });
    setTimeout(() => {
      setButtonsVisible(false);
      setSecondsLeft(currentState.get('end_time') - currentState.get('start_time'));
      setTimerColor("text-blue-500");
      setButtonAnimation("");
    }, 500);
  };

  const breakClick = () => {
    setButtonAnimation("opacity-0 scale-125");
    playSound("session/sounds/breakClick.mp3");
    setCurrentState({
      uid: currentState.get('uid'),
      start_time: currentState.get('start_time'),
      duration: currentState.get('duration'),
      end_time: Date.now() + ON_TIME,
      isDone: false,
      isPaused: false
    });
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
