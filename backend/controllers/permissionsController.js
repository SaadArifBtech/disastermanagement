
const asyncHandler = require('express-async-handler')
const Permission = require('../models/permissionModel')
const Notification = require('../models/notificationModal')



// @desc      Get permissions for users
// @route     GET /api/permissions/
// @access    Protected
const getPermissions =  asyncHandler( async (req, res)=>{
    
    const userPermissions = await Permission.aggregate([{
        $lookup:{
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user'
        }
    }])    

    res.status(200).json(userPermissions)
     
})

// @desc      Update permissions for users
// @route     GET /api/permissions/:id
// @access    Protected
const updatePermissions =  asyncHandler( async (req, res)=>{

    const {allowed} = req.body    
    if(allowed === ""){
        res.status(400).json({message: "Please add all fields"})
    }else{
        const updatedPermission = {
            createCamp: allowed
        }        
        const userPermissions = await Permission.findOneAndUpdate({_id : req.params.id},
            {
                permissions: updatedPermission                   
            },   
            {
                new: true,
        }
    )        
        const notification = await Notification.create({
            user: userPermissions.user,
            title: userPermissions.permissions.createCamp ? "Permissions granted" : "Permission denied",
            description: userPermissions.permissions.createCamp ? "Admin has granted permissions for creating disaster camp" : "Admin has denied permissions of creating disaster camp",
        })
        res.status(200).json(userPermissions)
    }
     
})

// @desc      Create permissions for users
// @route     GET /api/permissions/
// @access    Protected
const createPermissions =  asyncHandler( async (req, res)=>{

    const {userId, permissions} = req.body
    const existing = await Permission.findOne({user: userId})    
    if(!userId || !permissions){
        res.status(400).json({message: "Please add all fields"})
    }
    else if(existing){
        res.status(400).json({message: "Permissions are already existing"})
    }
    else{
        const userPermissions = await Permission.create({
            user: userId,
            permissions: permissions
        })        
        res.status(200).json(userPermissions)
    }
    
    
     
})


// @desc      Create permissions for single user
// @route     GET /api/permissions/:id
// @access    Protected
const getPermissionById = asyncHandler (async(req,res)=>{    
    const permissions = await Permission.findOne({user: req.params.id})    
    res.status(200).json(permissions)

})

module.exports = {
    getPermissions,
    createPermissions,
    updatePermissions,
    getPermissionById
}