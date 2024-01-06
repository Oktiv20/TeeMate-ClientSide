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

  // const handleDetailsClick = () => {
  //   router.push(`/teeTime/${teeObj.id}`);
  // };

  const handleEditClick = () => {
    router.push(`/teeTime/edit/${teeObj.id}`);
  };

  return (
    <div className="teeTimeCard-wrapper">
      <Card
        className="teeTimeCard"
        onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
        onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
      >
        <div className="card-inner">
          <div className="front">
            <Card.Img src={courseName.image} alt={courseName.name} style={{ height: '229.5px', width: '248.5px' }} />
            <div className="inner">
              <Card.Title>{courseName.name}</Card.Title>
            </div>
          </div>
          <div className="back">
            <Card.Body>
              {/* <Card.Img src={courseName.image} style={{ height: '140px' }} /> */}
              <Card.Subtitle>{courseName.name}</Card.Subtitle>
              <hr />
              <Card.Subtitle className="mb-2">Date: {teeObj.date}</Card.Subtitle>
              <Card.Subtitle className="mb-2">Time: {teeObj.time}</Card.Subtitle>
              <Card.Subtitle className="mb-2">Location: {teeObj.location}</Card.Subtitle>
              <Card.Subtitle className="mb-2">Number of Players Needed: {teeObj.numOfPlayers}</Card.Subtitle>
              <div className="cardBtns">
                <Button className="tee edit-tee-btn" onClick={handleEditClick}>
                  Edit
                </Button>
                <Button className="tee tee-details-btn" onClick={deleteThisTeeTime}>
                  Delete
                </Button>
              </div>
            </Card.Body>
          </div>
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
    image: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
}.isRequired;

export default UserTeeCard;
