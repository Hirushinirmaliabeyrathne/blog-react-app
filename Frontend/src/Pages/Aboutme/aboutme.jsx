import React from 'react'

const aboutme = () => {
  return (
    <div>
        <div className="profileSection">
        {/* <img src={ProfilePic} alt="Profile" className="profilePic" /> */}
        <h1 className="name">Your Name</h1>
        <p className="bio">Hi! I'm [Your Name], a passionate writer, traveler, and lifelong learner. I love to explore new places, meet new people, and share my experiences through my writing. Welcome to my blog where I share my insights on life, style, music, sports, and cinema.</p>
      </div>
      <div className="socialSection">
        <h2 className="followTitle">Follow Me</h2>
        {/* <div className="socialIcons">
          <a href="https://facebook.com" className="socialIcon"><i className="fab fa-facebook-f"></i></a>
          <a href="https://instagram.com" className="socialIcon"><i className="fab fa-instagram"></i></a>
          <a href="https://twitter.com" className="socialIcon"><i className="fab fa-twitter"></i></a>
          <a href="https://pinterest.com" className="socialIcon"><i className="fab fa-pinterest-p"></i></a>
          <a href="https://x.com" className="socialIcon"><i className="fab fa-x"></i></a>
        </div> */}
      </div>
      
    </div>
  )
}

export default aboutme
