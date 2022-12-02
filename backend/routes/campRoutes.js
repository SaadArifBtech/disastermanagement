const express = require('express')

const router = express.Router()
const {viewCamps, editCamp, deleteCamp} = require('../controllers/campController')
const { protect } = require('../middleware/authMiddleware')

router.get('/:id', protect, viewCamps)
router.put('/edit/:id', protect, editCamp)
router.delete('/delete/:id', protect, deleteCamp)


module.exports = router