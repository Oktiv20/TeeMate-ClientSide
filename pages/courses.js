import { useState, useEffect } from 'react';
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
    <div className="d-flex flex-row flex-wrap mt-4">
      {courses?.map((course) => (
        <CourseCard key={course.id} courseObj={course} />))}
    </div>
  );
}
