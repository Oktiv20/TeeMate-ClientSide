/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getSingleUser } from '../../api/userData';
import RegisterForm from '../../components/forms/RegisterForm';

export default function UpdateUser() {
  const { user } = useAuth();
  const [userObj, setUserObj] = useState({});

  useEffect(() => {
    getSingleUser(user.id).then(setUserObj);
  }, []);

  return (
    <div>
      <RegisterForm userObj={userObj} />
    </div>
  );
}
