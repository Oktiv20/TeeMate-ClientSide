import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleUser } from '../../api/userData';
import RegisterForm from '../../components/forms/RegisterForm';

export default function UpdateUser() {
  const [userObj, setUserObj] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleUser(id).then(setUserObj);
  }, [id]);

  return (
    <div>
      <RegisterForm userObj={userObj} />
    </div>
  );
}
