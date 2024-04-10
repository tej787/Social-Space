import React, { useEffect } from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileCard from '../../components/ProfileCard.jsx/ProfileCard'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import RightSide from '../../components/RightSide/RightSide'
import './Profile.css'
const Profile = () => {
  useEffect(() => {
    document.title = 'Social Space || Profile Page';
  }, []);
  return (
    <div className="Profile">
        <ProfileLeft/>

        <div className="Profile-center">
            <ProfileCard location = 'profilePage'/>
            <PostSide location = 'profilePage'/>
        </div>

        <RightSide/>
    </div>
  )
}

export default Profile