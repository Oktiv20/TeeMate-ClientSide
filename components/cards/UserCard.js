import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { getSingleSkillLevel } from '../../api/skillLevelData';

function MemberCard({ userObj }) {
  const router = useRouter();
  const [skillLevel, setSkillLevel] = useState({});

  useEffect(() => {
    getSingleSkillLevel(userObj.skillLevelId).then(setSkillLevel);
  }, [userObj.skillLevelId]);

  const handleTeeTimes = () => {
    router.push({
      pathname: `/userTeeTime/${userObj.id}`,
      query: { userId: userObj.id },
    });
  };

  return (
    <Card
      className="memCard"
      style={{
        width: '18rem',
        height: '29rem',
        margin: '20px',
        alignItems: 'center',
        background: 'linear-gradient(#f8f8f8, #fff)',
        boxShadow: '0 2px 10px rgba(1, 1, 1, 1)',
        borderRadius: '6px',
      }}
    >
      <Card.Img variant="top" src={userObj.profilePic} alt={`${userObj.firstName} ${userObj.lastName}`} style={{ height: '12rem' }} />
      <Card.Body>
        <Card.Title className="memTitle">{`${userObj.firstName} ${userObj.lastName}`}</Card.Title>
        <Card.Text style={{ marginBottom: '25px' }}>
          {`Age: ${userObj.age}`}
          <br />
          {`Handicap: ${userObj.handicap}`}
          <br />
          {`Availability: ${userObj.availability}`}
          <br />
          {`Transportation: ${userObj.transportation}`}
          <br />
          {`Clubs: ${userObj.clubs}`}
          <br />
          {`Skill Level: ${skillLevel.level}`}
        </Card.Text>
        <Button className="teeTimesBtn" onClick={handleTeeTimes}>View Tee Times</Button>
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  userObj: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.number,
    handicap: PropTypes.string,
    availability: PropTypes.string,
    transportation: PropTypes.string,
    clubs: PropTypes.string,
    skillLevelId: PropTypes.number,
    profilePic: PropTypes.string,
    id: PropTypes.number,
    uid: PropTypes.string,
    teeTimes: PropTypes.arrayOf(PropTypes.shape),
  }).isRequired,
};

export default MemberCard;
