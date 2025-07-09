import React, { useEffect, useState } from 'react';
import './profile.css';
import axios from "axios";

const Profile = () => {
    const [user,setUser] = useState({
       name:"",
       email:"",
       password:"", 
    });
    const [loading,setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const token = localStorage.getItem("token");
    console.log(user);
    

    useEffect(()=>{
       fetchUserProfile();
    },[]);


    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const {data} = await axios.get("http://localhost:4000/api/user/profile",{
                headers:{token},
            });
            if (!data.success){
                alert(data.message);
                return;
            }
            setUser({name:data.user.name,email:data.user.email,password:""});
            // console.log(user)
        } catch (error) {
           console.log("Error fetching profile:",error);
            alert("Error fetching profile");
        }
    };
    const handleUpdate = async () => {
        
        setLoading(true);
        console.log("Sending data to backend",user);
        
        try {
            const token = localStorage.getItem("token");
           
            
           const res = await axios.patch("http://localhost:4000/api/user/update-profile",
           user,
           {
              headers: {token}}
        );
        console.log("Response from backend",res.data);
        
        if (res.data.success) {
            alert("Profile updated successfully");
            setEditMode(false);
            setUser({...user,password:""});
            fetchUserProfile();
           }  else{
            alert(res.data.message);
           }


        } catch (error) {
            console.log("Error updating profile:",error);
            alert("Error updating profile");
        }
        setLoading(false);
    };

  return (
 <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-form">
        <label>Name:</label>
        <input
          type="text"
          value={user.name}
          disabled={editMode}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <label>Email:</label>
        <input
          type="email"
          value={user.email}
          disabled={editMode}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter new password"
          disabled={editMode}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        {editMode ? (
          <button onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Save Changes"}
          </button>
        ) : (
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        )}
      </div>
    </div>
  )
}

export default Profile