const express = require('express');
const router = express.Router();

const { getAllUser, getUser, createUser, updateUser, deleteUser } = require('../controllers/userControllers');

router.route('/').get(getAllUser).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
