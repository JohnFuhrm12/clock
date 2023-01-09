import { useEffect, useState } from 'react';
import './App.css';

import beepSound from './beep.wav';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  const [timerLabel, setTimerLabel] = useState('Session');
  const [timerRunning, setTimerRunning] = useState(false);

  const [timeLeftMinutes, setTimeLeftMinutes] = useState('25');
  const [timeLeftSeconds, setTimeLeftSeconds] = useState('0');

  const [formattedTime, setFormattedTime] = useState('25:00');

  const beep = document.getElementById('beep');

  useEffect(() => {
    if (timeLeftMinutes === 0 && timeLeftSeconds > 0) {
      setFormattedTime(`0${timeLeftMinutes}:${timeLeftSeconds}`);
    }
    if (timeLeftMinutes === 0 && timeLeftSeconds < 10) {
      setFormattedTime(`0${timeLeftMinutes}:0${timeLeftSeconds}`);
    }
    if (timeLeftSeconds < 10 && timeLeftMinutes > 0) {
      setFormattedTime(`${timeLeftMinutes}:0${timeLeftSeconds}`);
    }
    if (timeLeftSeconds < 10 && timeLeftMinutes === 0) {
      setFormattedTime(`0${timeLeftMinutes}:0${timeLeftSeconds}`);
    }
  })

  useEffect(() => {
    const timer = timeLeftSeconds > 0 && timerRunning && setInterval(() => setTimeLeftSeconds(timeLeftSeconds - 1), 1000);
    if (timerRunning && timeLeftSeconds === 0 && timeLeftMinutes >= 1) {
      setTimeLeftSeconds('59');
      setTimeLeftMinutes(timeLeftMinutes - 1);
    }
    if (timerRunning && timeLeftSeconds === '0' && timeLeftMinutes >= 1) {
      setTimeLeftSeconds('59');
      setTimeLeftMinutes(timeLeftMinutes - 1);
    }

    if (timerRunning && timeLeftSeconds === 0 && timeLeftMinutes === 0 && timerLabel === 'Session') {
      setTimerLabel('Break');
      setTimeLeftSeconds('0');
      setTimeLeftMinutes(breakLength);
    }

    if (timerRunning && timeLeftSeconds === 0 && timeLeftMinutes === 0 && timerLabel === 'Break') {
      setTimerLabel('Session');
      setTimeLeftSeconds('0');
      setTimeLeftMinutes(sessionLength);
    }

    if (timeLeftMinutes === 0 && timeLeftSeconds === 0) {
      beep.play();
    }

    setFormattedTime(`${timeLeftMinutes}:${timeLeftSeconds}`);

    return () => clearInterval(timer);
  }, [timeLeftSeconds, timerRunning]);

  function startStop() {
    if (timerRunning) {
      setTimerRunning(false);
    } else {
      setTimerRunning(true);
    }
  };

  function reset() {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeftMinutes(25)
    setTimeLeftSeconds('0')
    setTimerRunning(false);
    beep.pause();
    beep.currentTime = 0;
  };

  useEffect(() => {
    setTimeLeftMinutes(sessionLength);
    setFormattedTime(`${sessionLength}:${timeLeftSeconds}`);
  }, [sessionLength])

  function decrementBreak() {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  function decrementSession() {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
    }
  };

  function incrementBreak() {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  function incrementSession() {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
    }
  };

  return (
    <>
    <div className="wrapper">
      <div className='topRow'>
        <div className='block'>
          <h2 id="break-label" className='text'>Break Length</h2>
          <div className='blockRow'>
            <h2 onClick={decrementBreak} id="break-decrement" className='operator'>-</h2>
            <h2 id="break-length" className='text'>{breakLength}</h2>
            <h2 onClick={incrementBreak} id="break-increment" className='operator'>+</h2>
          </div>
        </div>
        <div className='block'>
          <h2 id="session-label" className='text'>Session Length</h2>
          <div className='blockRow'>
            <h2 onClick={decrementSession} id="session-decrement" className='operator'>-</h2>
            <h2 id="session-length" className='text'>{sessionLength}</h2>
            <h2 onClick={incrementSession} id="session-increment" className='operator'>+</h2>
          </div>
        </div>
      </div>
        <div className='timerBlock'>
          <h2 id="timer-label" className='text'>{timerLabel}</h2>
          <h2 id="time-left" className='text'>{formattedTime}</h2>
        </div>
        <div className='bottomRow'>
          <button onClick={startStop} id="start_stop" className='button'>Start-Stop</button>
          <button onClick={reset} id="reset" className='button'>Reset</button>
        </div>
        <audio src={beepSound} id="beep"></audio>
    </div>
    </>
  );
}

export default App;
