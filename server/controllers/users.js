const client = require('../util/database');

// Handler for http://localhost:8080/users. Uses client to do a psql query
exports.getUsers = (req, res, next) => {
  client.query('SELECT * FROM usertable', (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result.rows);
  });
};
