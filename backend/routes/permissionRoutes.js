const express = require('express')
const router = express.Router()
const {
  getPermissions,
  createPermissions,
  updatePermissions,
  getPermissionById
} = require('../controllers/permissionsController.js')
const { protect } = require('../middleware/authMiddleware.js')

// router.route('/').post(updatePermissions)
router.route('/').get(protect, getPermissions).post(protect, createPermissions)
router.route('/:id').get(protect, getPermissionById).post(protect, updatePermissions)

module.exports = router
