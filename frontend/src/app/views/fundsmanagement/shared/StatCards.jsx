import React from 'react'
import { Grid, Card, Icon, IconButton, Tooltip } from '@mui/material'
import { Box, styled } from '@mui/system'
import { Small } from 'app/components/Typography'
import useAuth from 'app/hooks/useAuth'
import { Link } from 'react-router-dom'
import axios from 'axios.js'

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px !important',
    background: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
        padding: '16px !important',
    },
}))

const ContentBox = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    '& small': {
        color: theme.palette.text.secondary,
    },
    '& .icon': {
        opacity: 0.6,
        fontSize: '44px',
        color: theme.palette.primary.main,
    },
}))

const Heading = styled('h6')(({ theme }) => ({
    margin: 0,
    marginTop: '4px',
    fontWeight: '500',
    fontSize: '14px',
    color: theme.palette.primary.main,
}))

const StatCards = ({name}) => {
    const {user} = useAuth()
    const [users, setUsers] = React.useState(0);
    const [emergencyCamps, setEmergencyCamps] = React.useState(10);
    const [resources, setResources] = React.useState(0);
    
    React.useEffect(async()=>{
        // getting all users from server
        try{
            const usersRes = await axios.get('/api/overviewresource')
            setUsers(usersRes.data.length-1)
        }
        catch(e){
            console.log(e.message)
        }


        // getting all camps from server
        try{
            const campsRes = await axios.get('/api/emergency-camps/view')
            setEmergencyCamps(campsRes.data.length)            
        }
        catch(e){
            console.log('Something went wrong')
        }
        try{
            const resourceRes = await axios.get('/api/resources/view')
            setResources(resourceRes.data.length)            
        }
        catch(e){
            console.log('Something went wrong')
        }
    }, [emergencyCamps, users])
    

    return (
        <Grid container spacing={3} sx={{ mb: '24px' }}>
            {user.role == 'Superadmin' && 
                <Grid item xs={12} md={6}>
                    <StyledCard elevation={6}>
                        <ContentBox>
                            <Icon className="icon">group</Icon>
                            <Box ml="12px">
                                <Small>Users</Small>
                                <Heading>{users}</Heading>
                            </Box>
                        </ContentBox>
                        <Tooltip title="View Details" placement="top">
                            <IconButton>
                                <Link to="/users">
                                    <Icon >arrow_right_alt</Icon>
                                </Link>                                
                            </IconButton>
                        </Tooltip>
                    </StyledCard>
                </Grid>
            }          
            <Grid item xs={12} md={6}>
                <StyledCard elevation={6}>
                    <ContentBox>
                        <Icon className="icon">store</Icon>
                        <Box ml="12px">
                            <Small>Total Emergency Camps</Small>
                            <Heading>{emergencyCamps}</Heading>
                        </Box>
                    </ContentBox>
                    <Tooltip title="View Details" placement="top">
                        <IconButton>
                             <Link to="/emergency-camps">
                                    <Icon >arrow_right_alt</Icon>
                            </Link>      
                        </IconButton>
                    </Tooltip>
                </StyledCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <StyledCard elevation={6}>
                    <ContentBox>
                        <Icon className="icon">shopping_cart</Icon>
                        <Box ml="12px">
                            <Small>Resources</Small>
                            <Heading>{resources}</Heading>
                        </Box>
                    </ContentBox>
                    <Tooltip title="View Details" placement="top">
                        <IconButton>
                            <Icon>arrow_right_alt</Icon>
                        </IconButton>
                    </Tooltip>
                </StyledCard>
            </Grid>
        </Grid>
    )
}

export default StatCards
