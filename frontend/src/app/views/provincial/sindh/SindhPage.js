import React, { useEffect, useState } from 'react'
import { Breadcrumb} from 'app/components'
import { Box, styled } from '@mui/system'
import { Icon, Button, IconButton, Fab , Grid} from '@mui/material'
import { Link } from 'react-router-dom'
import SimpleCard from 'app/components/cards/SimpleCard'
import Stats from 'app/components/Stats/Stats'
import Loader from 'app/components/Loader/Loader'
import axios from 'axios'
import AppButton from 'app/components/Button/Button'
import AppSelect from 'app/components/Select/Select'


import LeafletMap from 'app/components/LeafletMap/LeafletMap'
import sindh_floods from '../../../../assets/shapfiles/sindh_flood_extent.json'
import sindh from '../../../../assets/shapfiles/sindh/sndh.json'
import { SINDH_DISTRICTS } from './districts'

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

const SindhPage = () => {
    const sindhPosition = {lat: 25.8943, lng: 68.5247}
    const [report, setReport] = useState(null)
    const [district, setDistrict] = useState("")
    const [isDistrictwise, setIsDistrictwise] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        (async ()=>{
            try{
                const res = await axios.post('/api2/get-province-stats', {province: "Sindh"})
                setReport(res.data)                
            }
            catch(e){
                console.log(e)
            }
        })()
    }, [])

    let stats = (
        <>
            <Loader />
            <p style={{textAlign: "center"}}>Please wait while we are Analysing...</p>
        </>
            )

    if(loading===true){
        stats =  <>
                    <Loader />
                    <p style={{textAlign: "center"}}>Please wait while we are Analysing...</p>
                </>
    }        

    if(report){
        stats = (
            <Stats stats={report}></Stats>
        )
    }

  


     const districtClickHandler = () => {
        setIsDistrictwise(true)
     }

     const districtSubmitHandler = async() => {
        setLoading(true)
        axios.post('/api2/get-district-stats', {"district": district.toUpperCase()})
        .then(res=>{
            setLoading(false)
            setReport(res.data)
            setIsDistrictwise(false)
        })
        .catch(e=>{
            console.log(e)
        })

        // try{                        
        //     const res = await axios.post('/api2/get-district-stats', {"district": district.toUpperCase()})
        //     setLoading(false)
        //     setReport(res.data)
        //     setIsDistrictwise(false)
            
        // }catch(e){
        //     console.log(e)
        // }
     }


     if(isDistrictwise){
        stats = (
            <>
                <h4>Choose the district from the following list for checking stats</h4>
                <AppSelect options={SINDH_DISTRICTS} label="Choose District" change={setDistrict} default={district}/>
                <AppButton variant="contained" color="info" click={districtSubmitHandler}>
                        Analyze
                </AppButton>
            </>
            )
     }
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Dashboard', path: '/dashboard' },
                        { name: 'Provincial', path: '/provincial' },
                        { name: 'Sindh' },
                    ]}
                />
            </div>             
         
            <Box py="12px" />   
            <SimpleCard>
                    <Grid container>
                        <Grid item sm={7}>
                            {loading && <>
                                <Loader />
                                <p style={{textAlign: "center"}}>Please wait while we are Analysing...</p>
                            </>}
                            {stats}
                            {!isDistrictwise && <AppButton variant="contained" color="primary" click={districtClickHandler}>
                                Check for Districts 
                            </AppButton>}
                        </Grid>
                        <Grid item sm={1}></Grid>                        
                        <Grid item sm={4}>
                            <LeafletMap shape={sindh} floods={sindh_floods}  position={sindhPosition} color="red"  fillColor="yellow"/>
                        </Grid>
                    </Grid>
               
            </SimpleCard>         
             
         
        </Container>
    )
}

export default SindhPage
