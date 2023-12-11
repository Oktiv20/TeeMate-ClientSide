import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllUsers } from '../../api/userData';
import { useAuth } from '../../utils/context/authContext';
import { getSingleCourse } from '../../api/courseData';
import { getSingleSkillLevel } from '../../api/skillLevelData';

function TeeTimeCard({ teeObj }) {
  const [bookedByUser, setBookedByUser] = useState(null);
  const [bookedByUserSkillLevel, setBookedByUserSkillLevel] = useState({});
  const router = useRouter();
  const [courseName, setCourseName] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    getAllUsers(user.id)
      .then((users) => {
        const foundUser = users.find((u) => u.id === teeObj.userId);
        setBookedByUser(foundUser);
        getSingleSkillLevel(foundUser.skillLevelId).then(setBookedByUserSkillLevel);
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
      <Card className="teeTimeCard" style={{ width: '20rem', height: '28rem' }}>
        <Card.Body>
          <Card.Title className="cardTitle">
            Booked By: {`${bookedByUser?.firstName} ${bookedByUser?.lastName}`}
          </Card.Title>
          <Card.Subtitle className="mb-2">Skill Level: {bookedByUserSkillLevel.level}</Card.Subtitle>
          <Card.Subtitle className="mb-2">Course: {courseName.name} </Card.Subtitle>
          <Card.Img src={courseName.image} />
          <Card.Subtitle className="mb-2">Date: {teeObj.date}</Card.Subtitle>
          {/* <Card.Subtitle className="mb-2">Time: {teeObj.time}</Card.Subtitle>
          <Card.Subtitle className="mb-2">Location: {teeObj.location}</Card.Subtitle> */}
          <Card.Subtitle className="mb-2">
            Number of Players Needed: {teeObj.numOfPlayers === 0 ? 'Tee Time Full' : teeObj.numOfPlayers}
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
