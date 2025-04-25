import React, { useEffect, useState } from 'react'

function Post() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
    fetch('http://localhost:3000/posts')
        .then((data) => data.json())
        .then((data) => setPosts(data))
        .catch((err) => console.log(err));
    }, []);


  return (
    <div className="d-flex justify-content-center">
        {posts.length > 0 ? (  
        <div>
            {posts.map((post)=>(
                <div key={post.id}>
                    <div className="d-flex gap-2 m-2">
                        <img className="dp rounded-circle" src={post.profilePic} alt="" />
                        <h6>{post.username}</h6>
                    </div>
                    <img className="picpost" src={post.imageUrl} alt="" />
                    <div className="d-flex gap-3 m-1">
                        <i className="bi bi-suit-heart"></i>
                        <i className="bi bi-share"></i>
                        <i className="bi bi-chat"></i>
                    </div>
                    <h6 className="m-1">{post.likes} likes</h6>
                    <div className="d-flex gap-2 m-1">
                        <h6>{post.username}</h6>
                        <p>{post.caption}</p>
                    </div>
                </div>

            ))}  
        </div>
        ) : (
        <div>
            Loading Posts  
        </div>
        )}
    </div>
  )
}

export default Post