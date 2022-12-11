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





const AddDistributeForm = () => {
    const [state, setState] = useState({})
    const[loading, setLoading] = useState(false)
    const [message, setMessage]=useState('')
    const[messageColor, setMessageColor]=useState('success')
    const [vertical, setVertical] = React.useState('top')
    const [horizontal, setHorizontal] = React.useState('right')
    const[isMessage, setIsMessage] = useState(false)
   
    const [userFund, setUserFund] = React.useState(null)
    const [updated, setUpdated] = React.useState(false)
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
            const response = await axios.post('/api/funds/adddistribute', data)            
            setMessage('Funds Submitted Successfully, redirecting...')
            setMessageColor('success')
            setIsMessage(true)
            setTimeout(function() {
                navigate('/funds/viewdistribution')
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
       cnic ,
       city,
       address,
       fundid,
       contactno,
       province,
       transfertype,
       accountno,
       details,
    amountreceived,
   
    bankname
                     
    } = state

    

    let form = (                     
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                {/* <Link to='/add-camp-via-map'> */}
                              
                {/* </Link>   */}
            <Grid container spacing={6}>                    
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                        
                    <TextField
                        label="Name Of Effecte "
                        onChange={handleChange}
                        type="text"
                        name="name"
                        value={name || ''}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />  
                    
                    <TextField
                        label="CNIC NO of Effecte  "
                        onChange={handleChange}
                        type="text"
                        name="cnic"
                        id="cnic"
                      
                        value={cnic || ''}
                        validators={['required']}
                        
                        errorMessages={['this field is required']}
                    />

                <TextField
                        label="Address of Effecte  "
                        onChange={handleChange}
                        type="text"
                        name="address"
                        id="address"
                      
                        value={address || ''}
                        validators={['required']}
                        
                        errorMessages={['this field is required']}
                    />

                <TextField
                        label="Contact No  "
                        onChange={handleChange}
                        type="text"
                        name="contactno"
                        id="contactno"
                      
                        value={contactno || ''}
                        validators={['required']}
                        
                        errorMessages={['this field is required']}
                    />
                     <InputLabel id="city">City : </InputLabel>
                                    <Select
                                            labelId="type"
                                            
                                            defaultValue={"Islamabad"}
                                            id="city"
                                            name="city"
                                            value={city}
                                            label="City "
                                            onChange={handleChange}
                                            validators={[
                                                'required'                                
                                            ]}
                                            style ={{marginBottom:'16px',width:'100%'}}
                                            errorMessages={['this field is required']}
                                    >
                            
                    <MenuItem value="Islamabad">Islamabad</MenuItem>
                    <MenuItem value="" disabled>Punjab Cities</MenuItem>
                    <MenuItem value="Ahmed Nager Chatha">Ahmed Nager Chatha</MenuItem>
                    <MenuItem value="Ahmadpur East">Ahmadpur East</MenuItem>
                    <MenuItem value="Ali Khan Abad">Ali Khan Abad</MenuItem>
                    <MenuItem value="Alipur">Alipur</MenuItem>
                    <MenuItem value="Arifwala">Arifwala</MenuItem>
                    <MenuItem value="Attock">Attock</MenuItem>
                    <MenuItem value="Bhera">Bhera</MenuItem>
                    <MenuItem value="Bhalwal">Bhalwal</MenuItem>
                    <MenuItem value="Bahawalnagar">Bahawalnagar</MenuItem>
                    <MenuItem value="Bahawalpur">Bahawalpur</MenuItem>
                    <MenuItem value="Bhakkar">Bhakkar</MenuItem>
                    <MenuItem value="Burewala">Burewala</MenuItem>
                    <MenuItem value="Chillianwala">Chillianwala</MenuItem>
                    <MenuItem value="Chakwal">Chakwal</MenuItem>
                    <MenuItem value="Chichawatni">Chichawatni</MenuItem>
                    <MenuItem value="Chiniot">Chiniot</MenuItem>
                    <MenuItem value="Chishtian">Chishtian</MenuItem>
                    <MenuItem value="Daska">Daska</MenuItem>
                    <MenuItem value="Darya Khan">Darya Khan</MenuItem>
                    <MenuItem value="Dera Ghazi Khan">Dera Ghazi Khan</MenuItem>
                    <MenuItem value="Dhaular">Dhaular</MenuItem>
                    <MenuItem value="Dina">Dina</MenuItem>
                    <MenuItem value="Dinga">Dinga</MenuItem>
                    <MenuItem value="Dipalpur">Dipalpur</MenuItem>
                    <MenuItem value="Faisalabad">Faisalabad</MenuItem>
                    <MenuItem value="Ferozewala">Ferozewala</MenuItem>
                    <MenuItem value="Fateh Jhang">Fateh Jang</MenuItem>
                    <MenuItem value="Ghakhar Mandi">Ghakhar Mandi</MenuItem>
                    <MenuItem value="Gojra">Gojra</MenuItem>
                    <MenuItem value="Gujranwala">Gujranwala</MenuItem>
                    <MenuItem value="Gujrat">Gujrat</MenuItem>
                    <MenuItem value="Gujar Khan">Gujar Khan</MenuItem>
                    <MenuItem value="Hafizabad">Hafizabad</MenuItem>
                    <MenuItem value="Haroonabad">Haroonabad</MenuItem>
                    <MenuItem value="Hasilpur">Hasilpur</MenuItem>
                    <MenuItem value="Haveli Lakha">Haveli Lakha</MenuItem>
                    <MenuItem value="Jatoi">Jatoi</MenuItem>
                    <MenuItem value="Jalalpur">Jalalpur</MenuItem>
                    <MenuItem value="Jattan">Jattan</MenuItem>
                    <MenuItem value="Jampur">Jampur</MenuItem>
                    <MenuItem value="Jaranwala">Jaranwala</MenuItem>
                    <MenuItem value="Jhang">Jhang</MenuItem>
                    <MenuItem value="Jhelum">Jhelum</MenuItem>
                    <MenuItem value="Kalabagh">Kalabagh</MenuItem>
                    <MenuItem value="Karor Lal Esan">Karor Lal Esan</MenuItem>
                    <MenuItem value="Kasur">Kasur</MenuItem>
                    <MenuItem value="Kamalia">Kamalia</MenuItem>
                    <MenuItem value="Kamoke">Kamoke</MenuItem>
                    <MenuItem value="Khanewal">Khanewal</MenuItem>
                    <MenuItem value="Khanpur">Khanpur</MenuItem>
                    <MenuItem value="Kharian">Kharian</MenuItem>
                    <MenuItem value="Khushab">Khushab</MenuItem>
                    <MenuItem value="Kot Addu">Kot Addu</MenuItem>
                    <MenuItem value="Jauharabad">Jauharabad</MenuItem>
                    <MenuItem value="Lahore">Lahore</MenuItem>
                    <MenuItem value="Lalamusa">Lalamusa</MenuItem>
                    <MenuItem value="Layyah">Layyah</MenuItem>
                    <MenuItem value="Liaquat Pur">Liaquat Pur</MenuItem>
                    <MenuItem value="Lodhran">Lodhran</MenuItem>
                    <MenuItem value="Malakwal">Malakwal</MenuItem>
                    <MenuItem value="Mamoori">Mamoori</MenuItem>
                    <MenuItem value="Mailsi">Mailsi</MenuItem>
                    <MenuItem value="Mandi Bahauddin">Mandi Bahauddin</MenuItem>
                    <MenuItem value="Mian Channu">Mian Channu</MenuItem>
                    <MenuItem value="Mianwali">Mianwali</MenuItem>
                    <MenuItem value="Multan">Multan</MenuItem>
                    <MenuItem value="Murree">Murree</MenuItem>
                    <MenuItem value="Muridke">Muridke</MenuItem>
                    <MenuItem value="Mianwali Bangla">Mianwali Bangla</MenuItem>
                    <MenuItem value="Muzaffargarh">Muzaffargarh</MenuItem>
                    <MenuItem value="Narowal">Narowal</MenuItem>
                    <MenuItem value="Nankana Sahib">Nankana Sahib</MenuItem>
                    <MenuItem value="Okara">Okara</MenuItem>
                    <MenuItem value="Renala Khurd">Renala Khurd</MenuItem>
                    <MenuItem value="Pakpattan">Pakpattan</MenuItem>
                    <MenuItem value="Pattoki">Pattoki</MenuItem>
                    <MenuItem value="Pir Mahal">Pir Mahal</MenuItem>
                    <MenuItem value="Qaimpur">Qaimpur</MenuItem>
                    <MenuItem value="Qila Didar Singh">Qila Didar Singh</MenuItem>
                    <MenuItem value="Rabwah">Rabwah</MenuItem>
                    <MenuItem value="Raiwind">Raiwind</MenuItem>
                    <MenuItem value="Rajanpur">Rajanpur</MenuItem>
                    <MenuItem value="Rahim Yar Khan">Rahim Yar Khan</MenuItem>
                    <MenuItem value="Rawalpindi">Rawalpindi</MenuItem>
                    <MenuItem value="Sadiqabad">Sadiqabad</MenuItem>
                    <MenuItem value="Safdarabad">Safdarabad</MenuItem>
                    <MenuItem value="Sahiwal">Sahiwal</MenuItem>
                    <MenuItem value="Sangla Hill">Sangla Hill</MenuItem>
                    <MenuItem value="Sarai Alamgir">Sarai Alamgir</MenuItem>
                    <MenuItem value="Sargodha">Sargodha</MenuItem>
                    <MenuItem value="Shakargarh">Shakargarh</MenuItem>
                    <MenuItem value="Sheikhupura">Sheikhupura</MenuItem>
                    <MenuItem value="Sialkot">Sialkot</MenuItem>
                    <MenuItem value="Sohawa">Sohawa</MenuItem>
                    <MenuItem value="Soianwala">Soianwala</MenuItem>
                    <MenuItem value="Siranwali">Siranwali</MenuItem>
                    <MenuItem value="Talagang">Talagang</MenuItem>
                    <MenuItem value="Taxila">Taxila</MenuItem>
                    <MenuItem value="Toba Tek Singh">Toba Tek Singh</MenuItem>
                    <MenuItem value="Vehari">Vehari</MenuItem>
                    <MenuItem value="Wah Cantonment">Wah Cantonment</MenuItem>
                    <MenuItem value="Wazirabad">Wazirabad</MenuItem>
                    <MenuItem value="" disabled>Sindh Cities</MenuItem>
                    <MenuItem value="Badin">Badin</MenuItem>
                    <MenuItem value="Bhirkan">Bhirkan</MenuItem>
                    <MenuItem value="Rajo Khanani">Rajo Khanani</MenuItem>
                    <MenuItem value="Chak">Chak</MenuItem>
                    <MenuItem value="Dadu">Dadu</MenuItem>
                    <MenuItem value="Digri">Digri</MenuItem>
                    <MenuItem value="Diplo">Diplo</MenuItem>
                    <MenuItem value="Dokri">Dokri</MenuItem>
                    <MenuItem value="Ghotki">Ghotki</MenuItem>
                    <MenuItem value="Haala">Haala</MenuItem>
                    <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                    <MenuItem value="Islamkot">Islamkot</MenuItem>
                    <MenuItem value="Jacobabad">Jacobabad</MenuItem>
                    <MenuItem value="Jamshoro">Jamshoro</MenuItem>
                    <MenuItem value="Jungshahi">Jungshahi</MenuItem>
                    <MenuItem value="Kandhkot">Kandhkot</MenuItem>
                    <MenuItem value="Kandiaro">Kandiaro</MenuItem>
                    <MenuItem value="Karachi">Karachi</MenuItem>
                    <MenuItem value="Kashmore">Kashmore</MenuItem>
                    <MenuItem value="Keti Bandar">Keti Bandar</MenuItem>
                    <MenuItem value="Khairpur">Khairpur</MenuItem>
                    <MenuItem value="Kotri">Kotri</MenuItem>
                    <MenuItem value="Larkana">Larkana</MenuItem>
                    <MenuItem value="Matiari">Matiari</MenuItem>
                    <MenuItem value="Mehar">Mehar</MenuItem>
                    <MenuItem value="Mirpur Khas">Mirpur Khas</MenuItem>
                    <MenuItem value="Mithani">Mithani</MenuItem>
                    <MenuItem value="Mithi">Mithi</MenuItem>
                    <MenuItem value="Mehrabpur">Mehrabpur</MenuItem>
                    <MenuItem value="Moro">Moro</MenuItem>
                    <MenuItem value="Nagarparkar">Nagarparkar</MenuItem>
                    <MenuItem value="Naudero">Naudero</MenuItem>
                    <MenuItem value="Naushahro Feroze">Naushahro Feroze</MenuItem>
                    <MenuItem value="Naushara">Naushara</MenuItem>
                    <MenuItem value="Nawabshah">Nawabshah</MenuItem>
                    <MenuItem value="Nazimabad">Nazimabad</MenuItem>
                    <MenuItem value="Qambar">Qambar</MenuItem>
                    <MenuItem value="Qasimabad">Qasimabad</MenuItem>
                    <MenuItem value="Ranipur">Ranipur</MenuItem>
                    <MenuItem value="Ratodero">Ratodero</MenuItem>
                    <MenuItem value="Rohri">Rohri</MenuItem>
                    <MenuItem value="Sakrand">Sakrand</MenuItem>
                    <MenuItem value="Sanghar">Sanghar</MenuItem>
                    <MenuItem value="Shahbandar">Shahbandar</MenuItem>
                    <MenuItem value="Shahdadkot">Shahdadkot</MenuItem>
                    <MenuItem value="Shahdadpur">Shahdadpur</MenuItem>
                    <MenuItem value="Shahpur Chakar">Shahpur Chakar</MenuItem>
                    <MenuItem value="Shikarpaur">Shikarpaur</MenuItem>
                    <MenuItem value="Sukkur">Sukkur</MenuItem>
                    <MenuItem value="Tangwani">Tangwani</MenuItem>
                    <MenuItem value="Tando Adam Khan">Tando Adam Khan</MenuItem>
                    <MenuItem value="Tando Allahyar">Tando Allahyar</MenuItem>
                    <MenuItem value="Tando Muhammad Khan">Tando Muhammad Khan</MenuItem>
                    <MenuItem value="Thatta">Thatta</MenuItem>
                    <MenuItem value="Umerkot">Umerkot</MenuItem>
                    <MenuItem value="Warah">Warah</MenuItem>
                    <MenuItem value="" disabled>Khyber Cities</MenuItem>
                    <MenuItem value="Abbottabad">Abbottabad</MenuItem>
                    <MenuItem value="Adezai">Adezai</MenuItem>
                    <MenuItem value="Alpuri">Alpuri</MenuItem>
                    <MenuItem value="Akora Khattak">Akora Khattak</MenuItem>
                    <MenuItem value="Ayubia">Ayubia</MenuItem>
                    <MenuItem value="Banda Daud Shah">Banda Daud Shah</MenuItem>
                    <MenuItem value="Bannu">Bannu</MenuItem>
                    <MenuItem value="Batkhela">Batkhela</MenuItem>
                    <MenuItem value="Battagram">Battagram</MenuItem>
                    <MenuItem value="Birote">Birote</MenuItem>
                    <MenuItem value="Chakdara">Chakdara</MenuItem>
                    <MenuItem value="Charsadda">Charsadda</MenuItem>
                    <MenuItem value="Chitral">Chitral</MenuItem>
                    <MenuItem value="Daggar">Daggar</MenuItem>
                    <MenuItem value="Dargai">Dargai</MenuItem>
                    <MenuItem value="Darya Khan">Darya Khan</MenuItem>
                    <MenuItem value="Dera Ismail Khan">Dera Ismail Khan</MenuItem>
                    <MenuItem value="Doaba">Doaba</MenuItem>
                    <MenuItem value="Dir">Dir</MenuItem>
                    <MenuItem value="Drosh">Drosh</MenuItem>
                    <MenuItem value="Hangu">Hangu</MenuItem>
                    <MenuItem value="Haripur">Haripur</MenuItem>
                    <MenuItem value="Karak">Karak</MenuItem>
                    <MenuItem value="Kohat">Kohat</MenuItem>
                    <MenuItem value="Kulachi">Kulachi</MenuItem>
                    <MenuItem value="Lakki Marwat">Lakki Marwat</MenuItem>
                    <MenuItem value="Latamber">Latamber</MenuItem>
                    <MenuItem value="Madyan">Madyan</MenuItem>
                    <MenuItem value="Mansehra">Mansehra</MenuItem>
                    <MenuItem value="Mardan">Mardan</MenuItem>
                    <MenuItem value="Mastuj">Mastuj</MenuItem>
                    <MenuItem value="Mingora">Mingora</MenuItem>
                    <MenuItem value="Nowshera">Nowshera</MenuItem>
                    <MenuItem value="Paharpur">Paharpur</MenuItem>
                    <MenuItem value="Pabbi">Pabbi</MenuItem>
                    <MenuItem value="Peshawar">Peshawar</MenuItem>
                    <MenuItem value="Saidu Sharif">Saidu Sharif</MenuItem>
                    <MenuItem value="Shorkot">Shorkot</MenuItem>
                    <MenuItem value="Shewa Adda">Shewa Adda</MenuItem>
                    <MenuItem value="Swabi">Swabi</MenuItem>
                    <MenuItem value="Swat">Swat</MenuItem>
                    <MenuItem value="Tangi">Tangi</MenuItem>
                    <MenuItem value="Tank">Tank</MenuItem>
                    <MenuItem value="Thall">Thall</MenuItem>
                    <MenuItem value="Timergara">Timergara</MenuItem>
                    <MenuItem value="Tordher">Tordher</MenuItem>
                    <MenuItem value="" disabled>Balochistan Cities</MenuItem>
                    <MenuItem value="Awaran">Awaran</MenuItem>
                    <MenuItem value="Barkhan">Barkhan</MenuItem>
                    <MenuItem value="Chagai">Chagai</MenuItem>
                    <MenuItem value="Dera Bugti">Dera Bugti</MenuItem>
                    <MenuItem value="Gwadar">Gwadar</MenuItem>
                    <MenuItem value="Harnai">Harnai</MenuItem>
                    <MenuItem value="Jafarabad">Jafarabad</MenuItem>
                    <MenuItem value="Jhal Magsi">Jhal Magsi</MenuItem>
                    <MenuItem value="Kacchi">Kacchi</MenuItem>
                    <MenuItem value="Kalat">Kalat</MenuItem>
                    <MenuItem value="Kech">Kech</MenuItem>
                    <MenuItem value="Kharan">Kharan</MenuItem>
                    <MenuItem value="Khuzdar">Khuzdar</MenuItem>
                    <MenuItem value="Killa Abdullah">Killa Abdullah</MenuItem>
                    <MenuItem value="Killa Saifullah">Killa Saifullah</MenuItem>
                    <MenuItem value="Kohlu">Kohlu</MenuItem>
                    <MenuItem value="Lasbela">Lasbela</MenuItem>
                    <MenuItem value="Lehri">Lehri</MenuItem>
                    <MenuItem value="Loralai">Loralai</MenuItem>
                    <MenuItem value="Mastung">Mastung</MenuItem>
                    <MenuItem value="Musakhel">Musakhel</MenuItem>
                    <MenuItem value="Nasirabad">Nasirabad</MenuItem>
                    <MenuItem value="Nushki">Nushki</MenuItem>
                    <MenuItem value="Panjgur">Panjgur</MenuItem>
                    <MenuItem value="Pishin Valley">Pishin Valley</MenuItem>
                    <MenuItem value="Quetta">Quetta</MenuItem>
                    <MenuItem value="Sherani">Sherani</MenuItem>
                    <MenuItem value="Sibi">Sibi</MenuItem>
                    <MenuItem value="Sohbatpur">Sohbatpur</MenuItem>
                    <MenuItem value="Washuk">Washuk</MenuItem>
                    <MenuItem value="Zhob">Zhob</MenuItem>
                    <MenuItem value="Ziarat">Ziarat</MenuItem>
                    
                
                                </Select>
                    
                 <InputLabel id="province">Province : </InputLabel>
                        <Select
                                labelId="type"
                                
                                defaultValue={"Punjab"}
                                id="province"
                                name="province"
                                value={province}
                                label="Province"
                                onChange={handleChange}
                                validators={[
                                    'required'                                
                                ]}
                                style ={{marginBottom:'16px',width:'100%'}}
                                errorMessages={['this field is required']}
                        >
                    <MenuItem value={"Punjab"} >Punjab</MenuItem>
                    <MenuItem value={"Khyber Pakhtunkhwa"}>Khyber Pakhtunkhwa</MenuItem>
                    <MenuItem value={"Balochistan"}>Balochistan</MenuItem>
                    <MenuItem value={"sindh"}>Sindh</MenuItem>
                    <MenuItem value={"Gilgit Baltistan"}>Gilgit Baltistan</MenuItem>
        
    
                    </Select>
                    
        
                    
                        
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                
            
                    <InputLabel id="providertype">Distributed by : </InputLabel>
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
                    <MenuItem value={"Fund Raised"}>Fund Raised</MenuItem>
                    <MenuItem value={"Trust Welfare"}>Trust Welfare</MenuItem>s
        
    
                    </Select>
                   
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
                        <MenuItem value={"Cash Given"}>Cash Given</MenuItem>
                        <MenuItem value={"Wire Transfer"}>Wire Transfer</MenuItem>
                        
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
                        Add Distribution Details
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
                        { name: 'Distribute Funds', path: '/funds/distribute' },
                        { name: 'Distribute Funds',}
                    ]}
                />
            </div>
            
            <SimpleCard title="Add Distribute Funds">                
            {form}         
            </SimpleCard>
            <Box py="12px" />
        </Container>
      
           


            
        </div>
    )
}

export default AddDistributeForm

