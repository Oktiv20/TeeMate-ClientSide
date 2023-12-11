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
    <div className="d-flex flex-row flex-wrap mt-4">
      {teeTimes?.map((teeTime) => (
        <TeeTimeCard key={teeTime.id} teeObj={teeTime} />))}
    </div>
  );
}
