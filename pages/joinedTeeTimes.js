import { useEffect, useState } from 'react';
import TeeTimeCard from '../components/cards/TeeTimeCard';
import { getAllTeeTimes } from '../api/teeTimeData';
import { useAuth } from '../utils/context/authContext';

export default function JoinedTeeTimes() {
  const [userJoinedTeeTimes, setUserJoinedTeeTimes] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const viewTeeTimes = async () => {
      try {
        const allTeeTimes = await getAllTeeTimes();
        const currentUser = user[0];
        const joinedTeeTimes = allTeeTimes.filter((teeTime) => {
          const userJoined = teeTime.users && teeTime.users?.find((teeUser) => teeUser.id === currentUser?.id);
          return teeTime.userId !== currentUser?.id && userJoined;
        });
        setUserJoinedTeeTimes(joinedTeeTimes);
      } catch (error) {
        console.error('Error fetching tee times:', error);
      }
    };

    viewTeeTimes();
  }, [user]);

  return (
    <>
      <h2>Joined Tee Times</h2>
      <div className="d-flex flex-row flex-wrap mt-4">
        {userJoinedTeeTimes.map((teeTime) => (
          <TeeTimeCard key={teeTime.id} teeObj={teeTime} />
        ))}
      </div>
    </>
  );
}
