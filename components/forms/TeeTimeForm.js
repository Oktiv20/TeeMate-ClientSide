import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createTeeTime, updateTeeTime } from '../../api/teeTimeData';
import { useAuth } from '../../utils/context/authContext';
import { checkUser } from '../../utils/auth';

const initialState = {
  date: '',
  time: '',
  location: '',
  numOfPlayers: 0,
  courseId: 1,
};

function TeeTimeForm({ teeObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [, setUser] = useState({});
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    checkUser(user.uid).then(setUser);
  }, [user]);

  console.log('User:', user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => (
      { ...prevState, [name]: value }
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const userData = await checkUser(user.uid);

      if (teeObj.id) {
        setFormInput((prevState) => ({ ...prevState, userId: user[0].id }));
        await updateTeeTime(formInput);
      } else {
        const payload = { ...formInput, userId: user[0].id };
        console.log('Payload:', payload);
        await createTeeTime(payload);
      }

      router.push('/');
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <>
      <h3 className="formTitle">{teeObj.id ? 'Update' : 'Create'} Tee Time</h3>
      <div>
        <Form className="forms" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Choose Date:</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formInput.date}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Choose Time:</Form.Label>
            <Form.Control
              type="text"
              name="time"
              value={formInput.time}
              onChange={handleChange}
            />
          </Form.Group>
          {/* <Form.Group className="mb-3">
            <Form.Label>Time</Form.Label>
            <Form.Control type="text" name="time" value={formInput.time} onChange={handleChange} required />
          </Form.Group> */}
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" name="location" value={formInput.location} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Number of players</Form.Label>
            <Form.Control type="text" name="numOfPlayers" value={formInput.numOfPlayers} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            {/* <Form.Label>Category</Form.Label>
            <Form.Select
              aria-label="Category"
              name="categoryId"
              onChange={handleChange}
              className="mb-3"
              value={formInput.categoryId}
              required
            >
              <option value="">Select a Category</option>
              {
            categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.type}
              </option>
            ))
          }
            </Form.Select> */}
          </Form.Group>
          <Button variant="primary" type="submit">
            {teeObj.id ? 'Update' : 'Create'} Tee Time
          </Button>
        </Form>
      </div>
    </>
  );
}

TeeTimeForm.propTypes = {
  teeObj: PropTypes.shape({
    id: PropTypes.number,
    date: PropTypes.string,
    location: PropTypes.string,
    numOfPlayers: PropTypes.number,
    userId: PropTypes.number,
    courseId: PropTypes.number,
  }),
};

TeeTimeForm.defaultProps = {
  teeObj: initialState,
};

export default TeeTimeForm;
