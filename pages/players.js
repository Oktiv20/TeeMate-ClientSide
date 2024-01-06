import { useEffect, useState } from 'react';
import { Form, Image } from 'react-bootstrap';
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
  };

  const filteredPlayers = selectedSkill
    ? players.filter((player) => player.skillLevel && player.skillLevel.level === selectedSkill)
    : players;

  return (
    <>
      <div style={{
        margin: '0', padding: '0',
      }}
      >
        <Image
          src="/Images/grassSky.jpg"
          alt=""
          style={{ width: '100%', maxHeight: '325px', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)',
        }}
        >
          <h1 style={{ color: 'black', textAlign: 'center' }}>FILTER PLAYERS</h1>
          <Form style={{
            maxWidth: '300px', margin: '0 auto', color: 'black',
          }}
          >
            <Form.Select
              value={selectedSkill}
              onChange={handleSkillChange}
              placeholder="Skill Level"
              label="Skill Level"
            >
              <option value="">All Skill Levels</option>
              {playersSkill.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Form>
        </div>
      </div>
      <div className="playersContainer mt-4">
        {filteredPlayers.length > 0
          ? filteredPlayers.map((player) => <MemberCard key={player.id} userObj={player} />)
          : players.map((player) => <MemberCard key={player.id} userObj={player} />)}
      </div>
      <div
        className="footer"
      >
        <p>About Us</p>
        <p>Contact Us</p>
      </div>
    </>
  );
}
