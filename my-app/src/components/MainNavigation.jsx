import React, { useState, useContext } from 'react';
import {
  AppBar, Box, Toolbar, Typography, InputBase, IconButton, Menu, MenuItem, Avatar, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { alpha, styled } from '@mui/system';
import { SearchContext } from '../context/search';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import LogoutIcon from '@mui/icons-material/Logout';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#fff', 0.15),
  '&:hover': {
    backgroundColor: alpha('#fff', 0.25),
  },
  marginLeft: 0,
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
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function SearchAppBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const search = useContext(SearchContext);
  const { user } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerAnchor, setDrawerAnchor] = useState('right'); // State to track drawer position

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      handleMenuClose();
      navigate('/signin'); // adjust this path as needed
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    if (event) event.preventDefault();
    if (!searchQuery) return;

    search.search(searchQuery).then((data) => {
      search.setData(data.data);
      localStorage.setItem('myData', JSON.stringify(data.data));
      navigate('/results');
    }).catch((error) => {
      console.error("Search error:", error);
    });
  };

  // Function to toggle drawer side based on the clicked button
  const handleDrawerOpen = (anchorSide) => {
    setDrawerAnchor(anchorSide); // Set drawer side (left or right)
    setDrawerOpen(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => handleDrawerOpen('left')} // Open drawer from left when icon is clicked
          >
            <FormatListBulletedIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Anime List Tracker
          </Typography>

          {user && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit();
                  }
                }}
              />
            </Search>
          )}
          {user && (
            <>
              <IconButton onClick={() => handleDrawerOpen('right')} color="inherit" sx={{ ml: 2 }}>
                <Avatar alt={user.displayName || 'User'} src={user.photoURL || ''} />
              </IconButton>

              <Drawer anchor={drawerAnchor} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 250, bgcolor: 'primary.main' }} role="presentation">
                  <List>
                    <ListItem button onClick={() => {
                      navigate('/');
                      setDrawerOpen(false);
                    }}>
                      <ListItemText primary="Home" />
                    </ListItem>
                    <Divider sx={{ bgcolor: 'primary.contrastText' }} />

                    <ListItem button onClick={() => {
                      navigate('/my-anime-list');
                      setDrawerOpen(false);
                    }}>
                      <ListItemText primary="My Anime List" />
                    </ListItem>
                    <Divider sx={{ bgcolor: 'primary.contrastText' }} />

                    <ListItem button onClick={async () => {
                      await handleLogout();
                      setDrawerOpen(false);
                    }}>
                      <ListItemIcon>
                        <LogoutIcon sx={{ color: 'primary.contrastText' }} />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default SearchAppBar;
