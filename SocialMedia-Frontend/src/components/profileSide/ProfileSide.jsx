import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard.jsx/ProfileCard'

import "./ProfileSide.css"
const ProfileSide = ({location}) => {
  return (
    <div className="ProfileSide">
        <LogoSearch/>
        <ProfileCard location = {location}/>
        {location==="homePage" &&(<FollowersCard/>)}
        
    </div>
  )
}

export default ProfileSide