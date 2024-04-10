import React, { useEffect } from 'react'
import './PasswordUpdate.css'

import ProfileSide from '../../components/profileSide/ProfileSide'
import PostSide from '../../components/PostSide/PostSide'
import RightSide from '../../components/RightSide/RightSide'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import PasswordUpdateCard from '../../components/PasswordUpdateCard/PasswordUpdateCard'

function PasswordUpdate() {
  useEffect(() => {
    document.title = 'Social Space || Password Update';
  }, []);
  return (
    <div className="Main">
      
      <ProfileSide location='updatePasswordPage'/>
        {/* <PostSide location = 'homePage'/> */}
        <PasswordUpdateCard/>
        <RightSide/>
    </div>
  )
}

export default PasswordUpdate