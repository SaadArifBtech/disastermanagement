const express = require('express')
const router = express.Router()
// auth middleware
const {viewResources, addResources, editResources, deleteResource } = require('../controllers/ResourceController')



router.get('/view', viewResources)
router.post('/add', addResources)
router.put('/edit/:id',  editResources)
router.delete('/delete/:id', deleteResource)


module.exports = router