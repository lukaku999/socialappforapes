import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {connect} from 'react-redux'
import {submitComment} from '../../redux/actions/dataActions'

const styles = {
    
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solif rgba(0,0,0,0.1)',
        marginBottom: 20
    },
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    

    

    

    

    

}


class CommentForm extends Component {
    state = {
        body: '',
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
                errors: {}
            })
            // reset errors to null
            
        }
        //close dialog if scream posted without any errors and if loading is false
    }
            // reset errors to null
          

    handleChange = (event) => {
        this.setState({
                        [event.target.name]: event.target.value})
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.submitComment(this.props.screamId, {body: this.state.body})
    }
    render() {
        const {errors} = this.state
        const {classes, authenticated} = this.props

        const commentFormMarkup = authenticated ? (
            <Grid item sm = {12} style = {{textAlign: 'center'}}>
                 <form onSubmit = {this.handleSubmit}>
                     <TextField
                         name = "body"
                         type = "text"
                         label= "Comment on scream"
                         error = {errors.error ? true : false}
                         helperText = {errors.error}
                         value = {this.state.body}
                         onChange = {this.handleChange}
                         fullWidth
                         className = {classes.textField}
                     />
                    <Button 
                         type = "submit"
                         variant = "contained"
                         color = "primary"
                         className = {classes.button}  
                         >
                        Submit
                    </Button>

                 </form>
                 <hr className = {classes.visibleSeparator}/>
            </Grid>
        ) : null
        return commentFormMarkup
    }
}

CommentForm.protoTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps, {submitComment})(withStyles(styles)(CommentForm))
