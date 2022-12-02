const express = require('express')
const router = express.Router()
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require('../controllers/endUserController.js')
const { protectEndUser } = require('../middleware/authMiddleware.js')

router.route('/').post(registerUser).get(protectEndUser, getUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protectEndUser, getUserProfile)
  .put(protectEndUser, updateUserProfile)
router
  .route('/:id')
  .delete(protectEndUser, deleteUser)
  .get(protectEndUser, getUserById)
  .put(protectEndUser, updateUser)

module.exports = router
