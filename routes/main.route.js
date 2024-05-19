const express = require('express');
const router = express.Router();
const { getHome, addNewTickets, renderAddNewTickets } = require('../controller/main.controller');

router.get('/', getHome);
router.post('/add', addNewTickets);
router.get('/add', renderAddNewTickets);
module.exports = router;