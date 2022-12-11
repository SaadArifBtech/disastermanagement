import React from 'react'
import { SimpleCard } from 'app/components'
import { Grid, Stack, Chip} from '@mui/material'
import {H6 } from 'app/components/Typography'
import Auxilary from 'app/hoc/Auxilary'
const DetailsCard = (props) => {

    const elStyle={
        display : "flex",
        justifyContent: "space-between",
        marginTop: "16px",
        marginBottom: "16px"
    }
    let chip = <Stack direction="row" spacing={1}> <Chip label="Disabled" sx={{width: "100px"}} color="error" /> </Stack>
    if(props.details.allowed_registerations){
        chip = <Stack direction="row" spacing={1}> <Chip label="Allowed" sx={{width: "100px"}} color="success" /> </Stack>
    }
  return (
    <Auxilary>
        <h3>Area Details</h3>
        <SimpleCard title={props.details['name'] +' Details'}>
            <Grid container spacing={2}>
                <Grid item md={6} sm={12}>
                    <div style={elStyle}>
                        <H6>Name</H6>
                        <span>{props.details.name}</span>
                    </div>
                    <hr/>
                    <div style={elStyle}>
                        <H6>City</H6>
                        <span>{props.details.city}</span>
                    </div>
                    <hr />
                    <div style={elStyle}>
                        <H6>Province</H6>
                        <span>{props.details.province}</span>
                    </div>
                    <hr/>
                    <div style={elStyle}>
                        <H6>Local Address</H6>
                        <span>{props.details.local_address}</span>
                    </div>
                    <hr/>
                    <div style={elStyle}>
                        <H6>Registeration Status</H6>
                        <span>{chip}</span>
                    </div>
                    <hr/>
                    <div style={elStyle}>
                        <H6>Registered Count</H6>
                        <span>{props.details.registerations}</span>
                    </div>
                </Grid>
                <Grid item md={6} sm={12}>
                <div style={elStyle}>
                        <H6>Main Address</H6>
                        <span>{props.details.address}</span>
                    </div>
                    <hr/>
                    <div style={elStyle}>
                        <H6>Area Covered</H6>
                        <span>{props.details.area}</span>
                    </div>
                    <hr/>
                    <div style={elStyle}>
                        <H6>Avaialble Slots</H6>
                        <span>{props.details.slots }</span>
                    </div>
                    <hr/>
                    <div style={elStyle}>
                        <H6>Created by</H6>
                        <span>{props.creater }</span>
                    </div>
                    <hr/>
                    <div style={elStyle}>
                        <H6>Created at</H6>
                        <span>{props.details.createdAt.split('T')[0]}</span>
                    </div>
                </Grid>
                
            </Grid>
        </SimpleCard>
    </Auxilary>
  )
}

export default DetailsCard