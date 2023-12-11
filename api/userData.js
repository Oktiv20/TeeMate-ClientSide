import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllUsers = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/users`, {
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

// const getUserByUid = (uid) => new Promise((resolve, reject) => {
//   fetch(`${endpoint}/api/user/${uid}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => resolve(data))
//     .catch(reject);
// });

const getSingleUser = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

const createUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const updateUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/users/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const getUserTeeTimes = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/teeTimeUsers/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

const addUserToTeeTime = (teeTimeId, userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/teeTimeUser/${teeTimeId}/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

// Create Tee Time and add user to it
const createTeeTimeAndAddUser = (payload, userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/teeTimes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to create tee time');
      }
      return response.json();
    })
    .then((teeTime) => {
      addUserToTeeTime(teeTime.id, userId)
        .then(() => {
          resolve(teeTime);
        })
        .catch((error) => {
          console.error('Error adding user to tee time:', error);
          reject(error);
        });
    })
    .catch((error) => {
      console.error('Error creating tee time:', error);
      reject(error);
    });
});

const deleteUserFromTeeTime = (teeTimeId, userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/teeTimeUser/${teeTimeId}/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

export {
  getAllUsers, createUser, updateUser, getSingleUser, getUserTeeTimes, addUserToTeeTime, createTeeTimeAndAddUser, deleteUserFromTeeTime,
};
