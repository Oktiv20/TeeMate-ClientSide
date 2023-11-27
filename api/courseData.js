import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllCourses = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/courses`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleCourse = (courseId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/courses/${courseId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAllCourses, getSingleCourse,
};
