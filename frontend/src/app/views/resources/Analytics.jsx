import React, { Fragment } from 'react'
import StatCards from './shared/StatCards'
import { Grid, Card } from '@mui/material'
import { styled, useTheme } from '@mui/system'
import ComparisonChart from './shared/charts/chart'
import ScrollText from 'app/components/ScrollText/ScrollText'
import SimpleCard from 'app/components/cards/SimpleCard'
// import LeafletMap from 'app/components/LeafletMap/LeafletMap'
import shape from '../../../assets/shapfiles/pakistan.json'
import floods from '../../../assets/shapfiles/flooded.json'


const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
}))

const SubTitle = styled('span')(({ theme }) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
}))

const H4 = styled('h4')(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '16px',
    textTransform: 'capitalize',
    color: theme.palette.text.secondary,
}))

const Analytics = () => {
    const { palette } = useTheme()

    return (
        <Fragment>
            <ContentBox className="analytics">
              
                <Grid container spacing={3}>
                   
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                    <SimpleCard style = {{height: "300px"}}>
                        <h4 style={{textAlign:'center'}}>All Punjab Resources</h4>
                        <StatCards name={"Punjab"}/>       
                       
                        </SimpleCard>  
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                        <SimpleCard style = {{height: "300px"}}>
                        <h4 style={{textAlign:'center'}}>All Sindh Resources</h4>
                        
                        <StatCards name={"Sindh"}/>   
                        </SimpleCard>  
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                        <SimpleCard style = {{height: "300px"}}>
                        <h4 style={{textAlign:'center'}}>All Balochistan Resources</h4>     
                        <StatCards name={"balochistan"}/>    
                        </SimpleCard>    
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <SimpleCard style = {{height: "300px"}}>
                        <h4 style={{textAlign:'center'}}>All KPK Resources</h4>     
                        <StatCards name={"balochistan"}/>    
                        </SimpleCard>    
                    </Grid>
                    
                </Grid>
            </ContentBox>
           
        </Fragment>
    )
}

export default Analytics
