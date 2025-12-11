import { useState, useRef } from "react";

export default function Timers() {
  const [timers, setTimers] = useState([
    {
      id: Date.now(),
      hour: 0,
      minute: 0,
      second: 0,
      status: "stopped",  // stopped, running, paused
    }]);  // multiple timers {id, hour, min, sec, status}
  const intervalRef = useRef({});  // {timer.id: intervalRef}
  
  // add a timer
  function handleAddTimer() {
    const newTimer = {
      id: Date.now(),
      hour: 0,
      minute: 0,
      second: 0,
      status: "stopped",
    }
    setTimers(prevTimers => [...prevTimers, newTimer]);
  }

  // start a timer
  function handleStart(id) {
    if (intervalRef.current[id]) return;  // if the timer is running, clicking on start will do nothing

    setTimers(prevTimers =>
      prevTimers.map(timer => {
        if (timer.id !== id) return timer;
        return {
          ...timer,
          status: "running",
        };
      })
    )

    const intervalId = setInterval(() => {
      setTimers(prevTimers =>
        prevTimers.map(timer => {
          if (timer.id !== id) {
            return timer;
          }
          let { hour, minute, second, status } = timer;
          
          second += 1;
          if (second === 60) {
            second = 0;
            minute += 1;
          }
          if (minute === 60) {
            minute = 0;
            hour += 1;
          }
          status = "running";
          return {
            ...timer,
            hour,
            minute,
            second,
            status,
          };
        })
      )
    }, 1000);
    intervalRef.current[id] = intervalId;
  }
  
  // pause a timer
  function handlePause(id) {
    const intervalId = intervalRef.current[id];
    if (!intervalId) return;

    clearInterval(intervalId);
    delete intervalRef.current[id];

    setTimers(prevTimers => 
      prevTimers.map(timer => {
        if (timer.id !== id) return timer;
        return { ...timer, status: "paused" };
      })
    );
  };

  // stop a timer
  function handleStop(id) {
    const intervalId = intervalRef.current[id];
    if (intervalId) {
      clearInterval(intervalId);
      delete intervalRef.current[id];
    }
    setTimers(prevTimers =>
      prevTimers.map(timer => {
        if (timer.id !== id) return timer;
        return { ...timer, hour: 0, minute: 0, second: 0, status: "stopped" };
      })
    );
  }

  // delete a timer
  function handleDelete(id) {
    const intervalId = intervalRef.current[id];
    
    if (intervalId) {
      clearInterval(intervalId);
      delete intervalRef.current[id];
    }

    setTimers(prevTimers =>
      prevTimers.filter(timer => timer.id !== id)
    );
  }

  return (
    <div className="timer">
      <div className="add-btn-wrap">
        <button onClick={handleAddTimer}>Add Timer</button>
      </div>
      {timers.map(timer => (
          <div className="single-timer">
            <div key={timer.id}>
              <div className="time">
                <span>
                  {timer.hour <= 9 ? `0${timer.hour}`:`${timer.hour}`}: 
                </span>
                <span>
                  {timer.minute <= 9 ? `0${timer.minute}`:`${timer.minute}`}:  
                </span>
                <span>
                  {timer.second <= 9 ? `0${timer.second}`:`${timer.second}`}
                </span>
              </div>
              <div className="timer-btn">
                <button onClick={() => handleStart(timer.id)}>Start</button>
                <button onClick={() => handlePause(timer.id)}>Pause</button>
                <button onClick={() => handleStop(timer.id)}>Stop</button>
                <button onClick={() => handleDelete(timer.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}