import React from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSide.css'
const PostSide = ({location}) => {
  console.log(location)
  return (
   <div className="PostSide">
       <PostShare />
       <Posts location={location}/>
   </div>
  )
}

export default PostSide