
export default {
  get: (key) => {
    return new Promise((resolve, reject) => {
      window.localStorage.getItem(key, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },

  set: (key, data) => {
    return new Promise((resolve, reject) => {
      window.localStorage.setItem(key, data, err => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },

  remove: (key) => {
    return new Promise((resolve, reject) => {
      window.localStorage.removeItem(key, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
};