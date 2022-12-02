const express = require('express')
const router = express.Router()
// auth middleware
const {viewFunds, addFunds, editFunds, addDistribute, viewDistribute } = require('../controllers/FundController')



router.get('/view', viewFunds)
router.post('/add', addFunds)
router.put('/edit/:id',  editFunds)
router.post('/adddistribute',addDistribute)
router.get('/viewdistribute', viewDistribute)

module.exports = router