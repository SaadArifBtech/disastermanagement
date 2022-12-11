import React from 'react'
import UsersTable from './UsersTable'
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

const AppTable = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Dashboard', path: '/dashboard' },
                        { name: 'Users' },
                    ]}
                />
            </div> 
            <Grid container>
                <Grid item xs={5}> 
                    
                </Grid>
                <Grid item xs={5}>
                   
                </Grid>
                
                <Grid item xs={2}>
                    <Link to='/user/add'>
                        <StyledButton
                            color="success"
                            className="button"
                            aria-label="Add user"
                            variant="contained" 
                        >
                        
                            <Icon>add</Icon> Add User
                        </StyledButton>
                    </Link>
                </Grid>
                
            </Grid>
         

            <Box py="12px" />
            <SimpleCard title="Users">
                <UsersTable />
            </SimpleCard>
        </Container>
    )
}

export default AppTable
