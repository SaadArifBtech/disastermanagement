import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'app/components'
import { Box, styled } from '@mui/system'
import { Button , Grid} from '@mui/material'
// import { Link } from 'react-router-dom'
import SimpleCard from 'app/components/cards/SimpleCard'
import Stats from 'app/components/Stats/Stats'
import Loader from 'app/components/Loader/Loader'
import axios from 'axios'
import bal_floods from '../../../../assets/shapfiles/flooded_balochistan.json'
import LeafletMap from 'app/components/LeafletMap/LeafletMap'
import balochistan from '../../../../assets/shapfiles/balochistan/blchstn.json'



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

const BalochistanPage = () => {
    const balochistanPosition = {lat: 28.4907, lng: 65.0958}
    const [loading, setLoading] = useState(false)
    const [report, setReport] = useState(null)

    useEffect(()=>{
            (async ()=>{
                try{
                    const res = await axios.post('/api2/get-province-stats', {province: "Balochistan"})
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
    if(report){
        stats =  <Stats stats={report}></Stats>
    }
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Dashboard', path: '/dashboard' },
                        { name: 'Provincial', path: '/provincial' },
                        { name: 'Balochistan' },
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
                            {/* {!isDistrictwise && <AppButton variant="contained" color="primary" click={districtClickHandler}>
                                Check for Districts 
                            </AppButton>} */}
                        </Grid>
                        <Grid item sm={1}></Grid>                        
                        <Grid item sm={4}>
                            <LeafletMap shape={balochistan} floods={bal_floods}  position={balochistanPosition} color="red"  fillColor="yellow"/>
                        </Grid>
                    </Grid>
               
            </SimpleCard>            
        </Container>
    )
}

export default BalochistanPage
