import React, { useEffect, useState } from 'react'
import { useParams,Link,useNavigate } from 'react-router-dom';

function ViewStory() {

    const { id,total } = useParams();
    const [story, setStory] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
    fetch(`http://localhost:3000/story/${id}`)
        .then(data => data.json())
        .then(data => setStory(data))
        .catch(err => console.log(err));
    },[id]);

    if (id>total || id<=0){
        navigate('/');
    }

  return (
     <div className="story-container">
     {story ? (
         <div className="story-content">
             <div className="d-flex gap-2 m-2 justify-content-center align-items-center">
                 <img className="dp rounded-circle" src={story.profilePic} alt="profile_pic" />
                 <h6>{story.username}</h6>
             </div>
             <div className="d-flex justify-content-center align-items-center">
                <Link to={`http://localhost:5173/story/${Number(id)-1}/${total}`}><i className="bi bi-arrow-left-circle-fill"></i></Link>
                <img className="story-image" src={story.imageUrl} alt="story_pic" />
                <Link to={`http://localhost:5173/story/${Number(id)+1}/${total}`}><i className="bi bi-arrow-right-circle-fill"></i></Link>
             </div>
         </div>
     ) : (
         <div>Loading Story</div>
     )}
    </div>
  )
}

export default ViewStory