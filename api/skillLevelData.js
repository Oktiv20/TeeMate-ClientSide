import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllSkillLevels = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/skillLevels`, {
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

const getSingleSkillLevel = (skillLevelId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/skillLevels/${skillLevelId}`, {
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
  getAllSkillLevels, getSingleSkillLevel,
};
