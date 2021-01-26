import React, { Component , Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'

//MUI stuff

import Button from '@material-ui/core/Button'
import {postScream, clearErrors} from '../../redux/actions/dataActions'

import CircularProgress from '@material-ui/core/CircularProgress'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import { Dialog, TextField } from '@material-ui/core'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import withStyles from '@material-ui/core/styles/withStyles'


const styles = {
        
         submitButton:{
             position: 'relative',
             float: 'right',
             marginTop: 10
         },
         progressSpinner: {
             position: 'absolute'
         },
         closeButton: {
             position: 'absolute',
             left: '91%',
             top: '3%'
         }
}

class PostScream extends Component{
    // for instances where a user has to complete a form of sorts, we need to initialize the state of the react component
     state = {
         open: false,
         body: "",
         errors: {}

     }
     componentWillReceiveProps(nextProps){
         
         if(nextProps.UI.errors){
             this.setState({
                  errors: nextProps.UI.errors
                })
         } //update errors from the state after it has been reduced by the UI
         if (!nextProps.UI.errors && !nextProps.UI.loading){
             this.setState({
                 body: '',
                 open: false,
                 errors: {}
             })
             // reset errors to null
             
         }
         //close dialog if scream posted without any errors and if loading is false
     }

     handleOpen = () => {
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.props.clearErrors()
        this.setState({
            open: false,
            errors: {}
        })
    }
    handleChange = (event) => {
        this.setState({
                        [event.target.name]: event.target.value})
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.postScream({body: this.state.body})
    }
    render(){
        const {errors} = this.state
        const {classes, UI: {loading}} =  this.props
        // similar to the like, the add icon when clicked will open a dialog that gives an option to post a scream
        return (
            <Fragment>
                <MyButton onClick = {this.handleOpen} tip = 'Post a Scream'>
                      <AddIcon/>
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
                        <DialogTitle>Post a new scream</DialogTitle>
                        <DialogContent>
                            <form onSubmit = {this.handleSubmit}>
                                <TextField
                                   name = "body"
                                   type = "text"
                                   label = "Scream"
                                   multiline
                                   rows = "3"
                                   placeholder = "Scream at your fellow apes"
                                   error = {errors.error ? true : false}
                                   helperText = {errors.error}
                                   className = {classes.textFields}
                                   onChange = {this.handleChange}
                                   fullWidth
                                />
                            
                                <Button type="submit"
                                        variant = "contained" 
                                        color = "primary"
                                        className = {classes.submitButton}
                                        disabled = {loading}
                                        >
                                             Submit
                                             {loading && (<CircularProgress size = {30} className = {classes.progressSpinner}/>)}
                                             

                                </Button>
                                    
                            </form>
                        </DialogContent>

                </Dialog>
            </Fragment>
        )
    }

}

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors:  PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
})

export default connect(mapStateToProps, {postScream, clearErrors})(withStyles(styles)(PostScream))