import React, { useEffect, useState } from 'react'
import './Posts.css'

import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { getTimelinePosts } from '../../actions/PostsAction'
import { getUserPosts } from '../../api/PostsRequest';
import { logout } from '../../actions/AuthAction';
const Posts = ({ location }) => {
  const params = useParams()
  const dispatch = useDispatch();
  const profileUserId = params.id
  let { posts, loading } = useSelector((state) => state.postReducer);
  const [currentProfilePost , setCurrentProfilePost] = useState([])
  


  useEffect(() => {
    const fetchUser = async () => {
      try{
      if (location === "homePage") {
        dispatch(getTimelinePosts());
      }
      if (location === "profilePage") {
        const profileUserId = params.id
        const  data  = await getUserPosts(profileUserId);
        setCurrentProfilePost(data.data.data)
      }
    }
    catch(error){

      // if(error.response.status === 401||error.response.data.error.name==='JsonWebTokenError' )
      // {
      //   dispatch(logout())
      // }
      console.log(error)
    }
    }

    fetchUser();
   

  }, [profileUserId],loading );
  return (
    <div>
      {location === "homePage" && (
        <>
          <div className="Posts">
            {loading ? "Fetching Posts....." :
              posts.map((post, id) => {
                return <Post data={post} id={id}  location = "homePage"/>
              })}
          </div>
        </>
      )}

      {location === "profilePage" && (
        <>
          <div className="Posts">
            {loading ? "Fetching Posts....." :
              currentProfilePost.map((post, id) => {
                return <Post data={post} id={id} />
              })}
          </div>
        </>
      )}
    </div>

  )
}

export default Posts