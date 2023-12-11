/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { checkUser, signOut } from '../utils/auth';
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
      {currentUser?.uid !== user?.uid ? (<RegisterForm onUpdate={onUpdate} />) : (
        <>
          <Card className="prof" style={{ width: '25rem' }}>
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <div>
                <img
                  src={currentUser.profilePic}
                  alt={[currentUser?.firstName, currentUser?.lastName]}
                  style={{ width: '20rem' }}
                />
              </div>
              <div className="profileRight">
                <div className="profileInfo profile">
                  <h3>
                    {currentUser?.firstName} {currentUser?.lastName}
                  </h3>
                  <p>Age: {currentUser?.age}</p>
                  <p>Handicap: {currentUser?.handicap}</p>
                  <p>Availability: {currentUser?.availability}</p>
                  <p>Preferred Transportation: {currentUser?.transportation}</p>
                  <p>Preferred Clubs: {currentUser?.clubs}</p>
                  <p>Skill Level: {skillLevel.level}</p>
                </div>
                <div className="homeButtons profile">
                  <Link href={`/user/${currentUser.id}`} passHref>
                    <Button className="homeUpdate" variant="info">
                      Update Profile
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    type="button"
                    size="md"
                    className="copy-btn homeSO"
                    onClick={signOut}
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
          <h1>MY TEE TIMES</h1>
          <div className="d-flex flex-row flex-wrap mt-4">
            {teeTimes.length ? teeTimes.map((teeTime) => (
              <UserTeeCard key={teeTime.id} teeObj={teeTime} onUpdate={userTeeTimes} />)) : ('')}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
