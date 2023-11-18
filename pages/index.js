/* eslint-disable @next/next/no-img-element */
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { checkUser, signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getUserById } from '../api/userData';
import RegisterForm from '../components/forms/RegisterForm';

function Home() {
  const [currentUser, setCurrentUser] = useState([]);
  const { user } = useAuth();

  const onUpdate = () => {
    checkUser(user.uid).then(setCurrentUser);
  };

  useEffect(() => {
    getUserById(user.uid).then(setCurrentUser);
  }, [currentUser]);

  return (
    <>
      {currentUser.uid !== user.uid ? (
        <RegisterForm onUpdate={onUpdate} />
      ) : (
        <Card className="prof" style={{ width: '25rem' }}>
          <Card.Body className="d-flex flex-column align-items-center">
            <div>
              <img
                src={currentUser.profilePic}
                alt={[currentUser?.firstName, currentUser.lastName]}
                style={{ width: 'auto' }}
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
      )}
    </>
  );
}

export default Home;
