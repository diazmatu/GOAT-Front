import React, {useRef,useState}  from 'react';
//import { useTimer } from 'react-timer-hook';

const Timer = () => {
  const { time, start, stop, reset, onTimeout } = useTimer({
    minutes: 10,
    interval: 10,
  });
  return (
    <div>
      <div className="Timer">
      <h1>{time.minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:{time.seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}.{(time.millis/10).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</h1>
              <button onClick={start}>Start</button>
              <button onClick={stop}>Pause</button>
              <button onClick={reset}>Restart</button>
        </div>
    </div>
  );
}
  const useTimer = ({
    minutes = 10,
    seconds = 0,
    millis = 0,
    interval = 10,
  }) => {
    const [time, setTime] = useState({
      minutes,
      seconds,
      millis,
    });

    const [runningClock, setRunningClock] = useState()
    const started = useRef(false);
    const originalTime = {
      minutes,
      seconds,
      millis,
    };

    const countDown = () => {
      setTime(t => {
        let totalMillis =
          1000 * (t.minutes * 60 + t.seconds) + t.millis - 10;
          //debugger
        return {
          minutes: Math.floor((totalMillis % 3600000) / 60000),
          seconds: Math.floor((totalMillis % 60000) / 1000),
          millis: totalMillis % 1000,
        };
      });
    };

    const onTimeout = callback => {
      callback();
    };

    const reset = () => {
      stop()
      setTime({ ...originalTime });
    };

    const stop = () => {
      started.current = false;
      clearInterval(runningClock)
    };

    const start = () => {
      if (!started.current) {
        started.current = true;
          setRunningClock(setInterval(() => {
          if (started.current) countDown();
        }, 10))
      }
    };
  
    return { time, start, stop, reset, onTimeout };
  };

export default Timer