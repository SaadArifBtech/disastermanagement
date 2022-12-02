const asyncHandler = require('express-async-handler')
const Registerations = require('../models/campRegisterationsModal')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;


const viewRegisterations = asyncHandler(async(req, res) => {
    const registerations = await Registerations.aggregate([
        {
            $lookup:{
                from: 'endusers',
                localField: 'effectee_id',
                foreignField: '_id',
                as: 'effecteeDetails'
            }
        },
        {
            $lookup:{
                from: 'emergencycamps',
                localField: 'emergency_camp_id',
                foreignField: '_id',
                as: 'campDetails'
            }
        }
])

    if(registerations){
        res.status(200).json(registerations)
    }else{
        res.status(400)
        throw new Error('Something went wrong')
    }
})

const viewById = asyncHandler(async(req, res)=>{
    const reg_id = req.params.id
    const registeration = await Registerations.aggregate([
        {
            $match: { _id: ObjectId(reg_id) }
        },
        {
            $lookup:{
                from: 'endusers',
                localField: 'effectee_id',
                foreignField: '_id',
                as: 'effecteeDetails'
            }
        },
        {
            $lookup:{
                from: 'emergencycamps',
                localField: 'emergency_camp_id',
                foreignField: '_id',
                as: 'campDetails'
            }
        }
    ])
    if(registeration){
        res.status(200).json(registeration)
    }else{
        res.status(400)
        throw new Error('Registeration was not found')
    }

})

const approveRequest = asyncHandler(async(req, res)=>{
    const reg_id = req.params.id
    
    const RegInfo = await Registerations.findOneAndUpdate({_id : reg_id},
        {
           is_approved: true           
        },   
        {
            new: true,
        }
   )
   if(RegInfo){
       res.status(200).json({
           message: 'Registeration approved!'
       })
   }else{
       res.status(400)
       throw new Error('Something went wrong')
   }
})
module.exports ={
    viewRegisterations,
    viewById,
    approveRequest
}