import React from "react";
import { Link } from "react-router-dom";
import Pic from '../assets/avatar_2x.png'

function ContentCard(params) {
  return (
    <div className="card card-container">
      <img
        src={params.url ? params.url : Pic}
        alt="profile-img"
        className="profile-img-card"
      />
      <h4>{params.name}</h4>
      {params.isEditable && <Link to={"/content/" + params.id} className="nav-link"> Edit</Link>}
    </div>
  )
}

export default ContentCard;