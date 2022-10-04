const express = require('express');
const {
    getAllReview,
    setTourUserIds,
    createReview,
    updateReview,
    deleteReview,
} = require('../controllers/reviewControllers');
const { protect, restrictTo } = require('../controllers/authControllers');
const router = express.Router({ mergeParams: true });

// POST tours/287yndj/reviews
// GET tours/287yndj/reviews

router.route('/').get(getAllReview).post(protect, restrictTo('user'), setTourUserIds, createReview);

router.route('/:id').patch(updateReview).delete(deleteReview);
module.exports = router;
