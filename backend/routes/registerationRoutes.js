const express = require('express')

const router = express.Router()

const { viewRegisterations, viewById, approveRequest } = require('../controllers/registerationsController')
const { protect } = require('../middleware/authMiddleware')

router.get('/view-registerations', protect, viewRegisterations)
router.get('/view-registerations/:id', protect, viewById)
router.post('/approve/:id', protect, approveRequest)

module.exports = router