import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");
  const [user, setUser] = useState([{id: "1", name: "a",},{id: "2", name: "b",},{id: "3", name: "c",},{id: "3", name: "c",}]);

  useEffect(() => {
    // UserService.getPublicContent().then(
    //   (response) => {
    //     setContent(response.data);
    //   },
    //   (error) => {
    //     const _content =
    //       (error.response && error.response.data) ||
    //       error.message ||
    //       error.toString();

    //     setContent(_content);
    //   }
    // );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron row">
        {/* <h3>{content}</h3> */}
        {user.map(user =>{
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

