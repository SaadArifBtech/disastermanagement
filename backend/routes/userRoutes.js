const express = require('express')
const router = express.Router()

const { registerUser , loginUser, getMe, deleteUser, getAllUsers , updatePass, updateProfile} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me',protect, getMe)
router.delete('/delete/:id',protect, deleteUser)
router.put('/update-password', protect, updatePass)
router.put('/update-profile', protect, updateProfile)
router.get('/getusers',protect, getAllUsers)


module.exports = router