import React from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import { Icon, Button, IconButton, Fab , Grid} from '@mui/material'
import { Link } from 'react-router-dom'

import ListResource from './ListResource.js'


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

const ResourcePage = () => {
 
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Dashboard', path: '/dashboard' },
                        { name: 'Resources' },
                    ]}
                />
            </div>             
         
            <Box py="12px" />  
            <SimpleCard title="Resources">
                <ListResource />
            </SimpleCard>                      
        </Container>
    )
}

export default ResourcePage