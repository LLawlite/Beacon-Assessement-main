import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
function Navbar(props) {
  const navigate = useNavigate();
  const { logout } = props;
  const handleClick = () => {
    console.log('logged out');
    localStorage.removeItem('userInfo');
    navigate('/');
  };
  return (
    <Box sx={{ flexGrow: 1, margin: logout ? '-10px' : '0' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Demo
          </Typography>
          {props.logout ? (
            <Button color="inherit" onClick={handleClick}>
              Logout
            </Button>
          ) : (
            <div></div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
