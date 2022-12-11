const express = require('express')
const router = express.Router()
// auth middleware
const {viewResources, addResources, editResources, deleteResource,overviewResource, overviewResources } = require('../controllers/ResourceController')



router.get('/view', viewResources)
router.post('/add', addResources)
router.put('/edit/:id',  editResources)
router.delete('/delete/:id', deleteResource)
router.get('/overviewresource',overviewResources)


module.exports = router