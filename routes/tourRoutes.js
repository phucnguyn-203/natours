const express = require('express');
const router = express.Router();
const reviewRouter = require('../routes/reviewRoutes');

// CONTROLLER
const {
    getAllTour,
    createTour,
    getTour,
    updateTour,
    deleteTour,
    getTourStats,
    getMonthlyPlan,
} = require('../controllers/tourControllers');

const { protect, restrictTo } = require('../controllers/authControllers');

router.use('/:tourId/reviews', reviewRouter);

router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/tour-stats').get(getTourStats);

router.route('/').get(protect, getAllTour).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
