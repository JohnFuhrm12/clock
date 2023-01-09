import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  const [timerLabel, setTimerLabel] = useState('Session');
  const [timerRunning, setTimerRunning] = useState(false);

  const [timeLeftMinutes, setTimeLeftMinutes] = useState('25');
  const [timeLeftSeconds, setTimeLeftSeconds] = useState('4');

  const [formattedTime, setFormattedTime] = useState('25:00');

  useEffect(() => {
    const timer = timeLeftSeconds > 0 && timerRunning && setInterval(() => setTimeLeftSeconds(timeLeftSeconds - 1), 1000);
    if (timerRunning && timeLeftSeconds === 0 && timeLeftMinutes >= 1) {
      setTimeLeftSeconds('59');
      setTimeLeftMinutes(timeLeftMinutes - 1);
    }
    if (timerRunning && timeLeftSeconds === '00' && timeLeftMinutes >= 1) {
      setTimeLeftSeconds('59');
      setTimeLeftMinutes(timeLeftMinutes - 1);
    }

    if (timerRunning && timeLeftSeconds === 0 && timeLeftMinutes === 0 && timerLabel === 'Session') {
      setTimerLabel('Break');
      setTimeLeftSeconds('00');
      setTimeLeftMinutes(breakLength);
    }

    if (timerRunning && timeLeftSeconds === 0 && timeLeftMinutes === 0 && timerLabel === 'Break') {
      setTimerLabel('Session');
      setTimeLeftSeconds('00');
      setTimeLeftMinutes(sessionLength);
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
    setTimeLeftSeconds('00')
    setTimerRunning(false);
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
          <h2 id="break-label">Break Length</h2>
          <div className='blockRow'>
            <h2 onClick={decrementBreak} id="break-decrement">-</h2>
            <h2 id="break-length">{breakLength}</h2>
            <h2 onClick={incrementBreak} id="break-increment">+</h2>
          </div>
        </div>
        <div className='block'>
          <h2 id="session-label">Session Length</h2>
          <div className='blockRow'>
            <h2 onClick={decrementSession} id="session-decrement">-</h2>
            <h2 id="session-length">{sessionLength}</h2>
            <h2 onClick={incrementSession} id="session-increment">+</h2>
          </div>
        </div>
      </div>
        <div className='timerBlock'>
          <h2 id="timer-label">{timerLabel}</h2>
          <h2 id="time-left">{formattedTime}</h2>
        </div>
        <div className='bottomRow'>
          <button onClick={startStop} id="start_stop">StartStop</button>
          <button onClick={reset} id="reset">Reset</button>
        </div>
    </div>
    </>
  );
}

export default App;
