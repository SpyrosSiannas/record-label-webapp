'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controller/controller');

router.get('/', controller.index);

router.get('/artists', controller.artists);

router.get('/merch', controller.merch);

router.get('/events', controller.events);

router.get('/about', controller.about)

router.get('/contact', controller.contact)

module.exports = router;