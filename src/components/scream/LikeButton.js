import React, { Component } from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import MyButton from '../../util/MyButton'

import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {likeScream, unlikeScream} from '../../redux/actions/dataActions'

class LikeButton extends Component {
    likedScream = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.screamId )) {///this.props.scream.screamId will be passed from the home component
            return true
        }
        else {
            return false
        }
    }
    likeScream = () =>{
        this.props.likeScream(this.props.screamId)
    }
    unlikeScream = () =>{
        this.props.unlikeScream(this.props.screamId)
    }
    render() {
        const {authenticated} = this.props.user
        const likeButton = !authenticated ? (
   
            //when user is not authenticated and they click on the like button (which is an empty heart) than the user is redirected to the login page
           <MyButton tip = "Like">
               <Link to= "/login">
                   <FavoriteBorder color= "primary"/>
               </Link>
           </MyButton>
        
        ) : (
           this.likedScream() ? (
               <MyButton tip = "Undo like" onClick = {this.unlikeScream}>
                   <FavoriteIcon color = "primary"/>
               </MyButton>
           ) : (
               <MyButton tip = "Like" onClick = {this.likeScream}>
                   <FavoriteBorder color = "primary"/>
               </MyButton>
           )
        )
        return likeButton
    }
}







LikeButton.propTypes = {
    
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)

