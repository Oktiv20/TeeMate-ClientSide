import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createTeeTime, updateTeeTime } from '../../api/teeTimeData';
import { useAuth } from '../../utils/context/authContext';
import { checkUser } from '../../utils/auth';
import { getAllCourses } from '../../api/courseData';

const initialState = {
  date: '',
  time: '',
  location: '',
  numOfPlayers: 0,
  courseId: '',
};

function TeeTimeForm({ teeObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [, setUser] = useState({});
  const [courses, setCourses] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    checkUser(user.uid).then(setUser);
  }, [user]);

  useEffect(() => {
    setFormInput(teeObj);
  }, [teeObj]);

  useEffect(() => {
    getAllCourses().then(setCourses);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (teeObj?.id) {
      updateTeeTime(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, userId: user[0].id };
      createTeeTime(payload, user[0].id).then(() => router.push('/'));
    }
  };

  return (
    <>
      <h3 className="formTitle">{teeObj?.id ? 'Update' : 'Create'} Tee Time</h3>
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
              placeholder="HH:mm am/pm"
              value={formInput.time}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLocation">
            <Form.Label>Location</Form.Label>
            <Form.Select
              name="location"
              value={formInput.location}
              onChange={handleChange}
              required
            >
              <option value="">
                Select a city
              </option>
              <option value="Nashville, TN">Nashville, TN</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicNumOfPlayers">
            <Form.Label>Number of Players Needed</Form.Label>
            <Form.Select
              name="numOfPlayers"
              value={formInput.numOfPlayers}
              onChange={handleChange}
              required
            >
              <option value="">
                Select a number
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Course</Form.Label>
            <Form.Select
              aria-label="Course"
              name="courseId"
              onChange={handleChange}
              className="mb-3"
              value={formInput.courseId}
              required
            >
              <option value="">
                Select a Course
              </option>
              {
            courses.map((course) => (
              <option
                key={course.id}
                value={course.id}
              >
                {course.name}
              </option>
            ))
          }
            </Form.Select>
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
    courseId: PropTypes.string,
  }),
};

TeeTimeForm.defaultProps = {
  teeObj: initialState,
};

export default TeeTimeForm;
