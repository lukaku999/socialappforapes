import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'


import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'

import MuiLink from '@material-ui/core/Link'
import {Link} from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import Paper from '@material-ui/core/Paper'
import dayjs from 'dayjs'

import EditIcon from '@material-ui/icons/Edit'
import Tooltip  from '@material-ui/core/Tooltip'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'

import {logoutUser, uploadImage}  from '../../redux/actions/userActions'

import EditDetails from './EditDetails'
import MyButton from '../../util/MyButton'

 


const styles = (theme) => ({
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }

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
        },
        '& svg.button':{
            '&:hover':{
                cursor: 'pointer'
            }
        }

    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    }
})



export class Profile extends Component {
    handleImageChange = (event) => {
        const image =  event.target.files[0]
        const formData = new FormData()
        formData.append('image', image, image.name)
        this.props.uploadImage(formData)

        // =send to server
    }
    
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput')
        fileInput.click()
    }

    handleLogout = () =>{
        this.props.logoutUser()
    }

    render() {
        const {
            classes,
            user: {
                credentials: {handle, createdAt, imageUrl, bio, website, location},
                loading,
                authenticated
            }
        } = this.props

        let profileMarkup = !loading ? (authenticated ? ( ///user has been authenticated
            <Paper className={classes.paper}>
                                <div className={classes.profile}>
                                                <div className="image-wrapper">
                                                    <img src={imageUrl} alt="profile" className="profile-image"/>
                                                    <input 
                                                    type="file" 
                                                    id= "imageInput" 
                                                    hidden= "hidden"
                                                    onChange={this.handleImageChange}

                                                    />
                                                    
                                                        <MyButton tip="Edit profile picture" onClick={this.handleEditPicture} btnClassName = "button">

                                                            <EditIcon color="primary"/>
                                                        </MyButton>

                                                        
                                                
                                                    
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
                        
                                               <MyButton tip = "Logout" onClick={this.handleLogout}>
                                                    <KeyboardReturn color="primary"/>
                                               </MyButton>

                                               <EditDetails/>
                                </div>
            </Paper>
            ) : //user has not been authenticated
            ( <Paper className={classes.paper}> 
                            <Typography variant="body2" align="center">
                                No profile found, please login again  
                                <div className = {classes.buttons}>
                                    <Button variant="contained" color = "primary" component={Link} to ="/login">
                                        Login
                                    </Button>
                                    <Button variant="contained" color = "secondary" component={Link} to ="/signup">
                                        Signup
                                    </Button>
                                </div>
                            </Typography>
           </Paper>   

        )) : (<p>loading...</p>)

        return profileMarkup
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})
const mapActionsToProps = {logoutUser, uploadImage}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
