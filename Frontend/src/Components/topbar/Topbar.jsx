import React from 'react';
import './topbar.css';
import Box from '@mui/material/Box';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';

const settings = ['Profile', 'Dashboard', 'Logout'];

const ResponsiveSearch = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: '#d3d3d3',
  '&:hover': {
    backgroundColor: '#d3d3d3)',
  },
  marginRight: '16px',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function Topbar() {
  const user = true;
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (setting) => {
    if (setting === 'Profile') {
      navigate('/settings');
    } else if (setting === 'Logout') {
      navigate('/Login'); 
    }
    handleCloseUserMenu();
  };

  const renderUserMenuItems = React.useMemo(() => (
    settings.map((setting) => (
      <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
        <Typography textAlign="center">{setting}</Typography>
      </MenuItem>
    ))
  ), []);

  return (
    <div className='top'>
      <div className="topLeft"></div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className='link' to="/" >Home</Link>
          </li>
          <li className="topListItem"> <Link className='link' to="/about" >About</Link></li>
          <li className="topListItem"> <Link className='link' to="/write" >Write</Link></li>
          <li className="topListItem"><Link className='link' to="/register" >{user && "Sign Up"}</Link></li>
        </ul>
      </div>
      <ResponsiveSearch className="responsive-search">
        <SearchIconWrapper>
          <SearchOutlinedIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </ResponsiveSearch>
      <Box sx={{ flexGrow: 0 }} className="user-settings">
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="User Avatar" src="https://i.pinimg.com/564x/90/19/fb/9019fb660a267279e56d755cd6c0a1a5.jpg" className="custom-avatar" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {renderUserMenuItems}
        </Menu>
      </Box>
    </div>
  );
}

export default Topbar;
