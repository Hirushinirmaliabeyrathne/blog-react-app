import React from 'react';
import './Post.css';
import { Link, useNavigate } from 'react-router-dom';

function Post({ post }) {
  const navigate = useNavigate();

  const handlePostClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className='post' onClick={() => handlePostClick(post._id)}>
      {post.photo && (
        <img className='postImg' src={post.photo} alt={post.title} />
      )}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className='postCat' key={c._id}> {c.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className='link'>
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <div className="postDate">{new Date(post.createdAt).toDateString()}</div>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}

export default Post;
