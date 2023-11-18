import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getUserById } from '../../api/userData';
import RegisterForm from '../../components/forms/RegisterForm';

export default function UpdateUser() {
  const { user } = useAuth();
  const [userObj, setUserObj] = useState({});

  useEffect(() => {
    getUserById(user.uid).then(setUserObj);
  }, []);

  return (
    <div>
      <RegisterForm userObj={userObj} />
    </div>
  );
}
