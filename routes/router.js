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

router.get('/artist', controller.bio)

router.post('/auth', controller.auth)

router.post('/register', controller.register)

router.get('/logout', controller.logout)

module.exports = router;