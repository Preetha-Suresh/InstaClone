import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Suggestions() {
    const [profile, setProfile] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    
        useEffect(() => {
        fetch('http://localhost:3000/profile')
            .then((data) => data.json())
            .then((data) => setProfile(data))
            .catch((err) => console.log(err));
        }, []);

        useEffect(() => {
        fetch('http://localhost:3000/suggestions')
            .then((data) => data.json())
            .then((data) => setSuggestions(data))
            .catch((err) => console.log(err))
            setIsFollowing(!isFollowing);
        }, []);

        
        const handleFollow = async (id, username, profilePic) => {
            axios.post('http://localhost:3000/followers', { id: id, username: username, profilePic: profilePic })
            .then(() => alert('followed'))
            .catch(err => console.log(err));
        };
        

  return (
    <div className="suggest position-fixed">
        {profile ? 
        <div>
            {profile.map((profile)=>(
                <div key={profile.id}>
                    <div className="d-flex gap-2 m-2">
                        <img className="dp rounded-circle" src={profile.profilePic} alt="" />
                        <h6>{profile.username}</h6>
                        <p className="ms-auto text-primary ">Switch</p>
                    </div>
                </div>
            ))}  
        </div>
        :
        <div>
            Loading Profile 
        </div>
        }

        <div className="d-flex m-2">
            <h6 className="text-secondary">Suggestion For You</h6>
            <h6 className="d-flex ms-auto">See All</h6>
        </div>

        {suggestions.length > 0 ? (  
        <div>
            {suggestions.map((suggestion)=>(
                <div key={suggestion.id}>
                    <div className="d-flex gap-2 m-2">
                        <img className="dp rounded-circle" src={suggestion.profilePic} alt="" />
                        <h6>{suggestion.username}</h6>
                        <a className="text-primary ms-auto}" onClick={()=>{handleFollow(suggestion.id,suggestion.username,suggestion.profilePic)}} style={{cursor: "pointer"}}>Follow</a>
                    </div>
                </div>
            ))}  
        </div>
        ) : (
        <div>
            Loading Suggestions  
        </div>
        )}
    </div>
  )
}

export default Suggestions