import React, { useEffect, useState } from 'react';
import './Singlepost.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/posts/${path}`);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    getPost();
  }, [path]);

  return (
    <div className='singlePost'>
      <div className='singlePostWrapper'>
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        <h1 className="singlePostTitle">
          {post.title}
          <div className="singlePostEdit">
            <i className='singlePostIcon'> <EditIcon /> </i>
            <i className='singlePostIcon'> <DeleteIcon /> </i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span className='singlePostAuthor'>
            Author: <b>{post.username}</b>
          </span>
          <span className='singlePostDate'>
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <p className='singlePostDesc'>{post.desc}</p>
      </div>
    </div>
  );
}

export default SinglePost;
