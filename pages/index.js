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

function Home() {
  const [currentUser, setCurrentUser] = useState({});
  const [teeTimes, setTeeTimes] = useState([]);
  const { user } = useAuth();

  const userTeeTimes = () => {
    getUserTeeTimes(currentUser?.id).then(setTeeTimes);
  };

  const onUpdate = () => {
    checkUser(user.uid).then(setCurrentUser);
  };

  useEffect(() => {
    checkUser(user?.uid).then((data) => (setCurrentUser(data[0])));
    console.log('User:', currentUser);
  }, []);

  useEffect(() => {
    if (currentUser?.id) {
      getUserTeeTimes(currentUser.id)
        .then(setTeeTimes);
    }
  }, [currentUser?.id]);

  console.log('TeeTimes:', teeTimes);
  return (
    <>
      {currentUser.uid !== user.uid ? (<RegisterForm onUpdate={onUpdate} />) : (
        <>
          <Card className="prof" style={{ width: '25rem' }}>
            <Card.Body className="d-flex flex-column align-items-center">
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
          <div>
            {teeTimes.length ? teeTimes.map((teeTime) => (
              <UserTeeCard key={teeTimes.id} teeObj={teeTime} onUpdate={userTeeTimes} />)) : ('')}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
