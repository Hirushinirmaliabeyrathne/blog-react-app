import React, { useEffect, useState } from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import XIcon from '@mui/icons-material/Close';
import PinterestIcon from '@mui/icons-material/Pinterest';
import './Sidebar.css';
import axios from 'axios';

function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      try {
        const res = await axios.get('http://localhost:8080/categories');
        setCats(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    getCats();
  }, []);

  return (
    <div className='sidebar'>
      <div className="sidebarSection">
        <div className="sidebarItem">
          <span className='sidebarTitle'>About Me</span>
          <p>
            Welcome to our blog! We are a passionate team of writers, creators, and enthusiasts dedicated to bringing you the best content on life, style, music, sports, and cinema. Our journey began with a shared vision of creating a space where ideas can be explored, stories can be told, and connections can be made.
          </p>
          <img src='https://i.pinimg.com/564x/c4/c1/30/c4c13068c35b6b7b8a3e4995fc96171c.jpg' alt='About Us' />
        </div>
      </div>
      <div className="sidebarSection">
        <span className='sidebarTitle'>Categories</span>
        <ul className="sidebarList">
          {cats.map((C) => (
            <li key={C._id} className="sidebarListItem">{C.name}</li>
          ))}
        </ul>
      </div>
      <div className="sidebarSection">
        <div className="sidebarItem">
          <span className='sidebarTitle'>Follow Us</span>
          <div className="sidebarSocial">
            <FacebookIcon className='sidebarIcon' />
            <InstagramIcon className='sidebarIcon' />
            <TwitterIcon className='sidebarIcon' />
            <PinterestIcon className='sidebarIcon' />
            <XIcon className='sidebarIcon' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
