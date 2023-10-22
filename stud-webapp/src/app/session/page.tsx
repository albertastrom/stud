"use client";

import { useState, useEffect } from "react";

export default function SessionPage() {
  const [secondsLeft, setSecondsLeft] = useState<number>(.1 * 60);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [buttonAnimation, setButtonAnimation] = useState("");

  useEffect(() => {
    if (secondsLeft <= 0) {
      setButtonsVisible(true);
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prevSeconds) => Math.max(prevSeconds - 1, 0));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [secondsLeft]);

  const formattedTime = formatTime(secondsLeft);
  const isTimerExpired = secondsLeft === 0;

  const continueClick = () => {
    setButtonAnimation("opacity-0 scale-125");
    setTimeout(() => {
      setButtonsVisible(false);
      setSecondsLeft(.1 * 60);
      setButtonAnimation("");
    }, 500);
  };

  const breakClick = () => {
    setButtonAnimation("opacity-0 scale-125");
    setTimeout(() => {
      setButtonsVisible(false);
      setSecondsLeft(1);
      setButtonAnimation("");
    }, 500);
  };

  return (
    <div className="bg-gradient-to-r from-sky-200 h-screen flex flex-col justify-center items-center">
      <span
        className={`text-blue-500 transition-all duration-500 ${
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
            className={`transform transition-transform hover:scale-110 ${buttonAnimation} duration-500 ease-in-out`}
          >
            <div className="bg-green-100 rounded-full p-9 shadow-lg text-6xl">
              👍
            </div>
          </button>
          <button
            onClick={breakClick}
            className={`transform transition-transform hover:scale-110 ${buttonAnimation} duration-500 ease-in-out`}
          >
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
