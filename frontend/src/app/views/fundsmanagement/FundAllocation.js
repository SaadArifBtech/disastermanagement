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
import { SpaRounded } from '@mui/icons-material'
import { red } from '@mui/material/colors'

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





const FundAllocationForm = () => {
    const [state, setState] = useState({})
    const[loading, setLoading] = useState(false)
    const [message, setMessage]=useState('')
    const[messageColor, setMessageColor]=useState('success')
    const [vertical, setVertical] = React.useState('top')
    const [horizontal, setHorizontal] = React.useState('right')
    const[isMessage, setIsMessage] = useState(false)
   const[isMore,setMore] = React.useState(false);
  
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
        if(event.target.name  == "accountno" && event.target.value > sum){
           setMore(true);
        }else{
            setMore(false);
        }
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }
   
    let transformed = [];
      
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
    let trans = [];
    const [emergencyCamps, setEmergencyCamps] = React.useState([])       
    const [updated, setUpdated] = React.useState(false)
    // const [funds, setFunds] = React.useState([]);
    // const [totalfunds,setsumFunds] =React.useState(0);
    const [sum,setSum] = React.useState(0);
    useEffect ( ()=>{      
        const getResources = async () =>{
            try{
                const response = await axios.get('/api/emergency-camps/view')      
                const fundsap = await axios.get('/api/funds/view')  
                console.log(fundsap.data);   
               const  totalfunds = fundsap.data.map((single)=>{
                   
                return {
                       total : single.amountrecieved
                     
                }
                   
                })
                const msgTotal = totalfunds.reduce(function(prev, cur) {
                    return prev + cur.total;
                  }, 0);
                  setSum(msgTotal)
                console.log(totalfunds);
                const transforemd = response.data.map((el)=>{
                    return {
                        id: el._id,
                        name:el.name,
                       
                    }
                })       
                console.log(transformed);                 
                setEmergencyCamps(transforemd) 
                
            }
            catch(e){
                console.log(e)
            }
            
                       
        }
        getResources()
             
    },[])
    

    let form = (                     
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                {/* <Link to='/add-camp-via-map'> */}
                              
                {/* </Link>                            */}
            <Grid container spacing={6}>       

                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 3 }}>  
                               
                    <TextField
                        label="Disaster Name : "
                        onChange={handleChange}
                        
                        type="text"
                        name="name"
                        value={name || ''}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    /> 
                     <InputLabel id="providertype">Allocated to Camp : </InputLabel>
                    <Select
     labelId="type"
     
    
     id="providertype"
    name="providertype"
    defaultValue=""

     value={providertype}
     
     label="Provider Category "
     onChange={handleChange}
     validators={[
         'required'                                
     ]}
     style ={{marginBottom:'16px',width:'100%'}}
     errormessages={['this field is required']}
   >
  
    {emergencyCamps.map((camp)=> {
       
      return (  <MenuItem key={camp.id} value={camp.name} > {camp.name}</MenuItem>)
    })} 
 
   </Select>
              
                     
                    <TextField
                        label="Fund Assign :"
                        onChange={handleChange}
                      
                        type="number"
                        name="accountno"
                        value={accountno || 0}
                        validators={['required']}
                        errorMessages={[
                            'this field is required',                                
                        ]}
                    />
                    {isMore  ? 
                    <Span style={{color:'red'}}>Cannot Asssign more than fund  Available ({sum})</Span> : <Span style={{color:'green'}}>Available Funds Are {sum}</Span>    }
                 
                <TextField
                        label="Details"
                        onChange={handleChange}
                        type="text"
                        name="details"
                        value={details || ''}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                
                <Button color="primary" variant="contained" type="submit">Allocate Fund</Button>
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

export default FundAllocationForm

