const bcrypt = require("bcrypt");

const passwordHash = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS), (err, hash) => {
      if (err) {
        return reject(err);
      }
      return resolve(hash);
    });
  });
};

const comparePasswordHash = (password, hash) => {
  return new Promise((resolve) => {
    bcrypt.compare(password, hash).then((isValid) => {
      if (isValid) {
        return resolve(isValid);
      }
      return resolve(isValid);
    });
  });
};

module.exports = {
  passwordHash,
  comparePasswordHash,
};
