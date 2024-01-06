import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
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
        <h1 style={{ color: 'black', textAlign: 'center' }}> JOINED TEE TIMES </h1>
      </div>
      <div className="d-flex flex-row flex-wrap mt-4 justify-content-center">
        {userJoinedTeeTimes.map((teeTime) => (
          <TeeTimeCard key={teeTime.id} teeObj={teeTime} />
        ))}
      </div>
      <div
        className="footer"
      >
        <p>About Us</p>
        <p>Contact Us</p>
        {/* Add more filler information as needed */}
      </div>
    </>
  );
}
