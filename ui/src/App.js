import * as React from 'react';
import {
  AppBar,
  Box,
  createTheme, CssBaseline, IconButton, Toolbar, Tooltip, Typography,
} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import {BrowserRouter, Link, Redirect, Route, Switch} from "react-router-dom";
import GameSessionListing from "./layout/game-session-listing";
import {makeStyles} from "@mui/styles";
import LogIn from "./layout/log-in";
import FeedbackListing from "./layout/feedback-listing";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';

const useStyles = makeStyles(() => ({
  navbarLink: {
    paddingLeft: 30,
    textDecoration: 'none',
    color: '#FFF',
  },
}));

function App() {
  const classes = useStyles();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  function logOut(){
    localStorage.removeItem('currentUser');
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography component="div" sx={{ flexGrow: 1 }}>
                <Link to={'/'} className={classes.navbarLink}>
                  <span >Log In</span>
                </Link>
                {currentUser && currentUser.userType === 'player' &&
                  <Link to={'/gameSessions'} className={classes.navbarLink}>
                    <span >Game Sessions</span>
                  </Link>
                }
                {currentUser && currentUser.userType === 'ops' &&
                  <Link to={'/feedback'} className={classes.navbarLink}>
                    <span >Feedback</span>
                  </Link>
                }
              </Typography>

              {currentUser &&
                <div>
                  <Tooltip title="Log out">
                    <IconButton edge="end" color="inherit" onClick={logOut} size="large">
                      <ExitToAppRoundedIcon/>
                    </IconButton>
                  </Tooltip>
                  <span style={{ paddingLeft: 10 }}>Logged in as: {currentUser.userName}</span>
                </div>
              }
            </Toolbar>
          </AppBar>
        </Box>
        <Switch>
          <Route exact path='/' component={LogIn}/>
          <Route exact path='/gameSessions'>
            {currentUser && currentUser.userType === 'player' ? <GameSessionListing /> : <Redirect to="/" /> }
          </Route>
          <Route exact path='/feedback'>
            {currentUser && currentUser.userType === 'ops' ? <FeedbackListing /> : <Redirect to="/" /> }
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
    );
}

export default App;
