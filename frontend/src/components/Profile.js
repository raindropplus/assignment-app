import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ContentCard from "../common/ContentCard";
import UserService from "../services/user.service";
import Pic from '../assets/avatar_2x.png'

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [userContents, setUserContents] = useState([]);
  const getData = async () => {
    try {
      const contentData = await UserService.getUsersContentDetails(currentUser.data.user._id);
      console.log(contentData);
      if (contentData.status === 200) {
        setUserContents(contentData.data);
      }
    } catch (error) {

    }

  }

  useEffect(() => {
    getData()
  }, []);


  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <div className="card card-container">
        <img
          src={Pic}
          alt="profile-img"
          className="profile-img-card"
        />
        <h4>{currentUser.data?.user?.name}</h4>
        <Link to={"/update-profile/" + currentUser.data?.user?._id} className="nav-link"> Edit</Link>
      </div>
      <div className="container">
        <header className="row">         
          {userContents.map(user => {
            return (
              <div key={user._id} className="col-4">
                <ContentCard name={user.name} isEditable="true" id={user._id} url={user.url} />
              </div>)
          })}
        </header>
      </div>
      <div>
        <Link to={"/content"} className="btn btn-primary">Add Content</Link>
      </div>
    </div>
  );
};

export default Profile;
