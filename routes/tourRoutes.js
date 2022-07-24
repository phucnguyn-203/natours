const express = require('express');
const router = express.Router();

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

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/').get(getAllTour).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
