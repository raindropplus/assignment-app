import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/user.service";
import ContentCard from "../common/ContentCard";
import Pic from '../assets/avatar_2x.png'

const UserDtetails = () => {
  const { id } = useParams();
  const [userContents, setUserContents] = useState([]);
  const [user, setUser] = useState({});

  const getData = async () => {
    try {
      const userData = await UserService.getUsersDetails(id);
      console.log(userData);
      if (userData.status === 200) {
        setUser(userData.data)
        const contentData = await UserService.getUsersContentDetails(userData.data._id);
        setUserContents(contentData.data);
      }
    } catch (error) {

    }

  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <div className="container">
      <div className="card card-container">
        <img
          src={Pic}
          alt="profile-img"
          className="profile-img-card"
        />
        <h4>{user.name}</h4>
      </div>

      <div className="container">
        <header className="row">
          {userContents?.length === 0 && <h6>No data found</h6>}
          {userContents?.length > 0 && userContents.map((user) => {
            return (
              <div key={user.name} className="col-4">
                <ContentCard name={user.name} url={user.url} />
              </div>
            );
          })}
        </header>
      </div>
    </div>);
};


export default UserDtetails;
