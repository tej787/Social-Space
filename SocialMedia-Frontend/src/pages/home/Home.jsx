import React, { useEffect } from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/profileSide/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import './Home.css'
const Home = () => {
  useEffect(() => {
    document.title = 'Social Space || Home Page';
  }, []);
  return (
    <div className="Home">
        <ProfileSide location = 'homePage'/>
        <PostSide location = 'homePage'/>
        <RightSide/>
    </div>
  )
}

export default Home