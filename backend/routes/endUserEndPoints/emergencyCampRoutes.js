const express = require('express')
const router = express.Router()
// auth middleware
const {viewCamps, viewById} = require('../../controllers/endUserEndControolers/emergencyCampsController')
const { protectEndUser } = require('../../middleware/authMiddleware')


router.get('/view', protectEndUser, viewCamps)
router.get('/view/:id', protectEndUser, viewById)


module.exports = router