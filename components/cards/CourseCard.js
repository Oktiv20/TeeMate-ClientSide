import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function CourseCard({ courseObj }) {
  return (
    <div className="d-flex flex-row justify-content-center">
      <Card
        className="courseCard"
        style={{
          width: '25rem',
          height: '30rem',
          marginBottom: '30px',
          marginRight: '35px',
          backgroundColor: 'lightgray',
          boxShadow: '3px 5px 15px 2px rgba(1, 1, 1, 1)',
          borderRadius: '8px',
        }}
      >
        <Card.Img
          variant="top"
          src={courseObj.image}
          style={{
            height: '16rem', width: '25rem', borderRadius: '2px',
          }}
        />
        <Card.Body>
          <Card.Title className="cardTitle" style={{ marginBottom: '35px', textAlign: 'center', fontSize: '1.4rem' }}>
            {`${courseObj?.name}`}
            <hr style={{ borderWidth: '3px', borderColor: 'black', opacity: '0.7' }} />
          </Card.Title>
          <Card.Subtitle className="mb-2" style={{ textAlign: 'center', fontSize: '1.2rem' }}>
            Location: {courseObj.location}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2" style={{ textAlign: 'center', fontSize: '1.2rem' }}>
            Par: {courseObj.par}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2" style={{ textAlign: 'center', fontSize: '1.2rem' }}>
            Hole Count: {courseObj.holeCount}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2" style={{ textAlign: 'center', fontSize: '1.2rem' }}>
            Cost: ${courseObj.cost}/Round
          </Card.Subtitle>
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
