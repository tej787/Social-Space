import React, { useEffect, useState } from 'react'
import './FollowersCard.css'

import User from '../User/User'
import { useDispatch, useSelector } from "react-redux";

import { getAllUser } from '../../api/UserRquest';
import { logout } from '../../actions/AuthAction';
const FollowersCard = () => {
  const dispatch = useDispatch()
    const { user } = useSelector((state) => state.authReducer.authData);
    
    const [persons, setPersons] = useState([]);

    
    
    useEffect(() => {
        const fetchPersons = async () => {
          try{
          const { data } = await getAllUser();
          setPersons(data.data.data);
          }
          catch(error){

            // if(error.response.status === 401||error.response.data.error.name==='JsonWebTokenError' )
            // {
            //   dispatch(logout())
            // }
            console.log(error.response.data)
          }
          
        };
        fetchPersons();
        
      }, []);
  return (
    <div className="FollowersCard">
        <h3>People You May Know</h3>

        {persons.map((person, id)=>{
           if (person._id !== user._id)
            return(
                <User  person={person} key={id}/>
            )
        })}
    </div>
  )
}

export default FollowersCard