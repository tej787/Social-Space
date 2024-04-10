import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from '../../actions/UserAction';
import { Link } from 'react-router-dom';

const serverUsersPublic = "http://localhost:8000/images/users/";

function User({ person }) {
    const { user } = useSelector((state) => state.authReducer.authData);
    const dispatch = useDispatch()
  
    const [following, setFollowing] = useState(
        person.followers.includes(user._id)
    );
    const handleFollow = (event) => {
      event.preventDefault(); 
        following
            ? dispatch(unfollowUser(person._id))
            : dispatch(followUser(person._id));
        setFollowing((prev) => !prev);
    };
  
    return (
      <Link style={{textDecoration:'none',color:'inherit'}} to={`/profile/${person._id}`}>
        <div className="follower" >
            
                <div>
                    <img src={
                        person.profilePicture
                            ? serverUsersPublic + person.profilePicture
                            : serverUsersPublic + "defaultProfile.png"
                    } alt="" className='followerImage' />
                    <div className="name">
                        <span>{person.firstname} {person.lastname}</span>
                        <span>@{person.username}</span>
                    </div>
                </div>
            
            <button
                className={
                    following ? "button fc-button UnfollowButton" : "button fc-button"
                }
                onClick={handleFollow}
            >
                {following ? "Unfollow" : "Follow"}
            </button>
        </div>
        </Link>
    )
}

export default User
