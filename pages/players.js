import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { getAllUsers } from '../api/userData';
import MemberCard from '../components/cards/UserCard';
import { getAllSkillLevels } from '../api/skillLevelData';

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');

  const playersSkill = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Recreational', label: 'Recreational' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
    { value: 'Professional', label: 'Professional' },
  ];

  const viewPlayers = () => {
    getAllUsers().then((users) => {
      console.log('Retrieved Users:', users);
      setPlayers(users);
    });
  };

  const viewSkillLevels = () => {
    getAllSkillLevels().then(setSelectedSkill);
  };

  useEffect(() => {
    viewPlayers();
    viewSkillLevels();
  }, []);

  const handleSkillChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedSkill(selectedOption);
    console.log('SelectedOption:', selectedOption);
  };

  const filteredPlayers = selectedSkill
    ? players.filter((player) => player.skillLevel && player.skillLevel.level === selectedSkill)
    : players;

  return (
    <>
      <Form>
        <Form.Select
          value={selectedSkill}
          onChange={handleSkillChange}
          style={{ color: 'black' }}
          placeholder="Filter Players"
          label="Filter Players"
        >
          <option value="">All</option>
          {playersSkill.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
      </Form>
      <div className="d-flex flex-row flex-wrap mt-4">
        {filteredPlayers.length > 0
          ? filteredPlayers.map((player) => <MemberCard key={player.id} userObj={player} />)
          : players.map((player) => <MemberCard key={player.id} userObj={player} />)}
      </div>
    </>
  );
}
