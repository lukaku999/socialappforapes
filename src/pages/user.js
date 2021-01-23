import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Scream from '../components/scream/Scream'
import Grid from '@material-ui/core/Grid'
import StaticProfile from '../components/profile/StaticProfile'

import {connect} from 'react-redux'
import {getUserData} from '../redux/actions/dataActions'

class user extends Component {
    constructor(){
        super()
        this.state = {
            profileLoading: true,
            screamIdParam: null
        }
    }
    componentDidMount(){
        const handle = this.props.match.params.handle
        
        const screamId = this.props.match.params.screamId
 
        if(screamId) {
            this.setState({
                screamIdParam: screamId
            })
        }

        this.props.getUserData(handle)
        axios.get(`/user/${handle}`)
        .then(res => {
            this.setState({
                profile: res.data.user,
                profileLoading: false
                
            })
        })
        .catch(err => console.log(err))
    }
    render() {
        const {screams, loading} = this.props.data
        const {screamIdParam} = this.state
        
        const screamMarkup = loading ? (
            <p>Loading data...</p>
        ) : 
        
        screams === null ? (
            <p>No screams from this user</p>
        ) : !screamIdParam ? (
            screams.map(scream => <Scream key={scream.screamId} scream = {scream}/>)
        ) : (
            screams.map(scream => {
                if(scream.screamId !== screamIdParam) {
                    return  <Scream key={scream.screamId} scream = {scream}/>
                    
                }
                else {
                    return  <Scream key={scream.screamId} scream = {scream} openDialog/>
                }
            })
            
           /// so the condition statement basically goes like this
           // check if loading
           // check if screams exist
           // check if format of url, if http://localhost:3000/users/user26/scream/screamId or not
           // check if screamId in screams array is similar to that in the URL, if so open the scream dialog


           // when we pass openDialog, it is passed to scream than passed to scream dialog. Using component mounts in scream dialog, we check if open dialog is passed in, if so, than we
           // open the scream dialog automatically
        )

        return (
            <Grid container spacing={6}>
                <Grid item sm = {8} xs = {12}>
                    {screamMarkup}
                    
                </Grid>
                <Grid item sm = {4} xs = {12}>
                      {this.state.profileLoading ? (
                          <p>loading profile...</p>
                      ) : (<StaticProfile profile = {this.state.profile}/>)}
                        
                </Grid>
                
            </Grid>
        )
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getUserData})(user)
