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
    <Card
      className="playerTeeTimeCard"
      style={{
        width: '18rem',
        height: '28rem',
        margin: '20px',
        alignItems: 'center',
        background: 'linear-gradient(#f8f8f8, #fff)',
        boxShadow: '0 2px 10px rgba(1, 1, 1, 1)',
        borderRadius: '6px',
      }}
    >
      <Card.Img src={courseName.image} style={{ height: '200px', width: '18rem' }} />
      <Card.Body>
        <Card.Title
          className="cardTitle"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {`${bookedByUser?.firstName} ${bookedByUser?.lastName}`}
        </Card.Title>
        <Card.Subtitle className="userInfo">Skill Level: {bookedByUserSkillLevel.level}</Card.Subtitle>
        <Card.Subtitle className="userInfo">Course: {courseName.name} </Card.Subtitle>
        <Card.Subtitle className="userInfo">Date: {teeObj.date}</Card.Subtitle>
        <Card.Subtitle className="userInfo">
          Players Needed: {teeObj.numOfPlayers === 0 ? 'Tee Time Full' : teeObj.numOfPlayers}
        </Card.Subtitle>
      </Card.Body>
      <div className="d-flex flex-column justify-content-end mt-4">
        <div className="d-flex justify-content-center">
          <Button className="teeTimesBtnTeeCard" onClick={handleDetailsClick}>
            Details
          </Button>
        </div>
      </div>
    </Card>
  );
}

TeeTimeCard.propTypes = {
  teeObj: PropTypes.shape({
    date: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.string,
    numOfPlayers: PropTypes.string,
    id: PropTypes.number,
    skillLevel: PropTypes.string,
    userId: PropTypes.number,
  }),
  onUpdate: PropTypes.func.isRequired,
}.isRequired;

export default TeeTimeCard;
