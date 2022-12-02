const asyncHandler = require('express-async-handler')
const Notification = require('../models/notificationModal')

const getNotifications = asyncHandler (async (req, res) => {
    console.log(req.params.id)
    const notifications = await Notification.find({user: req.params.id})
    res.status(200).json(notifications)
})

const createNotifcation = asyncHandler ( async (req, res) => {

    const {userId, title, description} = req.body
    const notification = await Notification.create({
        user: userId,
        title,
        description,
    })

    if(notification){
        res.status(200).json(notification)
    }
    else{
        throw new Error('Something went wrong while creating notification')
    }
})


const deleteNotifcation = asyncHandler ( async (req, res) => {

    const {id, user} = req.body
    
    const deletedNoti = await Notification.findByIdAndRemove({_id: id})
    
    const notifications = await Notification.find({user: user})

    if(deletedNoti){
        res.status(200).json(notifications)
    }
    else{
        throw new Error('Something went wrong while creating notification')
    }
})

const deleteAll = asyncHandler ( async (req, res) => {

    const {user} = req.body
    
    const response = await Notification.deleteMany({user: user})
        
    const notifications = await Notification.find({user: user})

    if(response){
        res.status(200).json(notifications)
    }
    else{
        throw new Error('Something went wrong while creating notification')
    }
})



module.exports = {
    getNotifications,
    createNotifcation,
    deleteNotifcation,
    deleteAll
}