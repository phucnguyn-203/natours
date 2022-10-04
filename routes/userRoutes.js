const express = require('express');
const router = express.Router();
const {
    getAllUser,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    updateMe,
    deleteMe,
} = require('../controllers/userControllers');
const {
    signup,
    login,
    forgotPassword,
    resetPassword,
    protect,
    updatePassword,
} = require('../controllers/authControllers');

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updateMyPassword', protect, updatePassword);
router.patch('/updateMe', protect, updateMe);
router.delete('/deleteMe', protect, deleteMe);

router.route('/').get(getAllUser).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
