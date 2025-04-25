import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Stories() {

  const [story,setStory]=useState([]);

  const navigate=useNavigate();
  let total=0;

  useEffect(() => {
  fetch('http://localhost:3000/story')
      .then((data) => data.json())
      .then((data) => setStory(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="story m-3">
        <div className="d-none">
            {total=story.length}
        </div>
       {story ? 
        <div  className=" d-flex gap-2 m-2">
            {story.map((story)=>(
                <div key={story.id} onClick={()=>{navigate(`/story/${story.id}/${total}`)}}>
                    <div className="gradient-border">
                        <img className="story-dp rounded-circle" src={story.profilePic} alt="" />
                    </div>
                    <p className="text-truncate" style={{width: "50px"}}>{story.username}</p>
                </div>
            ))}  
        </div>
        :
        <div>
            Loading Stories 
        </div>
        }
    </div>
  )
}

export default Stories