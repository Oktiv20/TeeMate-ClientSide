import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TeeTimeCard from '../../components/cards/TeeTimeCard';
import { getAllTeeTimes } from '../../api/teeTimeData';

export default function UserTeeTime() {
  const router = useRouter();
  const { userId } = router.query;
  const [usersTeeTimes, setUsersTeeTime] = useState([]);

  useEffect(() => {
    if (userId) {
      const userIdNumber = parseInt(userId, 10);
      getAllTeeTimes().then((allTeeTimes) => {
        const filteredTeeTimes = allTeeTimes.filter((teeTime) => teeTime.userId === userIdNumber);
        setUsersTeeTime(filteredTeeTimes);
      });
    }
  }, [userId]);

  return (
    <div className="d-flex flex-row flex-wrap mt-4">
      {usersTeeTimes.map((teeTime) => (
        <TeeTimeCard key={teeTime.id} teeObj={teeTime} />
      ))}
    </div>
  );
}
