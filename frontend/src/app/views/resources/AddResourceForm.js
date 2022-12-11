import {
    Button,
    Icon,
    Grid, 
    Autocomplete,
    CircularProgress,
    Snackbar,
    Alert,
    MenuItem,
    Select,
    InputLabel
} from '@mui/material'
import turf from '@turf/turf'
import { createFilterOptions } from '@mui/material/Autocomplete'
import { styled , Box, useTheme} from '@mui/system'
import { Span } from 'app/components/Typography'
import React, { useState, useEffect, useContext } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Modal from 'app/components/modals/ModalCustom'
import Loader from 'app/components/Loader/Loader'
import axios from 'axios.js'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Map from '../Map/Map'
import { Breadcrumb, SimpleCard } from 'app/components'

import useAuth from 'app/hooks/useAuth'



import Message from 'app/components/Message/Message'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))
const SelectField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const filter = createFilterOptions()

const AutoComplete = styled(Autocomplete)(() => ({
    width: 300,
    marginBottom: '16px',
}))

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))





const AddResourceForm = () => {
    const [state, setState] = useState({})
    const[loading, setLoading] = useState(false)
    const [message, setMessage]=useState('')
    const[messageColor, setMessageColor]=useState('success')
    const [vertical, setVertical] = React.useState('top')
    const [horizontal, setHorizontal] = React.useState('right')
    const[isMessage, setIsMessage] = useState(false)
   
  
    // error color
    const { palette } = useTheme()
    const textError = palette.error.main

    const navigate = useNavigate()
    const StyledProgress = styled(CircularProgress)(() => ({
        position: 'absolute',
        top: '6px',
        left: '25px',
    }))

   
    
    
    
    const handleSubmit = async (event) => {

        const data = {...state}              
        setLoading(true)

        try{
            const response = await axios.post('/api/resources/add', data)            
            setMessage('Resource Created Successfully, redirecting...')
            setMessageColor('success')
            setIsMessage(true)
            setTimeout(function() {
                navigate('/resources/view')
              }, 2000);                  

        }
        catch(e){
            console.log(e)
            setMessage(e.message)
            setLoading(false)
            setMessageColor('error')
            setIsMessage(true)

        }
    }

    const handleClose = (event) =>{
        setIsMessage(false)
    }

    const handleChange = (event) => {
       
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }
 
      
    const {                
        name,
        type_of_resource,
        quantity ,
        locationassigned,
        details,
        status,
                     
    } = state

    

    let form = (                     
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                {/* <Link to='/add-camp-via-map'> */}
                              
                {/* </Link>                            */}
            <Grid container spacing={6}>                    
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                        
                    <TextField
                        label="Name"
                        onChange={handleChange}
                        type="text"
                        name="name"
                        value={name || ''}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <TextField
                        label="Location:"
                        onChange={handleChange}
                        type="text"
                        name="locationassigned"
                        id="location"
                      
                        value={locationassigned || ''}
                        validators={['required']}
                        
                        errorMessages={['this field is required']}
                    />
                      <InputLabel id="type">Province</InputLabel>
                      <Select
    labelId="type"
    id="type"
   name="province"
    value={type_of_resource}
    label="Province"
    onChange={handleChange}
    validators={[
        'required'                                
    ]}
    style ={{marginBottom:'16px',width:'100%'}}
    errorMessages={['this field is required']}
  >
    <MenuItem value={"punjab"} selected>Punjab</MenuItem>
    <MenuItem value={"Sindh"}>Sindh</MenuItem>
   
    <MenuItem value={"Balochistan"}> Balochistan</MenuItem>
    <MenuItem value={"KPK"}>KPK</MenuItem>
   
  </Select>
                  
                   <Select
    labelId="type"
    id="type"
   name="type_of_resource"
    value={type_of_resource}
    label="Type of resource"
    onChange={handleChange}
    validators={[
        'required'                                
    ]}
    style ={{marginBottom:'16px',width:'100%'}}
    errorMessages={['this field is required']}
  >
    <MenuItem value={"Equipment"} selected>Equipment</MenuItem>
    <MenuItem value={"Vehicle"}>Vehicle</MenuItem>
   
    <MenuItem value={"small Machine"}> Small Machine</MenuItem>
    <MenuItem value={"Heavy Machine"}> Heavy  Machinary</MenuItem>
    <MenuItem value={"Hand tools"}> Hand tools</MenuItem>
    <MenuItem value={"supply items"}> Supply Item</MenuItem>
    <MenuItem value={"Other"}> Others</MenuItem>
  </Select>
                    <TextField
                        label="Quantity"
                        onChange={handleChange}
                        type="number"
                        name="quantity"
                        value={quantity || ''}
                        validators={['required']}
                        errorMessages={[
                            'this field is required',                                
                        ]}
                    />

                <TextField
                        label="Details"
                        onChange={handleChange}
                        type="text"
                        name="details"
                        value={details || ''}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                
                    
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            
           


                <InputLabel id="status">Status of item : </InputLabel>

  <Select
    labelId="status"
    id="status"
   name="status"
    value={status}
    label="Status"
    onChange={handleChange}
    validators={[
        'required'                                
    ]}
 style ={{marginBottom:'16',width:'100%'}}
    errorMessages={['this field is required']}
  >
    <MenuItem value={"Available"} selected>Available</MenuItem>
    <MenuItem value={"Damaged"}>Damaged</MenuItem>
   
    <MenuItem value={"Partially Damage"}> Partially Damage</MenuItem>
    <MenuItem value={"Need Repair"}> Need Repair</MenuItem>
    <MenuItem value={"Not Available"}>Not Available</MenuItem>
    <MenuItem value={"In Demand"}>In Demand</MenuItem>
   
  </Select>
                   
                    {/* <TextField                            
                        onChange={handleChange}
                        name="creater"
                        type="hidden"
                        value={creater_id || ''}                            
                    />   */}
                   
                </Grid>
            </Grid>
            <Box position="relative">
             
                <Button color="primary" variant="contained" type="submit">
                    <Icon>done</Icon>
                    <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                        Add a Resource
                    </Span>
                </Button>
                {loading && (
                        <StyledProgress
                            size={24}
                            className="buttonProgress"
                        />
                    )}

            </Box>
            {loading && <Loader />} 
        </ValidatorForm>
    )
  
    return (
        <div>
                 
              
            
                <Container>
            <div className="breadcrumb">
              <Breadcrumb
                    routeSegments={[
                        { name: 'Dashboard', path: '/dashboard' },
                        { name: 'Resource', path: '/resource/add' },
                        { name: 'Add Resource',}
                    ]}
                />
            </div>
            
            <SimpleCard title="Add Resource">                
            {form}         
            </SimpleCard>
            <Box py="12px" />
        </Container>
      
           


            
        </div>
    )
}

export default AddResourceForm

