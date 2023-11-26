import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleTeeTime } from '../../../api/teeTimeData';
import TeeTimeForm from '../../../components/forms/TeeTimeForm';

export default function EditTeeTime() {
  const [editTee, setEditTee] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleTeeTime(id).then(setEditTee);
  }, [id]);

  return (<TeeTimeForm teeObj={editTee} />);
}
