const express = require('express')
const router = express.Router()
// auth middleware
const { register, getMyRegs } = require('../../controllers/endUserEndControolers/registerationController')
const { protectEndUser } = require('../../middleware/authMiddleware')

router.post('/register', protectEndUser, register)
router.get('/get-my-regs/:id', protectEndUser, getMyRegs)

module.exports = router