import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../api/userData';
import { useAuth } from '../../utils/context/authContext';

function TeeTimeCard({ teeObj }) {
  const [bookedByUser, setBookedByUser] = useState(null);
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

  return (
    <div>
      <Card className="teeTimeCard" style={{ width: '20rem' }}>
        <Card.Body>
          <Card.Title className="cardTitle">
            Booked By: {`${bookedByUser?.firstName} ${bookedByUser?.lastName}`}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Date: {teeObj.date}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">Time: {teeObj.time}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">Location: {teeObj.location}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            Number of Players: {teeObj.numOfPlayers}
          </Card.Subtitle>
        </Card.Body>
        <div className="cardBtns">
          <Button className="tee tee-details-btn" href={`/teeTime/${teeObj.id}`} passHref>
            Details
          </Button>
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
