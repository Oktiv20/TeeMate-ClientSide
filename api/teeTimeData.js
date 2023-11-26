import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllTeeTimes = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/teeTimes`, {
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

const getSingleTeeTime = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/teeTimes/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createTeeTime = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/teeTimes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const updateTeeTime = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/teeTimes/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteTeeTime = (teeTimeId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/teeTimes/${teeTimeId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

export {
  getAllTeeTimes, getSingleTeeTime, createTeeTime, updateTeeTime, deleteTeeTime,
};
