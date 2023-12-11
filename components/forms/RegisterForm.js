import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createUser, updateUser } from '../../api/userData';
import { getAllSkillLevels } from '../../api/skillLevelData';

const initialState = {
  firstName: '',
  lastName: '',
  age: '',
  handicap: '',
  availability: '',
  transportation: '',
  clubs: '',
  skillLevelId: 0,
  profilePic: '',
};

function RegisterForm({ userObj, onUpdate }) {
  const router = useRouter();
  const { user } = useAuth();
  const [skillLevels, setSkillLevel] = useState([]);
  const [isMounted, setIsMounted] = useState(true);

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (userObj?.id) setFormData(userObj);
  }, [userObj]);

  useEffect(() => {
    getAllSkillLevels().then((levels) => {
      if (isMounted) {
        setSkillLevel(levels);
      }
    });

    return () => {
      setIsMounted(false);
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userObj?.id) {
      updateUser(formData).then(() => router.push('/'));
    } else {
      createUser({ ...formData, uid: user.uid })
        .then(onUpdate)
        .then(() => router.push('/'));
    }
  };

  return (
    <Form className="forms" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={formData.firstName}
          placeholder="Enter your First Name"
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={formData.lastName}
          placeholder="Enter your Last Name"
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAge">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="text"
          name="age"
          value={formData.age}
          placeholder="Enter your Age"
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicHandicap">
        <Form.Label>Handicap</Form.Label>
        <Form.Control
          type="text"
          name="handicap"
          value={formData.handicap}
          placeholder="Enter your Handicap"
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAvailability">
        <Form.Label>Availability</Form.Label>
        <Form.Select
          type="text"
          name="availability"
          value={formData.availability}
          placeholder="Enter your Availability"
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        >
          <option value="" disabled>
            Select your preferred availability
          </option>
          <option value="Weekdays">Weekdays</option>
          <option value="Weekends">Weekends</option>
          <option value="Anytime">Anytime</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicTransportation">
        <Form.Label>Transportation Preference</Form.Label>
        <Form.Select
          name="transportation"
          value={formData.transportation}
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        >
          <option value="" disabled>
            Select your preferred method of transportation
          </option>
          <option value="Cart">Cart</option>
          <option value="Walking">Walking</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicClubs">
        <Form.Label>Preferred Clubs</Form.Label>
        <Form.Control
          type="text"
          name="clubs"
          value={formData.clubs}
          placeholder="Enter your preferred clubs of choice"
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>SkillLevel</Form.Label>
        <Form.Select
          aria-label="SkillLevel"
          name="skillLevelId"
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
          className="mb-3"
          value={formData.skillLevelId}
          required
        >
          <option value="">Select a Skill Level</option>
          {
            skillLevels.map((skillLevel) => (
              <option
                key={skillLevel.id}
                value={skillLevel.id}
              >
                {skillLevel.level}
              </option>
            ))
          }
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhoto">
        <Form.Label>Profile Image</Form.Label>
        <Form.Control
          type="text"
          name="profilePic"
          value={formData.profilePic}
          placeholder="Enter your Profile Image Url"
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {userObj.id ? 'Update Profile' : 'Create Profile'}
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  userObj: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.string,
    handicap: PropTypes.string,
    availability: PropTypes.string,
    transportation: PropTypes.string,
    clubs: PropTypes.string,
    skillLevelId: PropTypes.number,
    profilePic: PropTypes.string,
    id: PropTypes.number,
    uid: PropTypes.string,
    teeTimes: PropTypes.arrayOf(PropTypes.string),
  }),
  onUpdate: PropTypes.func.isRequired,
};
RegisterForm.defaultProps = {
  userObj: initialState,
};

export default RegisterForm;
