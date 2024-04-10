import React, { useState, useRef } from "react";

import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import {useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/UploadActions";
import { message } from 'antd'
import { logout } from "../../actions/AuthAction";
const serverUsersPublic = "https://social-space-backend-nl0z.onrender.com/images/users/";



const PostShare = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  
  const imageRef = useRef();
  const desc = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
  
    if (!desc.current.value) {
      message.error('Please enter a post description');
      return;
    }
  
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
  
    try {
      if (image) {
        const data = new FormData();
        const fileName = "Post" + user._id + Date.now() + image.name;
        data.append("name", fileName);
        data.append("file", image);
        newPost.image = fileName;
        dispatch(uploadImage(data)); // Dispatch upload action for image
      }
  
      dispatch(uploadPost(newPost)); // Dispatch upload action for post data
      resetShare(); // Reset all fields, including uploading flag
      
    }
    catch(error){

      if(error.response.status === 401||error.response.data.error.name==='JsonWebTokenError' )
      {
        dispatch(logout())
      }
      console.log(error.response.data)
    }
  };
  // Reset Post Share
  const resetShare = () => {
    setImage(null);
    desc.current.value = "";
    
  };
  // console.log(loading)

  return (
    <div className="PostShare">
      <img
          src={
            user.profilePicture
              ? serverUsersPublic + user.profilePicture
              : serverUsersPublic + "defaultProfile.png"
          }
          alt="ProfileImage"
        />
      <div>
      <input
          type="text"
          placeholder="What's happening?"
          required
          ref={desc}
        />
        <div className="postOptions">
          <div className="option" style={{ color: "var(--photo)" }}
          onClick={()=>imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>{" "}
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>{" "}
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div>
          <button
        className="button ps-button"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? (
          <span>Uploading...</span> // Or display a progress bar
        ) : (
          <span>Share</span>
        )}
      </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              accept="image/*" 
              onChange={onImageChange}
            />
          </div>
        </div>
      {image && (

        <div className="previewImage">
          <UilTimes onClick={()=>setImage(null)}/>
          <img src={URL.createObjectURL(image)} alt="" />
        </div>

      )}


      </div>
    </div>
  );
};

export default PostShare;
