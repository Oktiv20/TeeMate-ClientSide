import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import TeeTimeCard from '../components/cards/TeeTimeCard';
import { getAllTeeTimes } from '../api/teeTimeData';
import { getAllUsers } from '../api/userData';

export default function TeeTimes() {
  const [teeTimes, setTeeTime] = useState([]);
  const [, setPlayers] = useState([]);

  const viewTeeTimes = () => {
    getAllTeeTimes().then(setTeeTime);
  };

  const getPlayers = () => {
    getAllUsers().then(setPlayers);
  };

  useEffect(() => {
    viewTeeTimes();
    getPlayers();
  }, []);

  return (
    <>
      <div style={{
        margin: '0', padding: '0',
      }}
      >
        <Image
          src="/Images/grassSky.jpg"
          alt=""
          style={{ width: '100%', maxHeight: '320px', objectFit: 'cover' }}
        />
      </div>
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)',
      }}
      >
        <h1 style={{ color: 'black', textAlign: 'center' }}> TEE TIMES </h1>
      </div>
      <div className="teeTimesContainer mt-4">
        {teeTimes?.map((teeTime) => (
          <TeeTimeCard key={teeTime.id} teeObj={teeTime} />))}
      </div>
      <div className="footer">
        <p>About Us</p>
        <p>Contact Us</p>
      </div>
    </>
  );
}
