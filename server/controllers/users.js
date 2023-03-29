const client = require('../util/database');

// Handler for http://localhost:8080/users
exports.getUsers = (req, res, next) => {
  client.query('SELECT * FROM usertable', (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result.rows);
  });
};

// Handler for http://localhost:8080/users/x
exports.getUser = (req, res, next) => {
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