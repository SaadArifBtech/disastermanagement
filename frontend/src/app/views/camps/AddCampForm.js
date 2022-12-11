import {
    Button,
    Icon,
    Grid, 
    Autocomplete,
    CircularProgress,
    Snackbar,
    Alert
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
import useAuth from 'app/hooks/useAuth'



import Message from 'app/components/Message/Message'

const TextField = styled(TextValidator)(() => ({
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


const roles = [
    { label: 'Admin' },
    { label: 'Employee' },    
]

const mapStyle = {
    height:"400px", 
    backgroundColor: "red",
    marginTop:"80px",
    marginBottom:"90px"
  };



const AddCampForm = () => {
    const [state, setState] = useState({})
    const[loading, setLoading] = useState(false)
    const [message, setMessage]=useState('')
    const[messageColor, setMessageColor]=useState('success')
    const[openMapModal, setOpenMapModal] = useState(false)
    const[isMessage, setIsMessage] = useState(false)
    const [vertical, setVertical] = React.useState('top')
    const [horizontal, setHorizontal] = React.useState('right')
    const [onMap, setOnMap] = React.useState(true)
    // error color
    const { palette } = useTheme()
    const textError = palette.error.main

    const navigate = useNavigate()
    const StyledProgress = styled(CircularProgress)(() => ({
        position: 'absolute',
        top: '6px',
        left: '25px',
    }))

    const {user, permissions} = useAuth()
    
    const creater_id = user.id    
    
    const handleSubmit = async (event) => {

        const data = {...state, creater_id}              
        setLoading(true)

        try{
            const response = await axios.post('/api/emergency-camps/add', data)            
            setMessage('Camp Created Successfully, redirecting...')
            setMessageColor('success')
            setIsMessage(true)
            setTimeout(function() {
                navigate('/emergency-camps')
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
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }
    const position = [33.738045, 73.084488]
      
    const {                
        name,
        city,
        province,
        address,
        local_address,
        area,
        camp_size,
        beds                
    } = state

    

    let form = (                     
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                {/* <Link to='/add-camp-via-map'> */}
                    <StyledButton
                        color="success"
                        className="button"
                        aria-label="Add user"
                        variant="outlined"
                        onClick={()=> setOnMap(true) }
                        >
                            SEARCH ON MAP
                    </StyledButton>              
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
                        type="text"
                        name="city"
                        id="city"
                        onChange={handleChange}
                        value={city || ''}
                        validators={[
                            'required',
                        ]}
                        label="City"
                        errorMessages={['this field is required']}
                    />
                    <TextField
                        type="text"
                        name="province"
                        id="province"
                        onChange={handleChange}
                        value={province}
                        validators={[
                            'required',
                        ]}
                        label="Province"
                        errorMessages={['this field is required']}
                    />
                    <TextField
                        label="Main address"
                        onChange={handleChange}
                        type="text"
                        name="address"
                        value={address || ''}
                        validators={['required']}
                        errorMessages={[
                            'this field is required',                                
                        ]}
                    />

                <TextField
                        label="Local Address"
                        onChange={handleChange}
                        type="text"
                        name="local_address"
                        value={local_address || ''}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                
                    
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            
                <TextField                            
                        label="Covered Area m²"
                        onChange={handleChange}
                        type="number"
                        name="area"
                        value={area || ''}
                        validators={[
                            'required'                                
                        ]}
                        errorMessages={['this field is required']}
                    />
                    <TextField
                        label="Camp Size"
                        onChange={handleChange}
                        type="number"
                        name="camp_size"
                        value={camp_size || ''}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <TextField
                        label="beds"
                        onChange={handleChange}
                        name="beds"
                        type="number"
                        value={beds || ''}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                
                    {/* <TextField                            
                        onChange={handleChange}
                        name="creater"
                        type="hidden"
                        value={creater_id || ''}                            
                    />   */}
                    <input type="hidden" value={creater_id} name="creater"/>
                </Grid>
            </Grid>
            <Box position="relative">
             
                <Button color="primary" variant="contained" type="submit">
                    <Icon>done</Icon>
                    <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                        Create Camp
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
    if(onMap){
        form = <Map />
    }

    if(!permissions.createCamp){
        const msg = "You don't have permissions to create camp"
        form = <Message message={msg} title={"Permissions not granted"}/>        
    }
    return (
        <div>
                 <Snackbar 
                        open={isMessage} 
                        autoHideDuration={6000}  
                        anchorOrigin={{ vertical, horizontal }}
                        key={`${vertical},${horizontal}`} 
                        onClose={handleClose}
                        >
                    <Alert                                           
                        severity={messageColor}
                        sx={{ width: '100%' }}
                        variant="filled"
                    >
                        {message}
                    </Alert>
                </Snackbar> 
            
             
      
            {form}


            {/* Map Modal */}

            <Modal  handleModalClose={()=> setOpenMapModal(false)} open={openMapModal}>
                <MapContainer  center={position} zoom={13} scrollWheelZoom={false} style={mapStyle}>
                        <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {/* <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                        </Marker> */}
                </MapContainer>
            </Modal>
        </div>
    )
}

export default AddCampForm
