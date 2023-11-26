import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleTeeTime } from '../../../api/teeTimeData';
import TeeTimeForm from '../../../components/forms/TeeTimeForm';

export default function EditTeeTime() {
  const [editTee, setEditTee] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleTeeTime(id).then(setEditTee);
  }, [id]);

  console.log('editTee:', editTee);

  return (
    <TeeTimeForm teeObj={editTee} />
  );
}
