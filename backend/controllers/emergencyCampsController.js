const asyncHandler = require('express-async-handler')
const EmergencyCamp = require('../models/emergencyCampModal')
const User = require('../models/userModal')
const Camp = require('../models/campModal')
const res = require('express/lib/response')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;


// @desc      View Emergency Camps 
// @route     POST /api/emergency-camps/view
// @access    Protected
const viewCamps = asyncHandler(async(req, res) =>{
    // const camps = await EmergencyCamp.find()
    const camps = await EmergencyCamp.aggregate([{
        $lookup:{
            from: 'users',
            localField: 'creater',
            foreignField: '_id',
            as: 'CreatedBy'
        }
    }]) 
    // const camps = await EmergencyCamp.find({"creater.name":mongoose.Types.ObjectId(author_id)}).populate('stories');
    res.status(200).json(camps)
})



// @desc      Edit Emergency Cam 
// @route     POST /api/emergency-camps/edit/:id
// @access    Protected
const editCamp = asyncHandler(async(req, res) =>{
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {        
        const camp = await EmergencyCamp.findById(req.params.id)
        const {name, city, address, local_address, area } = req.body            
        if(!camp){
            res.status(400)
            throw new Error('Camp was not found')
        }else{
            const campInfo = await EmergencyCamp.findOneAndUpdate({_id : req.params.id},
                {
                    name: name,
                   city: city,
                   address: address, 
                   local_address: local_address,                
                   area: area
                   
                },   
                {
                    new: true,
               }
           )
    
           res.status(200).json({campInfo, message: 'Camp information is updated'})
            
        }
      }else{
          res.status(400)
          throw new Error('Object is not valid')
      }

})



// @desc      Create New Camp Venue along with camps 
// @route     POST /api/emergency-camps/add
// @access    Protected
const addCamp = asyncHandler(async(req, res) =>{
    const {name, city, address, local_address, area , camp_size ,beds, province, coordinates } = req.body
    
    if(!city || !address, !local_address || !area || !camp_size || !beds ||!name ||!province ||!coordinates){
        res.status(400)
        throw new Error('Bad Request, Please add all fields')
    }
    
    // finding the user attached in the request
    const user = await User.findById(req.user.id)

    const existing_camps = await EmergencyCamp.find({address: address, local_address: local_address})
    if(existing_camps.length > 0 ){
        res.status(400)
        throw new Error('An emergency camp is already been created at this location')
    }else{
        // deviding the whole camp area with the camp size to adjust maximum camps in it
        const total_camps  = Math.floor(area/camp_size);        
        // throw new Error(total_camps)
        //creating camp  
        const emergency_camp = await EmergencyCamp.create({
            name,
            city,
            province,
            address,
            local_address,
            area,
            coordinates,
            slots: total_camps,
            creater: user._id
        })
        // storing list of camps to send in response
        const camps = []
        for(let i = 0; i< total_camps; i++){
            let camp = await Camp.create({
                camp_no: i+1,
                emergency_camp_id: emergency_camp._id,
                beds,
                camp_size
            })
            if(camp){            
                camps.push({
                    _id: camp._id,
                    camp_no: camp.camp_no,
                    emergency_camp_id: camp.emergency_camp_id,
                    beds: camp.beds,
                    camp_size: camp.camp_size
                })
            }else{
                res.status(400)
                throw new Error('Error occurred while creating camps')
            }
        }

        if(emergency_camp){
            res.status(201).json({
                _id: emergency_camp._id,
                name: emergency_camp.name,
                city: emergency_camp.city,
                province: emergency_camp.province,
                address: emergency_camp.address,
                local_address: emergency_camp.local_address,
                allowed_registerations: emergency_camp.allowed_registerations,
                camp_slots: emergency_camp.slots,
                created_by: user.name,
                child_camps: camps 
            })
        }
        else{
            res.status(400)
            throw new Error('Something went wrong - cannot create camp')
        }    
    
    }    
})


// @desc      View Emergency Camps 
// @route     Delete /api/emergency-camps/delete/id
// @access    Protected
const deleteCamp = asyncHandler(async(req, res) =>{
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {  
        const camp = await EmergencyCamp.findById(req.params.id)
        if(!camp){
            res.status(400)
            throw new Error('Camp was not found')
        }
        else{
            await camp.remove()
            const camps = await Camp.find({emergency_camp_id: req.params.id})

            if(camps.length > 0){
                camps.forEach(async(element) => {
                    const campToDel = await Camp.findById(element._id)
                    await campToDel.remove()
                  });
            }            
            res.status(200).json({
                message: 'Emergency Camp was deleted successfully'
            })
        }
    }else{
        res.status(400)
        throw new Error('Object id is not valid')
    }
})

const viewById = asyncHandler(async(req, res)=>{    
    const camp = await EmergencyCamp.aggregate([
        {
         $match: { _id: ObjectId(req.params.id) }
        },
        {
        $lookup:{
            from: 'users',
            localField: 'creater',
            foreignField: '_id',
            as: 'CreatedBy',            
        }       
        }
    ]) 
    if(camp){
        res.status(200).json(camp)
    }
    else{
        res.status(400)
        throw new Error('No Camp found')
    }
})

const updateRegStatus = asyncHandler (async(req, res)=>{
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {        
        const camp = await EmergencyCamp.findById(req.params.id)
        const { status } = req.body    
        let msg;
        let info;
        if(status == 'disable'){
             info = false
             msg = "Registerations are disabled" 
        }else{
            info = true
             msg = "Registerations are Enabled" 
        }
        
        if(!camp){
            res.status(400)
            throw new Error('Camp was not found')
        }else{
            const campInfo = await EmergencyCamp.findOneAndUpdate({_id : req.params.id},
                {
                    allowed_registerations: info                   
                },   
                {
                    new: true,
               }
           )
          
           res.status(200).json({campInfo, message: msg})
            
        }
      }else{
          res.status(400)
          throw new Error('Object is not valid')
      }

})

module.exports = {
    viewCamps,
    addCamp,
    editCamp,
    deleteCamp,
    viewById,
    updateRegStatus
}