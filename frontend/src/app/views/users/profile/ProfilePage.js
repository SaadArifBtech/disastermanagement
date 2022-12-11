import React from 'react'
import { Breadcrumb} from 'app/components'
import { Box, styled } from '@mui/system'
import ProfileContent from './ProfileContent'
import { H2 } from 'app/components/Typography'
import MatxDevider from 'app/components/MatxDivider/MatxDivider'

 
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

const ProfilePage = () => {
    return (
        <Container>
            <div className="breadcrumb">
              <Breadcrumb
                    routeSegments={[
                        { name: 'Dashboard', path: '/dashboard' },
                        { name: 'Profile', }                        
                    ]}
                />
            </div>
                {/* <H2>Details</H2>
                <MatxDevider /> */}
                <ProfileContent />
            {/* <SimpleCard title="Profile">                
                     <ProfileContent />
            </SimpleCard> */}
            <Box py="12px" />
        </Container>
    )
}

export default ProfilePage
