const client = require('../util/database');

// Handler for http://localhost:8080/users
exports.getAllUsers = (req, res, next) => {
  client.query('SELECT * FROM usertable', (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result.rows);
  });
};

// Handler for http://localhost:8080/users/:uid
exports.getUserByUid = (req, res, next) => {
  const userId = req.params.uid;
  client.query('SELECT * FROM usertable WHERE uid = $1', [userId],
  (err, result) => {
    if (err)
    {
      return next(err);
    }
    res.json(result.rows[0]);
  });
};

// Handler for http://localhost:8080/users/:email
exports.getUserByEmail = (req, res, next) => {
  const userEmail = req.params.email;
  client.query('SELECT * FROM usertable WHERE email = $1', [userEmail],
  (err, result) => {
    if (err)
    {
      return next(err);
    }
    res.json(result.rows[0]);
  });
};