import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Profile() {

    const [profile,setProfile]=useState(null);
    const [followers,setFollowers]=useState([]);
    const [unfollowed,setUnfollowed]=useState([]);

    useEffect(()=>{
        axios.get("http://localhost:3000/profile")
        .then(res=>{setProfile(res.data[0])})
        .catch(err => console.log(err))

        axios.get('http://localhost:3000/followers')
        .then(res => {setFollowers(res.data)})
        .catch(err => console.log(err))
    },[unfollowed])

    function handleOnChange(event){
        setProfile((prev)=>({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    
    const handleUpdate = async () => {
        axios.put(`http://localhost:3000/profile`, profile)
          .then(() => console.log("Profile updated"))
          .catch(err => console.log("Update failed", err));
    };

    const handleUnFollow = async (id) => {
        axios.delete(`http://localhost:3000/followers/${id}`)
        .then(alert("unfollowed"))
        .then(setUnfollowed(!unfollowed))
        .catch(err => console.log(err))
    }

  return (
    <div className="m-5">
        {profile ? (
        <div>
            <img src={profile.profilePic} alt="" className="profile rounded-circle" />
            <h5>{profile.username}</h5>
            <input type="text"
                value={profile.username}
                name="username"
                className="form-control my-4"
                onChange={handleOnChange}
            />

            <input type="text"
                name="profilePic"
                value={profile.profilePic}
                className="form-control"
                onChange={handleOnChange}
            />

            <button className="btn btn-primary my-4" onClick={handleUpdate}>
                Update
            </button>
        </div>
        ) : (
        <div>Loading Profile</div>
        )}

        <div className="d-flex m-2">
            <h6 className="text-secondary">Followers</h6>
        </div>

        {followers.length > 0 ? (
            followers.map(follower => (
                <div key={follower.id} className="container m-1 d-flex gap-2 m-2">
                    <img className="dp rounded-circle" src={follower.profilePic} alt="" />
                    <h6>{follower.username}</h6>
                    <p className="ms-auto btn btn-secondary" onClick={()=>{handleUnFollow(follower.id)}}>Unfollow</p>
                </div>
            ))
        ) : (
            <div>Loading Followers</div>
        )}
    </div>

  )
}

export default Profile