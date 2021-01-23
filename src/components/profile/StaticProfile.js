import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs'
import MuiLink from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import {Link} from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative'

        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
                           
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        }

    }
    
})


const StaticProfile = (props) => {
    // this is a function and not a class that is why we dont user 'this.props' here
         const {classes, profile: {handle, createdAt, imageUrl, bio, website, location}} = props

         return (
            <Paper className={classes.paper}>
                    <div className={classes.profile}>
                                    <div className="image-wrapper">
                                        <img src={imageUrl} alt="profile" className="profile-image"/>
                                        

                                            
                                    
                                        
                                    </div>
                                    <hr />
                                    <div className="profile-details">
                                            <MuiLink component = {Link} to = {`/users/${handle}`} color = "primary" variant = "h5">
                                                @{handle}
                                            </MuiLink>
                                            <hr/>
                                            {bio && <Typography variant = "body2">{ bio}</Typography>}
                                            <hr />
                                            {location && (
                                                <Fragment>
                                                    <LocationOn color="primary"/> <span>{location}</span>
                                                </Fragment>
                                                
                                            )}
                                            <hr />
                                            <CalendarToday color="primary"/>{' '}
                                            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                                            <hr />
                                            {website && (
                                                <Fragment>
                                                    <LinkIcon color = "primary"/>
                                                    <a href={website} targert="_blank" rel="noopener noreferrer">
                                                        {' '}{website}
                                                    </a>
                                                    
                                                </Fragment>
                                            )}
                                </div>
            
                                
                    </div>
            </Paper>

         )
}

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(StaticProfile)
