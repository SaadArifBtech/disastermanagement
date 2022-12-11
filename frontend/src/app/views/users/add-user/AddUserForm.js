import {
    Button,
    Icon,
    Grid, 
    Autocomplete,
    CircularProgress,
    Snackbar,
    Alert
} from '@mui/material'
import { createFilterOptions } from '@mui/material/Autocomplete'
import { styled , Box, useTheme} from '@mui/system'
import { Span } from 'app/components/Typography'
import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Paragraph} from 'app/components/Typography'
import axios from 'axios.js'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))
const filter = createFilterOptions()
const AutoComplete = styled(Autocomplete)(() => ({
    width: 300,
    marginBottom: '16px',
}))
const roles = [
    { label: 'Admin' },
    { label: 'Employee' },    
]

const provinces = [
    {label: 'Punjab'},
    {label: 'Khyber Pakhtunkhwa'},
    {label: 'Sindh'},
    {label: 'Balochistan'}    
]


const AddUserForm = () => {
    const [state, setState] = useState({})
    const[loading, setLoading] = useState(false)
    const [message, setMessage]=useState('')
    const[messageColor, setMessageColor]=useState('success')
    const[role, setRole] = useState()
    const[province, setProvince] = useState()
    const[isMessage, setIsMessage] = useState(false)
    const [vertical, setVertical] = React.useState('top')
    const [horizontal, setHorizontal] = React.useState('right')
    // error color
    const { palette } = useTheme()
    const textError = palette.error.main

    const navigate = useNavigate()
    const StyledProgress = styled(CircularProgress)(() => ({
        position: 'absolute',
        top: '6px',
        left: '25px',
    }))

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {            

            if (value !== state.password) {
                return false
            }
            return true
        })
        return () => ValidatorForm.removeValidationRule('isPasswordMatch')
    }, [state.password])

    const handleSubmit = async (event) => {
        const data = {...state, role, province}        
        setLoading(true)

        try{
            const response = await axios.post('/api/users', data)            
            if(response.data.hasOwnProperty('message')){
                setMessage('CNIC is already exisiting')
                setLoading(false)
                setMessageColor('error')
                setIsMessage(true)                
            }
            else{
                setMessage('User created, redirecting...')
                setMessageColor('success')
                setIsMessage(true)
                setTimeout(function() {
                    navigate('/users')
                  }, 3000);
                
            }

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
    const handleRoleChange = (event, value) => {        
        setRole(value.label) 
    }
 
   

    const {
        username,
        cnic,
        name,
        address,        
        mobile,
        password,
        confirmPassword,      
        email,        
    } = state
   
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
        
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="text"
                            name="username"
                            id="standard-basic"
                            onChange={handleChange}
                            value={username || ''}
                            validators={[
                                'required',
                                'minStringLength: 4',
                                'maxStringLength: 20',
                            ]}
                            label="Username (Min length 4, Max length 9)"
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            label="Full Name"
                            onChange={handleChange}
                            type="text"
                            name="name"
                            value={name || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            label="Email"
                            onChange={handleChange}
                            type="email"
                            name="email"
                            value={email || ''}
                            validators={['required', 'isEmail']}
                            errorMessages={[
                                'this field is required',
                                'email is not valid',
                            ]}
                        />

                     <TextField
                            label="CNIC"
                            onChange={handleChange}
                            type="number"
                            name="cnic"
                            value={cnic || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                      
                        <TextField
                            sx={{ mb: 4 }}
                            label="Address"
                            onChange={handleChange}
                            type="text"
                            name="address"
                            value={address || ''}
                            validators={[
                                'required'                                
                            ]}
                            errorMessages={['this field is required']}
                        />
                        <AutoComplete                        
                            options={provinces}
                            onChange={(event,value) => setProvince(value.label)}
                            getOptionLabel={(option) => option.label}
                            validators={['required']}
                            errorMessages={['Choose Province']}
                            renderInput={(params) => (
                                <TextField
                                    {...params}                               
                                    label="Select Province"
                                    variant="outlined"                                
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        
                    <AutoComplete                        
                        options={roles}
                        onChange={handleRoleChange}
                        getOptionLabel={(option) => option.label}
                        validators={['required']}
                        errorMessages={['Choose role']}
                        renderInput={(params) => (
                            <TextField
                                {...params}                               
                                label="Select Role"
                                variant="outlined"                                
                                fullWidth
                            />
                        )}
                    />
                 
                        <TextField
                            label="Mobile Nubmer"
                            onChange={handleChange}
                            type="number"
                            name="mobile"
                            value={mobile || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            label="Password"
                            onChange={handleChange}
                            name="password"
                            type="password"
                            value={password || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            label="Confirm Password"
                            onChange={handleChange}
                            name="confirmPassword"
                            type="password"
                            value={confirmPassword || ''}
                            validators={['required', 'isPasswordMatch']}
                            errorMessages={[
                                'this field is required',
                                "password didn't match",
                            ]}
                        />                                             
                    </Grid>
                </Grid>
                <Box position="relative">
                    <Button color="primary" variant="contained" type="submit">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Add User
                        </Span>
                    </Button>
                    {loading && (
                            <StyledProgress
                                size={24}
                                className="buttonProgress"
                            />
                        )}
                </Box>
            </ValidatorForm>
        </div>
    )
}

export default AddUserForm
