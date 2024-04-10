import React, { useState } from 'react';
import './Post.css';
import Comment from '../../img/comment.png';
import Share from '../../img/share.png';
import Heart from '../../img/like.png';
import NotLike from '../../img/notlike.png';
import { useSelector } from 'react-redux';
import { likePost } from '../../api/PostsRequest';
const serverUsersPublic = "http://localhost:8000/images/users/";

const ImagePopup = ({ src, onClose }) => (
  <div className="image-popup" onClick={onClose}>
    <img src={src} alt="" />
  </div>
);

const Post = ({ data, location }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)
  const handleLike = () => {
    likePost(data._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  };

  
  return (
    <div className="Post">

      {location === "homePage" && (

        <div className="follower" >
          <div>
            <img src={
              data.userId.profilePicture
                ? serverUsersPublic + data.userId.profilePicture
                : serverUsersPublic + "defaultProfile.png"
            } alt="" className='followerImage' />
            <div className="name">
              <span>{data.userId.firstname} {data.userId.lastname}</span>
              <span>@{data.userId.username}</span>
            </div>
          </div>

          <button
            className="button fc-button"
            onClick={() => window.location.href = `/profile/${data.userId._id}`}
          >
            View Profile
          </button>

        </div>
      )}



      {data.image && (<img
        src={data.image ? "http://localhost:8000/images/posts/" + data.image : ""}
        alt=""
        onClick={() => setIsPopupOpen(true)}
      />)
      }


      {isPopupOpen && (
        <ImagePopup
          src={data.image ? "http://localhost:8000/images/posts/" + data.image : ""}
          onClose={() => setIsPopupOpen(false)}
        />
      )}

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: '12px' }}>{likes} likes</span>

      <div className="detail">
        <span><b>{data.name}</b></span>
        <span> {data.desc}</span>
      </div>
    </div>
  );
}

export default Post;
