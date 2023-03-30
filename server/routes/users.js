const controller = require('../controllers/users');
const router = require('express').Router();

// Configure a handler for http://localhost:8080/users/
router.get('/', controller.getAllUsers); // /users

router.get('/:email([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})',
controller.getUserByEmail); // /users/:email

router.get('/:uid', controller.getUserByUid); // /users/:uid

module.exports = router;