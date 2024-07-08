import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './header.css';

function Header() {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
  };

  return (
    <div>
      <Slider {...settings}>
        <div className='card'>
          <img src="/Images/image1.jpg" alt=""/>
        </div>
        <div className='card'>
          <img src="/Images/image2.jpg" alt=""/>
        </div>
        <div className='card'>
          <img src="/Images/image3.jpg" alt=""/>
        </div>
        <div className='card'>
          <img src="/Images/image4.jpg" alt=""/>
        </div>
        <div className='card'>
          <img src="/Images/image5.jpg" alt=""/>
        </div>
        <div className='card'>
          <img src="/Images/image6.jpg" alt=""/>
          
        </div>
        <div className='card'>
          <img src="/Images/image7.jpg" alt=""/>
          
        </div>
        <div className='card'>
          <img src="/Images/image8.jpg" alt=""/>
        </div>
        <div className='card'>
          <img src="/Images/image9.jpg" alt=""/>
        </div>
      </Slider>
    </div>
  );
}

export default Header;
