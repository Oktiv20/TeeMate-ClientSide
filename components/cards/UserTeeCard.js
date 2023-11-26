import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { deleteTeeTime, getAllTeeTimes } from '../../api/teeTimeData';

function UserTeeCard({ teeObj, onUpdate }) {
  const deleteThisTeeTime = () => {
    if (window.confirm(`Delete ${teeObj.name}?`)) {
      deleteTeeTime(teeObj.id).then(onUpdate);
    }
  };

  console.log('TeeObj:', teeObj);

  return (
    <div>
      <Card className="teeTimeCard" style={{ width: '20rem' }}>
        <Card.Body>
          <Card.Title className="cardTitle">
            {/* Booked By: {`${bookedByUser?.firstName} ${bookedByUser?.lastName}`} */}
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
          <Button className="tee tee-details-btn" href={`/teeTime/edit/${teeObj.id}`} passHref>
            Edit
          </Button>
          <Button className="tee tee-details-btn" onClick={deleteThisTeeTime} onUpdate={getAllTeeTimes}>Delete</Button>
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
  onUpdate: PropTypes.func.isRequired,
}.isRequired;

export default UserTeeCard;
