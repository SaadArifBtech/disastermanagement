const asyncHandler = require('express-async-handler')
const EmergencyCamp = require('../../models/emergencyCampModal')
// const User = require('../models/userModal')
// const Camp = require('../models/campModal')
// const res = require('express/lib/response')
// const mongoose = require('mongoose')


const viewCamps = asyncHandler(async(req, res)=>{
    const camps = await EmergencyCamp.find()
    if(!camps){
        res.status(400)
        throw new Error('No Camp was found')
    }else{
        res.status(200).json(camps)
    }

})


const viewById = asyncHandler(async(req, res)=>{    
    const camp = await EmergencyCamp.findById(req.params.id)
    if(camp){
        res.status(200).json(camp)
    }
    else{
        res.status(400)
        throw new Error('No Camp found')
    }
})

module.exports = {
    viewCamps,
    viewById
}