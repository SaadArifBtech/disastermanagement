const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title:{
        type: String,
        required: true,    
    }, 
    description:{
        type: String,
        required: true,    
    }, 
    isRead: {
        type: Boolean,
        default: false
    }

},{
    timestamps: true
})

module.exports = mongoose.model('Notification', notificationSchema)