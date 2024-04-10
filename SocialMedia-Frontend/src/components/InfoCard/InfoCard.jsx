import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal.jsx/ProfileModal";
import * as UserApi from "../../api/UserRquest";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { logout } from "../../actions/AuthAction";
import { deactivateAccount } from "../../actions/UserAction";

const InfoCard = () => {
  const dispatch = useDispatch()
  const params = useParams();
  const [modalOpened, setModalOpened] = useState(false);
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);



  useEffect(() => {
    const fetchProfileUser = async () => {
      try {
        if (profileUserId === user._id) {
          console.log("fetching")
          const profileUser = await UserApi.getme();
          setProfileUser(profileUser.data.data.data);
        } else {
          console.log("fetching")
          const profileUser = await UserApi.getUser(profileUserId);
          setProfileUser(profileUser.data.data.data);
        }

      }
      catch (error) {

        if (error.response.status === 401 || error.response.data.error.name === 'JsonWebTokenError') {
          dispatch(logout())
        }
        console.log(error.response.data)
      }
    };
    fetchProfileUser();
  }, [user, profileUserId]);

  const handleLogOut = () => {
    dispatch(logout())
  }
  const handleDeactivateAccount = () => {
    dispatch(deactivateAccount())
  }
  // console.log(profileUser)
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser.livesin}</span>
      </div>

      <div className="info">
        <span>
          <b>Country </b>
        </span>
        <span >{profileUser.country}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>
      {user._id === profileUserId ? (
        <button className="button logout-button" onClick={handleLogOut} style={{marginTop:'15%'}} >Log Out</button>
        
      )
        : <div style={{ marginBottom: '20%' }}></div>}
      {user._id === profileUserId ? (
        <button className="red-button logout-button" onClick={handleDeactivateAccount} style={{marginTop:'4%' }}>Deactivate Account</button>
        
      )
        : <div style={{ marginBottom: '20%' }}></div>}
    </div>
  );
};

export default InfoCard;
