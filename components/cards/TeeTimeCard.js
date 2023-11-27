import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllUsers } from '../../api/userData';
import { useAuth } from '../../utils/context/authContext';
import { getSingleCourse } from '../../api/courseData';

function TeeTimeCard({ teeObj }) {
  const [bookedByUser, setBookedByUser] = useState(null);
  const router = useRouter();
  const [courseName, setCourseName] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    getAllUsers(user.id)
      .then((users) => {
        const foundUser = users.find((u) => u.id === teeObj.userId);
        setBookedByUser(foundUser);
        console.log('Tee card User:', user.id);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, [teeObj.userId, user]);

  useEffect(() => {
    getSingleCourse(teeObj.courseId).then(setCourseName);
  }, [teeObj.courseId]);

  const handleDetailsClick = () => {
    router.push(`/teeTime/${teeObj.id}`);
  };

  return (
    <div>
      <Card className="teeTimeCard" style={{ width: '20rem' }}>
        <Card.Body>
          <Card.Title className="cardTitle">
            Booked By: {`${bookedByUser?.firstName} ${bookedByUser?.lastName}`}
          </Card.Title>
          <Card.Subtitle className="mb-2">Course: {courseName.name} </Card.Subtitle>
          <Card.Subtitle className="mb-2">Date: {teeObj.date}</Card.Subtitle>
          <Card.Subtitle className="mb-2">Time: {teeObj.time}</Card.Subtitle>
          <Card.Subtitle className="mb-2">Location: {teeObj.location}</Card.Subtitle>
          <Card.Subtitle className="mb-2">
            Number of Players: {teeObj.numOfPlayers}
          </Card.Subtitle>
        </Card.Body>
        <div className="d-flex flex-column justify-content-end">
          <div className="d-flex justify-content-center">
            <Button className="tee tee-details-btn" onClick={handleDetailsClick}>
              Details
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

TeeTimeCard.propTypes = {
  teeObj: PropTypes.shape({
    date: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.string,
    numOfPlayers: PropTypes.string,
    id: PropTypes.number,
    userId: PropTypes.number,
  }),
  onUpdate: PropTypes.func.isRequired,
}.isRequired;

export default TeeTimeCard;
