const controller = require('../controllers/users');
const router = require('express').Router();

 // /users
router.get('/', controller.getAllUsers);
router.post('/', controller.createNewUser);

// /users/:email
router.get('/:email([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})', controller.getUserByEmail);

// /users/:uid
router.get('/:uid', controller.getUserByUid);

module.exports = router;