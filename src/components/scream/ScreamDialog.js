import React, { Component , Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'

//MUI stuff

import AppBar from '@material-ui/core/AppBar'


import Button from '@material-ui/core/Button'
import {getScream, clearErrors} from '../../redux/actions/dataActions'

import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import CloseIcon from '@material-ui/icons/Close'
import { Dialog, TextField } from '@material-ui/core'
import DialogContent from '@material-ui/core/DialogContent'

import withStyles from '@material-ui/core/styles/withStyles'

import UnfoldMore from '@material-ui/icons/UnfoldMore'
import dayjs from 'dayjs'
import LikeButton from './LikeButton'
import Comments from './Comments'
import ChatIcon from '@material-ui/icons/Chat'
import CommentForm from './CommentForm'


const styles = {
     invisibleSeprator: {
         border: 'none',
         margin: 4
     },
     profileImage: {
         maxWidth: 200,
         height: 200,
         borderRadius: '50%',
         objectFit: 'cover'
     },
     DialogContent: {
         padding: 20
     },
     closeButton: {
         position: 'absolute',
         left: '90%'
     },
     expandButton: {
         position: 'absolute',
         left: '90%'
     },
     spinnerDiv: {
         textAlign: 'center',
         marginTop: 50,
         marginBottom: 50
     },
     visibleSeparator: {
         width: '100%',
         borderBottom: '1px solif rgba(0,0,0,0.1)',
         marginBottom: 20
     }
}

class ScreamDialog extends Component {
    
    state = {
        open: false,
        oldPath: '',
        newPath: ''

    }

   /* componentWillUpdate(nextProps) {
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors})
        }
    }*/
    componentDidMount(){
        if(this.props.openDialog){
            this.handleOpen()
        }
    }
    handleOpen = () => {
        let oldPath = window.location.pathname // current url path 
 
        const {userHandle, screamId} = this.props
        const newPath = `/users/${userHandle}/scream/${screamId}`   //this should always be the path of the scream we just opened
        


        // we change the url at the top of the browser when scream is opened

        if (oldPath === newPath) {
            oldPath = `/users/${userHandle}`
        }

        window.history.pushState(null, null, newPath)
        
        this.setState({
            open: true,
            oldPath,
            newPath
        })

        this.props.getScream(this.props.screamId)
    }

    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath)
        this.setState({
            open: false
        })
        this.props.clearErrors()
    }

    render(){
            const {classes,
                        scream:  {screamId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments},
                        UI: {loading}
                } = this.props

            const MarkUp = loading ? (
                <div className = {classes.spinnerDiv}>
                    <CircularProgress size = {200}/>
                </div>
                
            ) : (
                <Grid container spacing = {16}>
                    <Grid item sm = {5}>
                        <img src = {userImage} alt = "Profile" className = {classes.profileImage}/>
                    </Grid>
                    <Grid item sm = {7}>
                        <Typography
                             component = {Link}
                             color = "primary"
                             variant = "h5"
                             to = {`/users/${userHandle}`}
                        >
                            @{userHandle}
                        </Typography>
                        <hr className={classes.invisibleSeprator}/>
                        <Typography varaint = "body2" color="textSecondary">
                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography>
                        <hr className={classes.invisibleSeprator}/>
                        <Typography varaint = "body1">
                            {body}
                        </Typography>
                        <LikeButton screamId = {screamId}/>
                        <span>{likeCount} likes</span>
                        <MyButton tip="comments">
                            <ChatIcon color="primary"/>
                        </MyButton>
                        <span>{commentCount} Comments</span>

                    </Grid>
                    <hr className = {classes.visibleSeparator}/>
                    <CommentForm screamId ={screamId}/>
                    <Comments comments ={comments}/>
                </Grid>
            )
            return (
                <Fragment>
                    <MyButton onClick = {this.handleOpen} tip = "Expand scream" tipClassName = {classes.expandButton}>
                        
                        <UnfoldMore color = "primary"/>

                    </MyButton>
                    <Dialog
                        open={this.state.open}  
                        onClose = {this.handleClose}
                        fullWidth maxWidth="sm"
                    >
                        <MyButton 
                                tip="Close" 
                                onClick={this.handleClose} 
                                tipClassName = {classes.closeButton}
                        >
                        
                                <CloseIcon/>
                           
                        </MyButton>
                        <DialogContent className = {classes.DialogContent}>
                            {MarkUp}
                        </DialogContent>
                    </Dialog>
                </Fragment>
            )
    }

    
}

ScreamDialog.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
      
    scream: state.data.scream,
    UI: state.UI
})

const mapActionsToProps = {
    getScream,
    clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog))
