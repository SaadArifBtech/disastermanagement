import React from 'react'
import AllRegisterationsTable from './AllRegisterationsTable'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'

import { Link } from 'react-router-dom'

import { Icon, Button, IconButton, Fab , Grid} from '@mui/material'

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

const RegisterationsPage = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Dashboard', path: '/dashboard' },
                        { name: 'Registerations' },
                    ]}
                />
            </div> 
            <Grid container>
          
                {/* <Grid item xs={12}>
                    <Link to='/emergency-camp/add'>
                        <StyledButton
                            color="info"
                            className="button"
                            aria-label="Add user"
                            variant="contained" 
                        >
                        
                            <Icon>add</Icon> Add New Emergency Camp
                        </StyledButton>
                    </Link>
                </Grid> */}
                
            </Grid>
         

            <Box py="12px" />
            <SimpleCard title="All Registerations">
                <AllRegisterationsTable />
            </SimpleCard>
        </Container>
    )
}

export default RegisterationsPage
