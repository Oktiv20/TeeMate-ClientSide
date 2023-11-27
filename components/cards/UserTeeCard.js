import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { deleteTeeTime } from '../../api/teeTimeData';
import { getSingleCourse } from '../../api/courseData';

function UserTeeCard({ teeObj, onUpdate }) {
  const router = useRouter();
  const [courseName, setCourseName] = useState([]);

  const deleteThisTeeTime = () => {
    if (window.confirm(`Delete This Booking On ${teeObj.date}?`)) {
      deleteTeeTime(teeObj?.id).then(() => {
        onUpdate();
      });
    }
  };

  useEffect(() => {
    getSingleCourse(teeObj.courseId).then(setCourseName);
  }, [teeObj.courseId]);

  const handleDetailsClick = () => {
    router.push(`/teeTime/${teeObj.id}`);
  };

  const handleEditClick = () => {
    router.push(`/teeTime/edit/${teeObj.id}`);
  };

  return (
    <div className="align-content-center">
      <Card className="teeTimeCard" style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Title className="mb-2">Course: {courseName.name} </Card.Title>
          <Card.Subtitle className="mb-2">Date: {teeObj.date}</Card.Subtitle>
          <Card.Subtitle className="mb-2">Time: {teeObj.time}</Card.Subtitle>
          <Card.Subtitle className="mb-2">Location: {teeObj.location}</Card.Subtitle>
          <Card.Subtitle className="mb-2">
            Number of Players: {teeObj.numOfPlayers}
          </Card.Subtitle>
        </Card.Body>
        <div className="cardBtns">
          <Button className="tee tee-details-btn" onClick={handleDetailsClick}>
            Details
          </Button>
          <Button className="tee edit-tee-btn" onClick={handleEditClick}>
            Edit
          </Button>
          <Button className="tee tee-details-btn" onClick={deleteThisTeeTime}>Delete</Button>
        </div>
      </Card>
    </div>
  );
}

UserTeeCard.propTypes = {
  teeObj: PropTypes.shape({
    date: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.string,
    numOfPlayers: PropTypes.string,
    id: PropTypes.number,
    userId: PropTypes.number,
  }),
  courseObj: PropTypes.shape({
    name: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
}.isRequired;

export default UserTeeCard;
