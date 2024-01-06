import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Image } from 'react-bootstrap';
import { getAllCourses } from '../api/courseData';
import CourseCard from '../components/cards/CourseCard';

export default function Courses() {
  const [courses, setCourses] = useState([]);

  const viewCourses = () => {
    getAllCourses().then(setCourses);
  };

  useEffect(() => {
    viewCourses();
  }, []);

  return (
    <>
      <div style={{ width: '100%', margin: '0', padding: '0' }}>
        <Image
          src="/Images/grassSky.jpg"
          alt=""
          style={{ width: '100%', maxHeight: '325px', objectFit: 'cover' }}
        />
      </div>
      <div>
        {courses.length > 0 && (
          <Carousel interval={null}>
            {courses.map((course) => (
              <Carousel.Item key={course.id}>
                <CourseCard courseObj={course} />
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </div>
      <div
        className="footer"
      >
        <p>About Us</p>
        <p>Contact Us</p>
        {/* Add more filler information as needed */}
      </div>
    </>
  );
}
