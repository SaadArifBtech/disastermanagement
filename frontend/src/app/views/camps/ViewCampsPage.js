import React from 'react'
import ViewCampsTable from './ViewCampsTable'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import { Icon, Button, IconButton, Fab , Grid} from '@mui/material'
import { Link } from 'react-router-dom'
import LeafletMap from 'app/components/LeafletMap/LeafletMap'
import pakistan from '../../../assets/shapfiles/pakistan.json'


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

const ViewCampsPage = () => {

    const [markers, setMarkers] = React.useState(null)    
 
    return (        
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Dashboard', path: '/dashboard' },
                        { name: 'Emergency Camps' },
                    ]}
                />
            </div> 
            <Grid container>
          
                <Grid item xs={12}>
                    <Link to='/emergency-camp/add'>
                        <StyledButton
                            color="info"
                            className="button"
                            aria-label="Add user"
                            variant="contained" 
                        >                        
                            <Icon>add</Icon> Add New Rescue Area
                        </StyledButton>
                    </Link>
                </Grid>                
            </Grid>                             
            <LeafletMap shape={pakistan} fillColor="blue" color="red" markers={markers}/>
            <Box py="12px" />
            <SimpleCard title="Emergency Camps">
                <ViewCampsTable setMarkers = {setMarkers}/>
            </SimpleCard>
        </Container>
    )
}

export default ViewCampsPage
