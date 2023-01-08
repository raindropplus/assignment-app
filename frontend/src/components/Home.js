import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
     UserService.getUsers().then(
       (response) => {
        setUsers(response.data)
        //  setContent(response.data);
       },
      
     );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron row">
        {/* <h3>{content}</h3> */}
        {users.map(user =>{
          return (
            <div key={user.name} className="col-4">
              <ProfileCard name={user.name}/>
            </div>)
        })}
      </header>
    </div>
  );
};

export default Home;

function ProfileCard(params) {
  return(
    <div className="card card-container">
    <img
      src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
      alt="profile-img"
      className="profile-img-card"
    />
  <h4>{params.name}</h4>
  </div>
  )
}


function user(params) {
  return(
    <div className="card card-container">
    <img
      src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
      alt="profile-img"
      className="profile-img-card"
    />
  <h4>{params.name}</h4>
  </div>
  )
}

