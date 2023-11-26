import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function MemberCard({ userObj }) {
  return (
    <Card className="memCard" style={{ width: '18rem' }}>
      <Card.Img variant="top" style={{ maxWidth: '100%' }} src={userObj.profilePic} alt={`${userObj.firstName} ${userObj.lastName}`} />
      <Card.Body>
        <Card.Title className="memTitle">{`${userObj.firstName} ${userObj.lastName}`}</Card.Title>
        <Card.Text>
          {`Age: ${userObj.age}`}
          <br />
          {`Handicap: ${userObj.handicap}`}
          <br />
          {`Availability: ${userObj.availability}`}
          <br />
          {`Transportation: ${userObj.transportation}`}
          <br />
          {`Clubs: ${userObj.clubs}`}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  userObj: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.string,
    handicap: PropTypes.string,
    availability: PropTypes.string,
    transportation: PropTypes.string,
    clubs: PropTypes.string,
    profilePic: PropTypes.string,
    id: PropTypes.number,
    uid: PropTypes.string,
    teeTimes: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default MemberCard;
