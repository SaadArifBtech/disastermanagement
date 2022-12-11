import React from 'react'
import Auxilary from 'app/hoc/Auxilary'
import { Grid} from '@mui/material'
import AppButton from 'app/components/Button/Button'
import { Link } from 'react-router-dom'
import LeafletMap from 'app/components/LeafletMap/LeafletMap'
import useAuth from 'app/hooks/useAuth'
import SimpleCard from 'app/components/cards/SimpleCard'
import punjab from '../../../assets/shapfiles/punjab/pnjb.json'
import kp from '../../../assets/shapfiles/kpk/kp.json'
import balochistan from '../../../assets/shapfiles/balochistan/blchstn.json'
import sindh from '../../../assets/shapfiles/sindh/sndh.json'
import fata from '../../../assets/shapfiles/fata/fta.json'
import gb from '../../../assets/shapfiles/gb/gbstn.json'

// Damage shape files
import sindh_floods from '../../../assets/shapfiles/sindh_flood_extent.json'


const ProvincialMaps = () => {
    const provinceContainer = {
        padding: "30px",
        margin: '10px'
    }
    const row = {
        marginBottom: "10px"
    }
    const header = {
        display: "flex",  
        justifyContent: "space-between"      
    }

    const {user} = useAuth()
    const sindhPosition = {lat: 25.8943, lng: 68.5247}
    const punjabPosition = {lat: 31.1704, lng: 72.7097}
    const kpkPosition = {lat: 34.9526, lng: 72.3311}
    const balochistanPosition = {lat: 28.4907, lng: 65.0958}
    const fataPosition = {lat: 32.6675, lng: 69.8597}
    const gbPosition = {lat: 35.8819, lng: 74.4643}

    let maps = (
        <Grid container>            
            <Grid item md={6} sm={12} style={row}>
                <SimpleCard style={provinceContainer}>                                     
                        <h1>Punjab</h1>                                            
                        <LeafletMap shape={punjab}  position={punjabPosition} color="red" fillColor="red"/>
                        <div style={header}>
                            <p>National Provincial Boundary of Punjab 2022</p>
                            {/* <Link to="/provincial/punjab">
                                <AppButton
                                    color="success"
                                    variant="contained"                                                      
                                    style={{marginLeft: "auto"}}
                                    >View Flood Mapping
                                </AppButton>
                            </Link> */}
                        </div>                    
                </SimpleCard>
            </Grid>
            <Grid item md={6} sm={12}   style={row}>
                <SimpleCard style={provinceContainer}> 
                        <h1>Sindh</h1>
                    <LeafletMap shape={sindh}  position={sindhPosition} color="red"  fillColor="green"/>
                    <div style={header}>
                            <p>National Provincial Boundary of Sindh 2022</p>
                            <Link to="/provincial/sindh">
                                <AppButton
                                    color="success"
                                    variant="contained"                                                      
                                    style={{marginLeft: "auto"}}
                                    >View Flood Mapping
                                </AppButton>
                            </Link>
                        </div>                    
                </SimpleCard> 
            </Grid>
            <Grid item md={6} sm={12}  style={row}>
                <SimpleCard style={provinceContainer}> 
                    <h1>Balochistan</h1>
                    <LeafletMap shape={balochistan} position={balochistanPosition} color="red" fillColor="yellow" />
                    <div style={header}>
                            <p>National Provincial Boundary of Balochistan 2022</p>
                            <Link to="/provincial/balochistan">
                                <AppButton
                                    color="success"
                                    variant="contained"                                                      
                                    style={{marginLeft: "auto"}}
                                    >View Flood Mapping
                                </AppButton>
                            </Link>
                        </div>                    
                </SimpleCard>
            </Grid>
            <Grid item md={6} sm={12} style={row}>
                <SimpleCard style={provinceContainer}>                 
                    <h1>Khyber Pakhtunkhwa</h1>
                    <LeafletMap shape={kp} position={kpkPosition} color="red" fillColor="orange"/>
                    <div style={header}>
                            <p>National Provincial Boundary of Kpk 2022</p>
                            <Link to="/provincial/kpk">
                                <AppButton
                                    color="success"
                                    variant="contained"                                                      
                                    style={{marginLeft: "auto"}}
                                    >View Flood Mapping
                                </AppButton>
                            </Link>
                        </div>                    
                </SimpleCard>
            </Grid>
            {/* <Grid item md={6} sm={12} style={row}>
                <SimpleCard style={provinceContainer}>                 
                    <h1>FATA</h1>
                    <LeafletMap shape={fata} position={fataPosition} color="red" fillColor="skyblue" />
                </SimpleCard>
            </Grid>
            <Grid item md={6} sm={12} style={row}>
                <SimpleCard style={provinceContainer}>                 
                    <h1>Gilgit Baltistan</h1>
                    <LeafletMap shape={gb} position={gbPosition} color="red" fillColor="purple"/>
                </SimpleCard>
            </Grid> */}
        </Grid>
    )
    if(user.province == "Punjab"){
        maps = (
            <Grid container>
                <Grid item sm={12}>
                    <div style={provinceContainer}>
                        <h1>Punjab</h1>
                        <LeafletMap shape={punjab}  position={punjabPosition} color="red" fillColor="red"/>
                    </div>
                </Grid>
            </Grid>
        ) 
    }
    else if(user.province == "Khyber Pakhtunkhwa"){
        maps = (
            <Grid container>
                <Grid item sm={12}>
                    <div style={provinceContainer}  >
                        <h1>Khyber Pakhtunkhwa</h1>
                        <LeafletMap shape={kp} position={kpkPosition} color="red" fillColor="orange"/>
                    </div>
                </Grid>
            </Grid>
        )
    }
    else if(user.province == "Sindh"){
        maps = (
            <Grid container>
                <Grid item sm={12}>
                    <div style={provinceContainer}>
                        <h1>Sindh</h1>
                        <LeafletMap shape={sindh} floods={sindh_floods} position={sindhPosition} color="red"  fillColor="green"/>
                    </div>
                </Grid>
            </Grid>
            )
    }
    else if(user.province == "Balochistan"){
        maps = (
            <Grid container>
                <Grid item sm={12}>
                    <div style={provinceContainer}>
                        <h1>Balochistan</h1>
                        <LeafletMap shape={balochistan} position={balochistanPosition} color="red" fillColor="yellow" />
                    </div>
                </Grid>
            </Grid>
        )
    }


  return (
    <Auxilary>
        {maps}
    </Auxilary>
  )
}

export default ProvincialMaps