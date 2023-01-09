import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import ProfileCard from "../common/ProfileCard";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserService.getUsers().then(
      (response) => {
        setUsers(response.data)        
      },
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron row">        
        {users.map(user => {
          return (
            <div key={user.name} className="col-4">
              <ProfileCard name={user.name} id={user._id}/>
            </div>)
        })}
      </header>
    </div>
  );
};

export default Home;


