import React, { Component } from 'react'
import { Grid, Card, Icon, IconButton, Tooltip } from '@mui/material'
import { Box, styled } from '@mui/system'
import { Small } from 'app/components/Typography'
import useAuth from 'app/hooks/useAuth'
import { Link } from 'react-router-dom'
import Loader from 'app/components/Loader/Loader'
import Auxilary from 'app/hoc/Auxilary'
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

class StatCards extends Component {        
    state = {
        reg: null,
        loading: false
    }      
    // React.useEffect(async()=>{
    //     // getting all users from server
    //     try{
    //         const res = await axios.get(`/api/emergency-camps/${props.id}`)
    //         console.log('regs' + res.data[0])
    //         setReg(res.data[0])
    //     }
    //     catch(e){
    //         console.log(e.message)
    //     }
        
    // }, [reg])

        
    loadData(){
        this.setState({
            loading: true
        })
        axios.get(`/api/emergency-camps/${this.props.id}`)
        .then(response=>{
            this.setState({
               reg: response.data[0],
               loading: false
            })
        })
        .catch(err=>{
            console.log("[StatCards] " + err)
        })
                        
    }
    render(){
        let data = null
        if(this.state.reg){
            data = (
                <Grid container spacing={3} sx={{ mb: '24px' }}>
                    
                    <Grid item xs={12} md={4}>
                        <StyledCard elevation={6}>
                            <ContentBox>
                                <Icon className="icon">festival</Icon>
                                <Box ml="12px" >
                                    <Small>Avaialble Slots</Small>                                
                                </Box>
                            </ContentBox>                    
                            <Tooltip title="View Details" placement="top">
                                <Heading>{this.state.reg.slots}</Heading>
                            </Tooltip>
                        </StyledCard>
                    </Grid>
                        
                <Grid item xs={12} md={4}>
                    <StyledCard elevation={6}>
                        <ContentBox>
                            <Icon className="icon">boy</Icon>
                            <Box ml="12px">
                                <Small>Registered Effectees</Small>                           
                            </Box>
                        </ContentBox>
                        <Tooltip title="View Details" placement="top">
                            <Heading>{this.state.reg.registerations}</Heading>
                        </Tooltip>
                    </StyledCard>
                </Grid>
                <Grid item xs={12} md={4}>
                    <StyledCard elevation={6}>
                        <ContentBox>
                            <Icon className="icon">festival</Icon>
                            <Box ml="12px">
                                <Small>Total Slots</Small>
                                
                            </Box>
                        </ContentBox>
                        <Tooltip title="View Details" placement="top">
                            <Heading>{this.state.reg.registerations + this.state.reg.slots}</Heading>
                        </Tooltip>
                    </StyledCard>
                </Grid>
            </Grid>
            )
        }
        return (
            <Auxilary>
                {data}
            </Auxilary>            
        )
    }

    componentDidMount(){
        this.loadData()
    }

    componentDidUpdate(prevProps){
        if(this.props.id !== prevProps.id ){
            this.loadData() 
        }
    }
   
}

export default StatCards
