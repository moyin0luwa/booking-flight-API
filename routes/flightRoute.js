const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

router
    .get('/', controller.getFlights)
    .get('/:id', controller.getFlight)
    .post('/', controller.bookFlight)
    .put('/:id', controller.editFlight)
    .delete('/:id', controller.deleteFlight)

module.exports = router;

