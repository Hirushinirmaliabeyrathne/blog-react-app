import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Header from '../../Components/Header/header';
import axios from 'axios';
import Posts from '../../Components/Posts/Posts';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/Posts");
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className='home'>
      <Header />
      <Posts posts={posts} />
      <div className="sidebar">
        <Sidebar />
      </div>
    </div>
  );
}

export default Home;
