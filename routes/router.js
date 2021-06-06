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

router.post('/placeorder', controller.order)

router.get('/logout', controller.logout)

router.get('/disablesuccess', controller.disableSuccess)

router.get('/myorders', controller.myOrders)

router.get('/clearOrder', controller.clearOrder)

module.exports = router;