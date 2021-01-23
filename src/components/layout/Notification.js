import React, { Component, Fragment } from 'react'

import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import relativeTime from 'dayjs/plugin/relativeTime'


import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'

import NotificationsIcon from '@material-ui/icons/Notifications'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'

import {connect} from 'react-redux'
import {markNotificationsRead} from '../../redux/actions/userActions'

class Notifications extends Component {
    state = {
        anchorEl: null
    }
    
    handleOpen = (event) => {
       
        this.setState({anchorEl: event.target})
    }
    handleClose= (event) => {
        this.setState({anchorEl: null})
    }
    
    onMenuOpened = () => {
       
        let unreadNotifcationIds = this.props.notifications
        .filter(not => console.log(not) )/* !not.read)
        .map(not => not.notificationId)*/
        
        this.props.markNotificationsRead(unreadNotifcationIds)
    }

    render(){
         const notifications = this.props.notifications
         const anchorEl = this.state.anchorEl
         console.log("i have opened:" +  this.state.anchorEl)
         dayjs.extend(relativeTime)

         let notificationIcon

         let unreadNotifcationCount = notifications.filter(not => not.read === false).length
        

         // if notification exist we show the number if not we dont show any number on icon
         if(notifications && notifications.length > 0){
            unreadNotifcationCount > 0 
             ? notificationIcon = (
                 <Badge badgeContent = {unreadNotifcationCount} color = "secondary">
                     <NotificationsIcon/>
                 </Badge>
             ) : (
                 
                notificationIcon = <NotificationsIcon/>

             )
         }
         else{
            notificationIcon = <NotificationsIcon/>
         }
         let notificationsMarkup = 
              notifications && notifications.length > 0 ? (
                  notifications.map(not => {
                      const verb = not.type == 'like' ? 'liked' : 'commented on'
                      const time =  dayjs(not.createdAt).fromNow()
                      const iconColor = not.read ? 'primary' : 'secondary'
                      const icon = not.type === 'like' ? (
                          <FavoriteIcon color = {iconColor} style = {{marginRight: 10}}/>
                     
                      ) : (
                          <ChatIcon color = {iconColor}  style = {{marginRight: 10}}/>
                      )
                      
                   return (
                        <MenuItem key = {not.createdAt} onClick = {this.handleClose}>
                             {icon}
                             <Typography
                                component = {Link}
                                color = "default"
                                variant = "body1"
                                to = {`/users/${not.recipient}/scream/${not.screamId}`}
                            >
                                {not.sender} {verb} your scream {time}
                            </Typography>
                        </MenuItem>
                    )
                  })
              ) : (<MenuItem onClick = {this.handleClose}>
                     You have no notifications yet
                   </MenuItem>)

         return (
             <Fragment>
                 <Tooltip placement = "top" title = "Notifications">
                        <IconButton 
                            aria-owns = {anchorEl ? 'simple-menu': undefined}
                            onClick = {this.handleOpen}
                        >
                            {notificationIcon}
                        </IconButton>

                 </Tooltip>
                 <Menu
                    anchorEl = {anchorEl}
                    open = {Boolean(anchorEl)}
                    onClose = {this.handleClose}
                    onEntered = {this.onMenuOpened}
                >
                    {notificationsMarkup}
                </Menu>

             </Fragment>
         )
    }
}

Notification.PropTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.object.isRequired 
}

const mapStateToProps = state => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps, {markNotificationsRead})(Notifications)



