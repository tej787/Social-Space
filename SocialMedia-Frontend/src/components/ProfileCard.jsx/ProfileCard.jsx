import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProfileCard.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser, getme } from "../../api/UserRquest";
import { getUserPosts } from "../../api/PostsRequest";
import { logout } from "../../actions/AuthAction";
const serverUsersPublic = "http://localhost:8000/images/users/";

const ProfileCard = ({location}) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [user, setUser] = useState();
  const profileUserId = params.id;
  const authUser = useSelector((state) => state.authReducer.authData.user);
  const [currentProfilePost , setCurrentProfilePost] = useState([])
  
  
  const posts = useSelector((state)=>state.postReducer.posts)
  useEffect(() => {
    const fetchUser = async () => {
      try{
      if(location === "homePage" || location === "updatePasswordPage" )
      {
        const  data  = await getme();
      setUser(data.data.data.data);
      }
      else{
        if(authUser._id=== profileUserId){
          const  data  = await getme();
        setUser(data.data.data.data);
        const  Postdata  = await getUserPosts(profileUserId);
        setCurrentProfilePost(Postdata.data.data)
        
        }
        else{
          const  data  = await getUser(profileUserId)
        setUser(data.data.data.data);
        const  Postdata  = await getUserPosts(profileUserId);
        setCurrentProfilePost(Postdata.data.data)
        }
      }
    }
    catch(error){

      if(error.response.status === 401||error.response.data.error.name==='JsonWebTokenError' )
      {
        dispatch(logout())
      }
      console.log(error.response.data)
    }
      
    };

    fetchUser();
  }, [profileUserId]); 
  // console.log(user);
  if (!user) {
    return <div>Loading...</div>; // Render a loading state while user data is being fetched
  }
  
  return (
    
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={
          user.coverPicture
            ? serverUsersPublic + user.coverPicture
            : serverUsersPublic + "defaultCover.jpg"
        } alt="CoverImage" />

        <img
          src={
            user.profilePicture
              ? serverUsersPublic + user.profilePicture
              : serverUsersPublic + "defaultProfile.png"
          }
          alt="ProfileImage"
        />
      </div>

      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
        <span style={{textAlign:'justify' , marginLeft:'7%',marginRight:'7%'}}>{user.about? user.about : 'Write about yourself'}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>

          {location === "profilePage"  && (
            <>
              <div className="vl"></div>
              <div className="follow">
              <span>{
                currentProfilePost.length
                }</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
