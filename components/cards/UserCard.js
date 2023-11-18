// import React from 'react';
// import { Card } from 'react-bootstrap';
// import PropTypes from 'prop-types';

// function MemberCard({ userObj }) {
//   return (
//     <>
//       <Card className="memCard" style={{ width: '18rem' }}>
//         <Card.Img variant="top" src={userObj.profilePic} alt={[userObj.firstName, userObj.lastName]} />
//         <Card.Body>
//           <Card.Title className="memTitle">{userObj.firstName} {userObj.lastName}</Card.Title>
//           <Card.Text>
//             <p>{userObj.age}</p>
//             <p>{userObj.handicap}</p>
//             <p>{userObj.availability}</p>
//             <p>{userObj.transportation}</p>
//             <p>{userObj.clubs}</p>
//           </Card.Text>
//         </Card.Body>
//       </Card>
//     </>
//   );
// }

// MemberCard.propTypes = {
//   userObj: PropTypes.shape({
//     firstName: PropTypes.string,
//     lastName: PropTypes.string,
//     age: PropTypes.string,
//     handicap: PropTypes.string,
//     availability: PropTypes.string,
//     transportation: PropTypes.string,
//     clubs: PropTypes.string,
//     profilePic: PropTypes.string,
//     id: PropTypes.number,
//     uid: PropTypes.string,
//     teeTimes: PropTypes.arrayOf(PropTypes.string),
//   }).isRequired,
// };

// export default MemberCard;
