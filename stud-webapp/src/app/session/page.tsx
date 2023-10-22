"use client";

import { useState, useEffect } from "react";

export default function SessionPage() {
  const [secondsLeft, setSecondsLeft] = useState<number>(.5 * 60);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prevSeconds) => Math.max(prevSeconds - 1, 0));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [secondsLeft]);

  const formattedTime = formatTime(secondsLeft);
  const isTimerExpired = secondsLeft === 0;

  return (
    <div className="bg-gradient-to-r from-sky-200 h-screen flex justify-center items-center">
      <span
        className={`text-blue-500 ${
          isTimerExpired ? "opacity-0" : "opacity-20"
        } text-[300px] font-bold font-mono text-center`}
      >
        {formattedTime}
      </span>

      {isTimerExpired && (
        <div className="absolute w-full flex justify-between w-1/3">
          <button className="transform transition-transform hover:scale-110">
            <div className="bg-green-100 rounded-full p-9 shadow-lg text-6xl">
              👍
            </div>
          </button>
          <button className="transform transition-transform hover:scale-110">
            <div className="bg-rose-200 rounded-full p-9 shadow-lg text-6xl">
              🖐️
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}
