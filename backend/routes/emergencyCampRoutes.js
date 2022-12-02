const express = require('express')
const router = express.Router()
// auth middleware
const {viewCamps, addCamp, editCamp, deleteCamp, viewById, updateRegStatus} = require('../controllers/emergencyCampsController')
const { protect } = require('../middleware/authMiddleware')


router.get('/view', protect, viewCamps)
router.post('/add', protect, addCamp)
router.get('/:id', protect, viewById)
router.put('/edit/:id', protect, editCamp)
router.delete('/delete/:id', protect, deleteCamp)
router.put('/update-registerations/:id', protect, updateRegStatus)

module.exports = router