const controller = require('../controllers/users');
const router = require('express').Router();

// Configure a handler for http://localhost:8080/users/
router.get('/', controller.getUsers); // /users
router.get('/:uid', controller.getUser); // /users/:uid

module.exports = router;