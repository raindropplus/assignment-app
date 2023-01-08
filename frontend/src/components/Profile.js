import React, {useState} from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [userContent, setUserContent] = useState([
    { id: "1", name: "a" },
    { id: "2", name: "b" },
    { id: "3", name: "c" },
    { id: "3", name: "c" },
  ]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <h4>{currentUser.data?.user?.name}</h4>
      </div>

   
      <div className="container">
      <header className="row">
        {/* <h3>{content}</h3> */}
        {userContent.map(user =>{
          return (
            <div key={user.name} className="col-4">
              <ProfileCard name={user.name}/>
            </div>)
        })}
      </header>
    </div>
    </div>
  );
};
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

export default Profile;
