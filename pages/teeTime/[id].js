import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getSingleTeeTime } from '../../api/teeTimeData';
import { useAuth } from '../../utils/context/authContext';
import { addUserToTeeTime, deleteUserFromTeeTime, getSingleUser } from '../../api/userData';

export default function ViewSingleTeeTime() {
  const router = useRouter();
  const [teeTimeDetails, setTeeTimeDetails] = useState({});
  const [usersTeeTime, setUsersTeeTime] = useState({});
  const { user } = useAuth();
  const { id } = router.query;
  const [buttonText, setButtonText] = useState('');

  const teeTimes = async () => {
    const teeTimesArray = await getSingleTeeTime(id);
    setTeeTimeDetails(teeTimesArray);
  };

  const buttonCheck = () => {
    const isCurrentUserBooking = teeTimeDetails.users?.some((obj) => obj.id === usersTeeTime.id);

    if (isCurrentUserBooking) {
      setButtonText('Leave Tee Time');
    } else {
      setButtonText('Join Tee Time');
    }
  };

  const handleButtonClick = () => {
    if (buttonText === 'Leave Tee Time') {
      deleteUserFromTeeTime(teeTimeDetails.id, usersTeeTime.id)
        .then(() => {
          teeTimes();
        })
        .catch((error) => {
          console.error('Error leaving tee time:', error);
        });
    } else if (buttonText === 'Join Tee Time') {
      addUserToTeeTime(teeTimeDetails.id, usersTeeTime.id)
        .then(() => {
          teeTimes();
        })
        .catch((error) => {
          console.error('Error joining tee time:', error);
        });
    }
  };

  useEffect(() => {
    if (user && user[0].id) {
      getSingleUser(user[0].id)
        .then(setUsersTeeTime)
        .then(() => {
          teeTimes();
          buttonCheck();
        });
    }
  }, [teeTimeDetails.users, buttonText, user]);

  return (
    <div className="singleTee">
      <Card className="teeTimeCard" style={{ width: '20rem' }}>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">Date: {teeTimeDetails.date}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">Time: {teeTimeDetails.time}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">Location: {teeTimeDetails.location}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">Number of Players: {teeTimeDetails.numOfPlayers}</Card.Subtitle>
        </Card.Body>
        <div>
          <Button type="button" onClick={handleButtonClick}>{buttonText}</Button>
        </div>
      </Card>
    </div>
  );
}
