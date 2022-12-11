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
            const response = await axios.post('/api/funds/add', data)            
            setMessage('Funds Submitted Successfully, redirecting...')
            setMessageColor('success')
            setIsMessage(true)
            setTimeout(function() {
                navigate('/funds/view')
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
        providertype,
       taxid ,
       transfertype,
       accountno,
       details,
    amountreceived,
    accountreceivable,
    bankname
                     
    } = state

    

    let form = (                     
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                {/* <Link to='/add-camp-via-map'> */}
                              
                {/* </Link>                            */}
            <Grid container spacing={6}>                    
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                        
                    <TextField
                        label="Name Of Provider : "
                        onChange={handleChange}
                        type="text"
                        name="name"
                        value={name || ''}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />  <InputLabel id="providertype">Provider Category : </InputLabel>
                    <Select
     labelId="type"
     
     defaultValue={"Goverment"}
     id="providertype"
    name="providertype"
     value={providertype}
     label="Provider Category "
     onChange={handleChange}
     validators={[
         'required'                                
     ]}
     style ={{marginBottom:'16px',width:'100%'}}
     errorMessages={['this field is required']}
   >
     <MenuItem value={"Goverment"} >Goverment</MenuItem>
     <MenuItem value={"Non Goverment Institution"}>Non Goverment Institution</MenuItem>
     <MenuItem value={"Foreign Funds"}>Foreign Funds</MenuItem>
     <MenuItem value={"NGO"}>NGO</MenuItem>
    
 
   </Select>
                    <TextField
                        label="Tax id : "
                        onChange={handleChange}
                        type="text"
                        name="taxid"
                        id="taxid"
                      
                        value={taxid || ''}
                        validators={['required']}
                        
                        errorMessages={['this field is required']}
                    />
                      <InputLabel id="type">Fund Transfer</InputLabel>
                   <Select
    labelId="type"
    id="type"
   name="transfertype"
   defaultValue={"Bank Transfer"}
    value={transfertype}
    label="Fund Transfer"
    onChange={handleChange}
    validators={[
        'required'                                
    ]}
    style ={{marginBottom:'16px',width:'100%'}}
    errorMessages={['this field is required']}
  >
    <MenuItem value={"Bank Transfer"} >Bank Transfer</MenuItem>
    <MenuItem value={"Cash Deposited"}>Cash Deposited</MenuItem>
    <MenuItem value={"Wire Transger"}>Wire Transfer</MenuItem>
    
  </Select>
                    <TextField
                        label="Account No :"
                        onChange={handleChange}
                        type="text"
                        name="accountno"
                        value={accountno || ''}
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
            
           

                <TextField
                        label="Amount Recieved :"
                        onChange={handleChange}
                        type="number"
                        name="amountreceived"
                        value={amountreceived || ''}
                        validators={['required']}
                        errorMessages={[
                            'this field is required',                                
                        ]}
                    />

<TextField
                        label="Account  Recieved No  :"
                        onChange={handleChange}
                        type="text"
                        name="accountreceivable"
                        value={accountreceivable || ''}
                        validators={['required']}
                        errorMessages={[
                            'this field is required',                                
                        ]}
                    />

<TextField
                        label="Bank Received (Bank Name) :"
                        onChange={handleChange}
                        type="text"
                        name="bankname"
                        value={bankname || ''}
                        validators={['required']}
                        errorMessages={[
                            'this field is required',                                
                        ]}
                    />
                     <Button color="primary" variant="contained" type="submit">
                    <Icon>done</Icon>
                    <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                        Add Fund Details
                    </Span>
                </Button>
           
                    {/* <TextField                            
                        onChange={handleChange}
                        name="creater"
                        type="hidden"
                        value={creater_id || ''}                            
                    />   */}
                   
                </Grid>
            </Grid>
            <Box position="relative">
             
               
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
                        { name: 'Resource', path: '/funds/add' },
                        { name: 'Add Funds',}
                    ]}
                />
            </div>
            
            <SimpleCard title="Add Funds">                
            {form}         
            </SimpleCard>
            <Box py="12px" />
        </Container>
      
           


            
        </div>
    )
}

export default AddResourceForm

