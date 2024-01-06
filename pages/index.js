/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Button, Card, Image } from 'react-bootstrap';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { checkUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getUserTeeTimes } from '../api/userData';
import RegisterForm from '../components/forms/RegisterForm';
import UserTeeCard from '../components/cards/UserTeeCard';
import { getSingleSkillLevel } from '../api/skillLevelData';

function Home() {
  const [currentUser, setCurrentUser] = useState({});
  const [teeTimes, setTeeTimes] = useState([]);
  const { user } = useAuth();
  const [skillLevel, setSkillLevel] = useState({});

  useEffect(() => {
    checkUser(user?.uid).then((data) => (setCurrentUser(data[0])));
  }, [user?.uid, currentUser]);

  const onUpdate = async () => {
    await checkUser(user?.uid).then(setCurrentUser);
  };

  const userTeeTimes = () => {
    getUserTeeTimes(currentUser?.id).then(setTeeTimes);
  };

  useEffect(() => {
    if (currentUser?.id) {
      getUserTeeTimes(currentUser.id).then(setTeeTimes);
      getSingleSkillLevel(currentUser.skillLevelId).then(setSkillLevel);
    }
  }, [currentUser?.id]);

  return (
    <>
      {currentUser?.uid !== user?.uid ? (
        <RegisterForm onUpdate={onUpdate} />
      ) : (
        <>
          <div style={{
            width: '100', margin: '0', padding: '0',
          }}
          >
            <Image
              src="/Images/grassSky.jpg"
              alt=""
              style={{ width: '100%', maxHeight: '325px', objectFit: 'cover' }}
            />
          </div>
          <div style={{
            position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)',
          }}
          >
            <h1 style={{ color: 'black', textAlign: 'center' }}> MY PROFILE </h1>
          </div>
          <div className="profileSection">
            <Card className="prof">
              <Card.Body>
                <div className="left-content d-flex flex-column align-items-center">
                  <img
                    src={currentUser.profilePic}
                    alt={[currentUser?.firstName, currentUser?.lastName]}
                    style={{
                      width: '9.5rem',
                      height: '9rem',
                      borderRadius: '100%',
                    }}
                  />
                  <h3 className="name" style={{ textAlign: 'center', paddingTop: '10px', paddingBottom: '8px' }}>
                    {currentUser?.firstName} {currentUser?.lastName}
                  </h3>
                </div>
                <div
                  className="right-content"
                  style={{
                    backgroundColor: 'lightgray',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    height: '30%',
                    alignItems: 'flex-start',
                    border: 'black',
                    borderStyle: 'solid',
                    borderWidth: '2px',
                  }}
                >
                  <Card.Text className="info-item"><strong>Age: </strong>{currentUser?.age}</Card.Text>
                  <Card.Text className="info-item"><strong>Handicap: </strong>{currentUser?.handicap}</Card.Text>
                  <Card.Text className="info-item"><strong>Availability: </strong>{currentUser?.availability}</Card.Text>
                  <Card.Text className="info-item"><strong>Preferred Transportation: </strong>{currentUser?.transportation}</Card.Text>
                  <Card.Text className="info-item"><strong>Preferred Clubs: </strong>{currentUser?.clubs}</Card.Text>
                  <Card.Text className="info-item"><strong>Skill Level: </strong>{skillLevel.level}</Card.Text>
                </div>
                <div
                  className="homeButtons"
                  style={{
                    display: 'flex',
                    flexFlow: 'row wrap',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    marginTop: '25px',
                  }}
                >
                  <Link href={`/user/${currentUser.id}`} passHref>
                    <Button className="homeUpdate">
                      Update Profile
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="h1-container">
            <h1 className="teeTimeHeader">MY TEE TIMES</h1>
          </div>
          <div className="d-flex flex-row flex-wrap justify-content-center mt-4">
            {teeTimes.length ? teeTimes.map((teeTime) => (
              <UserTeeCard key={teeTime.id} teeObj={teeTime} onUpdate={userTeeTimes} />
            )) : ('')}
          </div>
          <div
            className="footer"
          >
            <p>About Us</p>
            <p>Contact Us</p>
            {/* Add more filler information as needed */}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
