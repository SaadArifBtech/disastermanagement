const asyncHandler = require('express-async-handler')

const Resource = require('../models/ResourceModal')

const res = require('express/lib/response')
const mongoose = require('mongoose');
const { random } = require('colors');
const ObjectId = mongoose.Types.ObjectId;



const viewResources = asyncHandler(async(req, res) =>{
    // const camps = await EmergencyCamp.find()
    const resources = await Resource.find()
   
    res.status(200).json(resources)
})



// @desc      Edit Emergency Cam 
// @route     POST /api/emergency-camps/edit/:id
// @access    Protected
const editResources = asyncHandler(async(req, res) =>{
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




const addResources = asyncHandler(async(req, res) =>{
    const { 
        type_of_resource,
        quantity ,
        locationassigned,
        name,
        details,
        status} = req.body
    
    if(!name || !type_of_resource, !quantity || !locationassigned || !details || !status ){
        res.status(400)
        throw new Error('Bad Request, Please add all fields')
    }
    
   

   
      
        const resource_new = await Resource.create({
           
            
            
            type_of_resource: req.body.type_of_resource,
            Quantity: req.body.quantity,
            Location_assigned: req.body.locationassigned,
            Name: req.body.name,
            Details: req.body.details,
            Status: req.body.status,
           
        })
    

        if(resource_new){
            res.status(201).json({
               
                type_of_resource: resource_new.type_of_resource,
                Quantity: resource_new.quantity,
                Location_assigned: resource_new.locationassigned,
                Name: resource_new.name,
                Details: resource_new.details,
                Status: resource_new.status,
                
            })
        }
        else{
            res.status(400)
            throw new Error('Something went wrong - cannot create camp')
        }    
    
    }    
)



const deleteResource = asyncHandler(async(req, res) =>{
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





module.exports = {
    viewResources,
    addResources,
    editResources,
    deleteResource,
  
}