import { useEffect, useState } from 'react';
import TeeTimeCard from '../components/cards/TeeTimeCard';
import { getAllTeeTimes } from '../api/teeTimeData';

export default function TeeTimes() {
  const [teeTimes, setTeeTime] = useState([]);

  const viewTeeTimes = () => {
    getAllTeeTimes().then(setTeeTime);
  };

  useEffect(() => {
    viewTeeTimes();
  }, []);

  return (
    <div className="d-flex justify-content-between">
      {teeTimes?.map((teeTime) => (
        <TeeTimeCard key={teeTime.id} teeObj={teeTime} />))}
    </div>
  );
}
