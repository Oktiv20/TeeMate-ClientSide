import { useEffect, useState } from 'react';
import { getAllUsers } from '../api/userData';
import MemberCard from '../components/cards/UserCard';

export default function Players() {
  const [players, setPlayers] = useState([]);

  const viewPlayers = () => {
    getAllUsers().then(setPlayers);
  };

  useEffect(() => {
    viewPlayers();
  }, []);

  return (
    <div className="d-flex flex-row flex-wrap mt-4">
      {players?.map((player) => (
        <MemberCard key={player.id} userObj={player} />))}
    </div>
  );
}
