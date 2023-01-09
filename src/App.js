import { useState } from 'react';
import './App.css';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  
  const [timeLeftMinutes, setTimeLeftMinutes] = useState(25);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(0);

  return (
    <div className="page">
      <div className='topRow'>
        <div className='block'>
          <h2 id="break-label">Break Length</h2>
          <div className='blockRow'>
            <h2 id="break-decrement">-</h2>
            <h2 id="break-length">{breakLength}</h2>
            <h2 id="break-increment">+</h2>
          </div>
        </div>
        <div className='block'>
          <h2 id="session-label">Session Length</h2>
          <div className='blockRow'>
            <h2 id="session-decrement">-</h2>
            <h2 id="session-length">{sessionLength}</h2>
            <h2 id="session-increment">+</h2>
          </div>
        </div>
        <div className='timerBlock'>
          <h2 id="timer-label">Session</h2>
          <h2 id="time-left">{timeLeftMinutes}:{timeLeftSeconds}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
