import React from "react";
import { Link } from "react-router-dom";
import Pic from '../assets/avatar_2x.png'

function ProfileCard(params) {
  return (
    <div className="card card-container">
      <Link to={"/user-details/" + params.id} className="nav-link">
        <img
          src={Pic}
          alt="profile-img"
          className="profile-img-card"
        />
        <h4>{params.name}</h4>
      </Link>
    </div>
  )
}

export default ProfileCard;