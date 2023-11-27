import React, { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function CourseCard({ courseObj }) {
  return (
    <div>
      <Card
        className="teeTimeCard"
        style={{
          width: '20rem', height: '25rem', marginBottom: '30px', marginRight: '100px',
        }}
      >
        <Card.Img variant="top" src={courseObj.image} style={{ height: '15rem' }} />
        <Card.Body>
          <Card.Title className="cardTitle">
            {`${courseObj?.name}`}
          </Card.Title>
          <Card.Subtitle className="mb-2">Location: {courseObj.location}</Card.Subtitle>
          <Card.Subtitle className="mb-2">Par: {courseObj.par}</Card.Subtitle>
          <Card.Subtitle className="mb-2">Hole Count: {courseObj.holeCount}</Card.Subtitle>
          <Card.Subtitle className="mb-2">Cost: ${courseObj.cost}/Round</Card.Subtitle>
        </Card.Body>
      </Card>
    </div>
  );
}

CourseCard.propTypes = {
  courseObj: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    par: PropTypes.number,
    holeCount: PropTypes.number,
    cost: PropTypes.number,
    image: PropTypes.string,
  }),
}.isRequired;

export default CourseCard;
