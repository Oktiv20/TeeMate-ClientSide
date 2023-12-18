import { useEffect, useState } from 'react';
import TeeTimeCard from '../components/cards/TeeTimeCard';
import { getAllTeeTimes } from '../api/teeTimeData';
import { getAllUsers } from '../api/userData';

export default function TeeTimes() {
  const [teeTimes, setTeeTime] = useState([]);
  const [players, setPlayers] = useState([]);

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

  console.log('Players:', players);

  return (
    <div className="d-flex flex-row flex-wrap mt-4">
      {teeTimes?.map((teeTime) => (
        <TeeTimeCard key={teeTime.id} teeObj={teeTime} />))}
    </div>
  );
}
