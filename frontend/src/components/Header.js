import React, { useState } from 'react'
import { AppBar, Typography, Button, Toolbar, Tabs, Tab } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../store';



const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn);

    const [value, setValue] = useState();
  return (
      <AppBar position="sticky" sx={{
          background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(52,9,121,1) 35%, rgba(0,212,255,1) 100%)",
      }}>
          <Toolbar>
              <Typography variant="h4">MY</Typography>
              { isLoggedIn && <Box display="flex" marginLeft={'auto'} marginRight='auto'>
                  <Tabs textColor="inherit" value={value} onChange={(e, val) => setValue(val)}>
                      <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
                      <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
                      <Tab LinkComponent={Link} to="/blogs/add" label="Add Blogs" />

                      

                  </Tabs>
              
              </Box>}
              <Box marginLeft='auto' display='flex'>
                  
                  { !isLoggedIn && <><Button LinkComponent={Link} to="/auth" sx={{ margin: 1, borderRadius: 10 }} color="warning">Login</Button>
                  <Button LinkComponent={Link} to="/auth" sx={{ margin: 2, borderRadius: 8 }} color="warning">Signup</Button></>}
                  {isLoggedIn && (
                      <Button
                          onClick={ ()=>dispatch(authActions.logout())}
                      LinkComponent={Link}
                      to="/auth" sx={{ margin: 2, borderRadius: 8 }}
                      color="warning">LogOut</Button>
                  )}

              </Box>
          </Toolbar>
      </AppBar>
    
  )
}

export default Header