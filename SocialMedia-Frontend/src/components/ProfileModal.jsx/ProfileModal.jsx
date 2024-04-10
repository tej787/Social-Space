import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadUserImage } from "../../actions/UploadActions";
import { updateUser } from "../../actions/UserAction";

function ProfileModal({ modalOpened, setModalOpened ,data }) {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profilePicture"
        ? setProfilePicture(img)
        : setCoverPicture(img);
    }
    console.log(profilePicture,coverPicture)
  };

   // form submission
   const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profilePicture) {
      const data = new FormData();
      const fileName = 'profilePicture'+user._id+Date.now() + profilePicture.name;
      data.append("name", fileName);
      data.append("file", profilePicture);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadUserImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverPicture) {
      const data = new FormData();
      const fileName = 'coverPicture'+user._id+Date.now() + coverPicture.name;
      data.append("name", fileName);
      data.append("file", coverPicture);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadUserImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser( UserData));
    setModalOpened(false);
  };
  
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="35%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3 style={{ marginBottom: '-20px' ,marginTop: '-40px' }}>Your Info</h3>

        <div>
          <input
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
            style={{width:'50px'}}
            onChange={handleChange}
            value={formData.firstname}
          />

          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
            style={{width:'50px'}}
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
            onChange={handleChange}
            value={formData.worksAt}
            
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="about"
            placeholder="About"
            onChange={handleChange}
            value={formData.about}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesin"
            placeholder="LIves in"
            style={{width:'50px'}}
            onChange={handleChange}
            value={formData.livesin}
          />

          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            style={{width:'50px'}}
            onChange={handleChange}
            value={formData.country}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="relationship"
            placeholder="RelationShip Status"
            onChange={handleChange}
            value={formData.relationship}
          />
        </div>


        <div >
            Profile Image 
            <input type="file" accept="image/*"  name='profilePicture' onChange={onImageChange}/>
            Cover Image
            <input type="file" accept="image/*"  name="coverPicture" onChange={onImageChange} />
        </div>

        <button className="button infoButton" onClick={handleSubmit}>
          Update
        </button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
