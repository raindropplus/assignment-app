import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserDtetails = (parms) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [userContent, setUserContent] = useState([
    { id: "1", name: "a" },
    { id: "2", name: "b" },
    { id: "3", name: "c" },
    { id: "3", name: "c" },
  ]);

  return (
    <div className="container">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <h4>Details</h4>
      </div>

      <div className="container">
        <header className="row">
          {/* <h3>{content}</h3> */}
          {userContent.map((user) => {
            return (
              <div key={user.name} className="col-4">
                <ProfileCard name={user.name} />
              </div>
            );
          })}
        </header>
      </div>
    </div>
  );
};
function ProfileCard(params) {
  return (
    <div className="card card-container">
      <img
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        alt="profile-img"
        className="profile-img-card"
      />
      <h4>{params.name}</h4>
      <Link to={"/home"} className="nav-link">
      <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
      </Link>
      <button type="button" classNam="btn btn-default" aria-label="Left Align">
        <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
      </button>
    </div>
  );
}

export default UserDtetails;
