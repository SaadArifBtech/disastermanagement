import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Small, Paragraph } from '../Typography'
import { themeShadows } from '../MatxTheme/themeColors'
import { getTimeDifference } from 'app/utils/utils.js'
import useSettings from 'app/hooks/useSettings'
import useNotification from 'app/hooks/useNotification'
import useAuth from 'app/hooks/useAuth'
import { styled, Box, useTheme } from '@mui/system'
import {
    Icon,
    Badge,
    Card,
    Button,
    IconButton,
    Drawer,
    ThemeProvider,
} from '@mui/material'
import { sideNavWidth, topBarHeight } from 'app/utils/constant'
import { getNotification } from 'app/redux/actions/NotificationActions'

const Notification = styled('div')(() => ({
    padding: '16px',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    height: topBarHeight,
    boxShadow: themeShadows[6],
    '& h5': {
        marginLeft: '8px',
        marginTop: 0,
        marginBottom: 0,
        fontWeight: '500',
    },
}))

const NotificationCard = styled(Box)(({ theme }) => ({
    position: 'relative',
    '&:hover': {
        '& .messageTime': {
            display: 'none',
        },
        '& .deleteButton': {
            opacity: '1',
        },
    },
    '& .messageTime': {
        color: theme.palette.text.secondary,
    },
    '& .icon': { fontSize: '1.25rem' },
}))

const DeleteButton = styled(IconButton)(({ theme }) => ({
    opacity: '0',
    position: 'absolute',
    right: 5,
    marginTop: 9,
    marginRight: '24px',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const CardLeftContent = styled('div')(({ theme }) => ({
    padding: '12px 8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(0, 0, 0, 0.01)',
    '& small': {
        fontWeight: '500',
        marginLeft: '16px',
        color: theme.palette.text.secondary,
    },
}))

const Heading = styled('span')(({ theme }) => ({
    fontWeight: '500',
    marginLeft: '16px',
    color: theme.palette.text.secondary,
}))

const NotificationBar = ({ container }) => {
    const { settings } = useSettings()
    const theme = useTheme()
    const secondary = theme.palette.text.secondary
    const [panelOpen, setPanelOpen] = React.useState(false)

    const {user} = useAuth()
    const { deleteNotification, clearNotifications, getNotifications, notifications } =
        useNotification()


    const handleDrawerToggle = () => {
        setPanelOpen(!panelOpen)
    }

    useEffect(()=> {
        (()=>{        
            if((typeof user) !== undefined){
                getNotifications(user._id)
            }
        })()
    }, [])
    const { palette } = useTheme()
    const textColor = palette.text.primary        

    let notiCard = null
    let notiNum = 0;
    let clearSection = null

    if((typeof notifications) === "object"){
        if(!notifications.hasOwnProperty('message')){                    
            notiCard = (
                notifications?.map((notification) => (
                    <NotificationCard key={notification._id}>
                        <DeleteButton
                            size="small"
                            className="deleteButton"
                            onClick={() =>
                                deleteNotification(notification._id, user._id)
                            }
                        >
                            <Icon className="icon">clear</Icon>
                        </DeleteButton>
                        <Link
                            to={`/${notification.path}`}
                            onClick={handleDrawerToggle}
                            style={{ textDecoration: 'none' }}
                        >
                            <Card sx={{ mx: 2, mb: 3 }} elevation={3}>
                                <CardLeftContent>
                                    <Box display="flex">
                                        <Icon
                                            className="icon"
                                            color='success'
                                        >
                                            notifications
                                        </Icon>
                                        <Heading>
                                            Alert
                                        </Heading>
                                    </Box>
                                    <Small className="messageTime">
                                        {getTimeDifference(
                                            new Date(
                                                notification.createdAt
                                            )
                                        )}
                                        ago
                                    </Small>
                                </CardLeftContent>
                                <Box sx={{ px: 2, pt: 1, pb: 2 }}>
                                    <Paragraph sx={{ m: 0 }}>
                                        {notification.title}
                                    </Paragraph>
                                    <Small sx={{ color: secondary }}>
                                        {notification.description}
                                    </Small>
                                </Box>
                            </Card>
                        </Link>
                    </NotificationCard>
                ))            
            )
            notiNum = notifications.length                                        
            clearSection = (
                <>
                    {!!notifications.length && (
                        <Box sx={{ color: secondary }}>
                            <Button onClick={() => clearNotifications(user._id)}>
                                Clear Notifications
                            </Button>
                        </Box>
                    )}
                </>
            )
        }        
    }
  
        
    return (     
        
        <Fragment>
            <IconButton onClick={handleDrawerToggle}>
                <Badge color="secondary" badgeContent={notiNum}>
                    <Icon sx={{ color: textColor }}>notifications</Icon>
                </Badge>
            </IconButton>

            <ThemeProvider theme={settings.themes[settings.activeTheme]}>
                <Drawer
                    width={'100px'}
                    container={container}
                    variant="temporary"
                    anchor={'right'}
                    open={panelOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <Box sx={{ width: sideNavWidth }}>
                        <Notification>
                            <Icon color="primary">notifications</Icon>
                            <h5>Notifications</h5>
                        </Notification>
                        {notiCard}
                        {clearSection}                      
                    </Box>
                </Drawer>
            </ThemeProvider>
        </Fragment>
    )
}

export default NotificationBar
