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
   const [total , setTotal] = React.useState(0);
  const [totalVehicle,setVehicle]= React.useState(0);
  const [totalequip,setEquip]= React.useState(0);
  const [totalsmallmachine,setsMachine]= React.useState(0);
  const [totallargemachine,setLMachine]= React.useState(0);
  const [totalhandtool,sethtool]= React.useState(0);
  const [totalsupplyitem,setsupplyitem]= React.useState(0);
  const [totalother,setother]= React.useState(0);
  let vehicle = 0;
  let handtool=0;
  let smallhand =0;
  let supply =0;
  let other =0;
  let equip = 0;
  let Lhand=0;
  React.useEffect(async()=>{
      
        // getting all users from server
        try{
            const Resources = await axios.get('/api/resources/view');
            
            const collector = Resources.data.map((item,key={item})=>
            {
                if(item.Location_assigned == name){
                if(item.type_of_resource=="Vehicle" ){
                        vehicle = vehicle+ item.Quantity;
                        setVehicle(vehicle);
                }
                if(item.type_of_resource=="Hand tools"){
                   handtool =handtool+item.Quantity;
                   
                    sethtool(handtool);
                }
                if(item.type_of_resource=="small Machine"){
                    smallhand = smallhand+item.Quantity;

                    setsMachine(smallhand);
                }
                if(item.type_of_resource=="supply items"){
                    supply = supply+item.Quantity;
                    setsupplyitem(supply);
                }
                if(item.type_of_resource=="Equipment"){
                    equip = equip+item.Quantity;
                    setEquip(equip);
                }
                if(item.type_of_resource=="Heavy Machine"){
                    Lhand = Lhand+item.Quantity;
                    setLMachine(Lhand);
                }else{
                        other= other +item.Quantity;
                        setother(other);
                }
            }
            });
            setUsers(Resources)
        }
        catch(e){
            console.log(e.message)
        }


       //getting all resources
      
    }, [])
    

    return (
        <Grid container spacing={3} sx={{ mb: '24px' }}>
            {user.role == 'Superadmin' && 
                <Grid item xs={12} md={6}>
                    <StyledCard elevation={6}>
                        <ContentBox>
                            <Icon className="icon">group</Icon>
                            <Box ml="12px">
                                <Small>Total Vehicles</Small>
                               
                                <Heading>{totalVehicle}</Heading>
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
                            <Small>Total Equipments</Small>
                            <Heading>{totalequip}</Heading>
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
                        <Icon className="icon">store</Icon>
                        <Box ml="12px">
                            <Small>Total Hand Tools</Small>
                            <Heading>{totalhandtool}</Heading>
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
                        <Icon className="icon">store</Icon>
                        <Box ml="12px">
                            <Small>Total Small machinery</Small>
                            <Heading>{totalsmallmachine}</Heading>
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
                        <Icon className="icon">store</Icon>
                        <Box ml="12px">
                            <Small>Total Supply Items</Small>
                            <Heading>{totalsupplyitem}</Heading>
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
                            <Small>Total Heavy Machinery</Small>
                            <Heading>{totallargemachine}</Heading>
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
