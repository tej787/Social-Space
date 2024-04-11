import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../api/UserRquest";
import { logout } from "../../actions/AuthAction";
const serverUsersPublic = "https://social-space-backend-ekln.onrender.com/images/users/";

const Conversation = ({ data, currentUser, online }) => {

  const [userData, setUserData] = useState(null)
  const dispatch = useDispatch()

  useEffect(()=> {

    const userId = data.members.find((id)=>id!==currentUser)

    const getUserData = async ()=> {
      try
      {
          const {data} =await getUser(userId)
         setUserData(data.data.data)
         dispatch({type:"SAVE_USER", data:data.data.data})
      }
      catch(error)
      {
        if (error.response.status === 401 || error.response.data.error.name === 'JsonWebTokenError') {
            dispatch(logout())
        }
        console.log(error.response.data)
      }
    }

    getUserData();
  }, [])
  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={userData?.profilePicture? serverUsersPublic + userData.profilePicture : serverUsersPublic + "defaultProfile.png"}
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{fontSize: '0.8rem'}}>
            <span>{userData?.firstname} {userData?.lastname} || @{userData?.username}</span>

            <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;