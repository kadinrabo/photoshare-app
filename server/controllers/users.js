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

exports.getUsersBySearch = (req, res, next) => {
  const search = req.params.search;
  if (/^\d+$/.test(search)) {
    const query = `
    SELECT *
        FROM UserTable
        WHERE uid = $1;
      `;
      client.query(query, [search], (err, result) => {
        if (err) {
          return next(err);
        }
        res.json(result.rows);
      });
    }
    // Check if the search parameter is an email
    else if (/^\S+@\S+\.\S+$/.test(search)) {
      const query = `
        SELECT *
        FROM UserTable
        WHERE email = $1;
      `;
      client.query(query, [search], (err, result) => {
        if (err) {
          return next(err);
        }
        res.json(result.rows);
      });
    }
    // Otherwise, treat the search parameter as regular text
    else {
      const query = `
        SELECT *
        FROM UserTable
        WHERE fname ILIKE $1 OR lname ILIKE $1;
      `;
      client.query(query, [`%${search}%`], (err, result) => {
        if (err) {
          return next(err);
        }
        res.json(result.rows);
      });
    }
}

// Handler for http://localhost:8080/users/
exports.createNewUser = (req, res, next) => {
  const { email, fname, lname, pass, dob, gender, home } = req.body;
  client.query(
    'INSERT INTO usertable (email, fname, lname, pass, dob, gender, home) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [email, fname, lname, pass, dob, gender, home],
    (err, result) => {
      if (err) {
        return next(err);
      }
      res.status(201).json({ message: 'User created successfully.' });
  });
};