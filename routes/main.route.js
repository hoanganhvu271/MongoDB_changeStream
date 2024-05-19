const express = require('express');
const router = express.Router();
const { getAllTickets, addNewTickets, renderAddNewTickets } = require('../controller/main.controller');

router.get('/', getAllTickets);
router.post('/add', addNewTickets);
router.get('/add', renderAddNewTickets);
module.exports = router;