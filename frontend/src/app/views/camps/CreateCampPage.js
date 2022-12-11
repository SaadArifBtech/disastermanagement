import React from 'react'
import AddCampForm from './AddCampForm'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'




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




const CreateCampPage = () => {
    
    return (
        <Container>
            <div className="breadcrumb">
              <Breadcrumb
                    routeSegments={[
                        { name: 'Dashboard', path: '/dashboard' },
                        { name: 'Rescue Camps', path: '/emergency-camps' },
                        { name: 'Add Rescue Camps',}
                    ]}
                />
            </div>
            
            <SimpleCard title="Add Rescue Area">                
                <AddCampForm />               
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default CreateCampPage
