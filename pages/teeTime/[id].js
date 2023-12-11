/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getSingleTeeTime } from '../../api/teeTimeData';
import { useAuth } from '../../utils/context/authContext';
import { addUserToTeeTime, deleteUserFromTeeTime, getSingleUser } from '../../api/userData';
import { getSingleCourse } from '../../api/courseData';

export default function ViewSingleTeeTime() {
  const router = useRouter();
  const [teeTimeDetails, setTeeTimeDetails] = useState({});
  const [, setUsersTeeTime] = useState({});
  const { user } = useAuth();
  const { id } = router.query;
  const [buttonText, setButtonText] = useState('');
  const [courseName, setCourseName] = useState([]);

  const teeTimes = () => {
    getSingleTeeTime(id)
      .then((teeTimesArray) => {
        setTeeTimeDetails(teeTimesArray);
      })
      .catch((error) => {
        console.error('Error fetching tee time:', error);
      });
  };

  const buttonCheck = () => {
    const isCurrentUserBooking = teeTimeDetails.users?.some((obj) => obj.id === user[0].id);
    const teeTimeCreator = teeTimeDetails.userId === user[0].id;

    if (isCurrentUserBooking || teeTimeCreator) {
      const lastUserJoined = teeTimeDetails.users?.[teeTimeDetails.users.length - 1]?.id === user[0].id;

      if (lastUserJoined) {
        if (teeTimeDetails.numOfPlayers === 0) {
          setButtonText('Leave Tee Time');
          return;
        }
      }
      setButtonText('Leave Tee Time');
    } else {
      setButtonText(teeTimeDetails.numOfPlayers > 0 ? 'Join Tee Time' : '');
    }
  };

  const handleButtonClick = () => {
    if (buttonText === 'Leave Tee Time') {
      deleteUserFromTeeTime(teeTimeDetails.id, user[0].id)
        .then(() => {
          teeTimes();
        })
        .catch((error) => {
          console.error('Error leaving tee time:', error);
        });
    } else if (buttonText === 'Join Tee Time') {
      addUserToTeeTime(teeTimeDetails.id, user[0].id)
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
  }, [teeTimeDetails.numOfPlayers]);

  useEffect(() => {
    if (teeTimeDetails.courseId) {
      getSingleCourse(teeTimeDetails.courseId).then(setCourseName);
    }
  }, [teeTimeDetails.courseId]);

  return (
    <div className="singleTee">
      <Card className="teeTimeCard" style={{ width: '20rem' }}>
        <Card.Body>
          <Card.Title className="mb-2">Course: {courseName.name} </Card.Title>
          <Card.Img src={courseName.image} />
          <hr />
          <Card.Subtitle className="mb-2">Date: {teeTimeDetails.date}</Card.Subtitle>
          <Card.Subtitle className="mb-2">Time: {teeTimeDetails.time}</Card.Subtitle>
          <Card.Subtitle className="mb-2">Location: {teeTimeDetails.location}</Card.Subtitle>
          {teeTimeDetails.numOfPlayers > 0 ? (
            <Card.Subtitle className="mb-2">Number of Players Needed: {teeTimeDetails.numOfPlayers}</Card.Subtitle>
          ) : (
            <Card.Subtitle className="mb-2">Number of Players Needed: Tee Time Full</Card.Subtitle>
          )}
        </Card.Body>
        <div>
          {buttonText !== 'Tee Time Full' && buttonText !== '' && (
            <Button type="button" onClick={handleButtonClick}>
              {buttonText}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
