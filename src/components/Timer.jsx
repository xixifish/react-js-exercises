import { useState, useEffect, useRef } from "react";

export default function Timer() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const intervalRef = useRef(null);

  function handleStart() {
    intervalRef.current = setInterval(() => {
      setSecond(prevSecond => {
        if (prevSecond === 59) {
          setMinute(prevMinute => {
            if (prevMinute === 59) {
              setHour(prevHour => prevHour + 1)
              return 0;
            }
            return prevMinute + 1;
          });
          return 0;
        }
        return prevSecond + 1;
      });
    }, 1000)
  };

  function handlePause() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  function handleStop() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setHour(0);
    setMinute(0);
    setSecond(0);
  }

  return (
    <div className="timer">
      <div className="time">
        <span>
          {hour <= 9 ? `0${hour}`:`${hour}`}: 
        </span>
        <span>
          {minute <= 9 ? `0${minute}`:`${minute}`}:  
        </span>
        <span>
          {second <= 9 ? `0${second}`:`${second}`}
        </span>
      </div>
      <div className="timer-btn">
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleStop}>Stop</button>
      </div>
    </div>
  )
}