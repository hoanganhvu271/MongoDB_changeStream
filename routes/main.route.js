const express = require('express');
const router = express.Router();
const { getHome, addNewTickets, renderAddNewTickets, getAllClient, deleteClientById } = require('../controller/main.controller');

router.get('/', getHome);
router.post('/add', addNewTickets);
router.get('/add', renderAddNewTickets);
router.get('/client', getAllClient)
router.get('/delete', deleteClientById)
module.exports = router;