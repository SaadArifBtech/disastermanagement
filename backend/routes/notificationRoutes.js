const express = require('express')
const router = express.Router()
const {
    getNotifications,
    createNotifcation,
    deleteNotifcation,
    deleteAll
} = require('../controllers/notificationController.js')

const { protect } = require('../middleware/authMiddleware.js')

router.route('/:id').get(protect, getNotifications)
router.route('/').post(protect, createNotifcation)
router.route('/delete').post(protect, deleteNotifcation)
router.route('/delete-all').post(protect, deleteAll)
// router.route('/:id').get(protect, getPermissionById).post(protect, updatePermissions)

module.exports = router
