// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import TeeTimeCard from '../components/cards/TeeTimeCard';
// // import { getSingleUser } from '../api/userData';
// import { useAuth } from '../utils/context/authContext';
// import { getUserTeeTimes } from '../api/userData';

// export default function UsersTeeTimes() {
//   const router = useRouter();
//   const { userId } = router.query;
//   const { user } = useAuth();
//   const [usersTeeTimes, setUsersTeeTimes] = useState([]);

//   const viewUsersTeeTimes = () => {
//     if (userId) {
//       getUserTeeTimes(userId).then(setUsersTeeTimes);
//     } else {
//       console.error('User ID is undefined');
//     }
//   };

//   useEffect(() => {
//     // viewPlayer();
//     viewUsersTeeTimes();
//   }, [user.id]);

//   return (
//     <div className="d-flex flex-row flex-wrap mt-4">
//       {usersTeeTimes?.map((teeTime) => (
//         <TeeTimeCard key={teeTime.id} teeObj={teeTime} />))}
//     </div>
//   );
// }
