import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes  from 'prop-types'
import AppIcon from '../images/22223-tiger-face-icon.png'
import { Typography} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

import {Link} from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'

import {connect} from 'react-redux'
import {signupUser} from '../redux/actions/userActions'

const styles = {
    form: {
        textAlign: 'center'
  },

  image: {
      margin: '20px auto 20px auto'
  },

  pageTitle: {
      margin: '10px auto 10px auto'
  },

  textField: {
      margin: '10px auto 10px auto'
  },

  button: {
      marginTop: 20,
      position: 'relative'
  },

  customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10
  },

  progress:{
      position:  'absolute'
  }
}

export class signup extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
           
            errors: {},
            confirmPassword: {},
            handle: ''

        }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.UI.errors){
             this.setState({errors: nextProps.UI.errors})
        }
   }
    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({
            loading: true
        })
        const newUserData ={
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.signupUser(newUserData, this.props.history)
    }
    handleChange = (event) => {
        this.setState({
                        [event.target.name]: event.target.value})
    }
    render() {
        const {classes, UI: {loading}} = this.props
        const {errors} = this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src = {AppIcon} alt ="tiger" className={classes.image}/>
                    <Typography variant="h2" className = {classes.pageTitle}>
                        Signup
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                              id="email" 
                              name="email" 
                              type="email" 
                              label="Email" 
                              className={classes.textField}
                              value={this.state.email} 
                              onChange={this.handleChange} 
                              fullWidth
                              helperText={errors.email}
                              error ={errors.email ? true: false} //if error is true, than helper text is diplayed on textfield
                        />

                        <TextField 
                              id="password" 
                              name="password" 
                              type="password" 
                              label="Password" 
                              className={classes.textField}
                              value={this.state.password} 
                              onChange={this.handleChange} 
                              fullWidth 
                              helperText={errors.password} 
                              error ={errors.password ? true: false}
                        />
                        <TextField 
                              id="confirmPassword" 
                              name="confirmPassword" 
                              type="password" 
                              label="Confirm Password" 
                              className={classes.textField}
                              value={this.state.confirmPassword} 
                              onChange={this.handleChange} 
                              fullWidth 
                              helperText={errors.confirmPassword} 
                              error ={errors.confirmPassword ? true: false}
                        />
                        <TextField 
                              id="handle" 
                              name="handle" 
                              type="text" 
                              label="Handle" 
                              className={classes.textField}
                              value={this.state.handle} 
                              onChange={this.handleChange} 
                              fullWidth 
                              helperText={errors.handle} 
                              error ={errors.handle ? true: false}
                        />
                        {errors.general && 
                            (<Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        
                        <Button 
                           type = "submit" 
                           variant ="contained" 
                           color= "primary" 
                           className={classes.button}
                           disabled ={loading}
                        > 
                            Signup
                            {loading && 
                            (<CircularProgress size= {30} className={classes.progress}/>)}
                            
                        </Button>
                        <br/>
                        <small>
                            Already have an account? Please login
                            <Link to = {'/login'}> here!</Link>
                        </small>
                    
                    </form>
                        
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}



const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, {signupUser}) (withStyles(styles)(signup))