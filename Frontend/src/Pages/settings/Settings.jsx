import React from 'react'
import './settings.css'
import Sidebar from '../../Components/Sidebar/Sidebar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Settings() {
  return (
    <div className='settings'> 
       <div className="settingsWrapper">
        <form className="settingsForm">
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src="https://i.pinimg.com/564x/e4/5d/11/e45d119c1583cf2ad503a212226fe52b.jpg" 
              alt=""
            />
             <label htmlFor='fileInput'>
                        <i className='SettingPPIcon'><AccountCircleIcon/></i>
                    </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder="Hiru" name="name" />
          <label>Email</label>
          <input type="email" placeholder="hiru@gmail.com" name="email" />
          <label>Password</label>
          <input type="password" placeholder="Password" name="password" />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          <button className="settingsDeleteButton" type="submit">
            Delete Acoount
          </button>
        </form>
      </div>
    </div>
  )
}

export default Settings;
