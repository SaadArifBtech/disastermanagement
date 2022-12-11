import React from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import { Icon, Button, IconButton, Fab , Grid} from '@mui/material'
import { Link } from 'react-router-dom'

import ListDistribution from './ListDistribution.js'


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

const DistributionPage = () => {
 
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Dashboard', path: '/dashboard' },
                        { name: 'Distribution page' },
                    ]}
                />
            </div>             
         
            <Box py="12px" />  
            <SimpleCard title="Distribution page">
                <ListDistribution />
            </SimpleCard>                      
        </Container>
    )
}

export default DistributionPage
