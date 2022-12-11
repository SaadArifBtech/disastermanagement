import React from 'react'
import AddUserForm from './AddUserForm'
import { Breadcrumb, SimpleCard } from 'app/components'
import ErrorBoundary from 'app/components/ErrorBoundary'
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

const AddUserPage = () => {
    return (
        <Container>
            <div className="breadcrumb">
              <Breadcrumb
                    routeSegments={[
                        { name: 'Dashboard', path: '/dashboard' },
                        { name: 'Users', path: '/users' },
                        { name: 'Add User',},
                    ]}
                />
            </div>
            <SimpleCard title="Add User">                
                <AddUserForm />               
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AddUserPage
