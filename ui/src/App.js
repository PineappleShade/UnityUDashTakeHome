import * as React from 'react';
import {
  AppBar,
  createTheme, CssBaseline, IconButton, Toolbar, Tooltip, Typography,
} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import GameSessionListing from "./layout/game-session-listing";
import {makeStyles} from "@mui/styles";
import LogIn from "./layout/log-in";
import FeedbackListing from "./layout/feedback-listing";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import {useEffect, useState} from "react";

const useStyles = makeStyles(() => ({
  navbarLink: {
    paddingLeft: 30,
    textDecoration: 'none',
    color: '#FFF',
  },
}));

function App() {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')));

    useEffect(() => {
      window.addEventListener('storage', () => {
        setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
      });

      return () => {
        window.removeEventListener('storage', () => {
          setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
        });
      };
    }, [currentUser]);

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  function logOut(e){
    e.preventDefault();
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  }

  function refreshUser(user){
    setCurrentUser(user);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
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
        <Switch>
          <Route exact path='/'>
            <LogIn callback={refreshUser}/>
          </Route>
          <Route exact path='/gameSessions'>
            <GameSessionListing />
          </Route>
          <Route exact path='/feedback'>
            <FeedbackListing />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
    );
}

export default App;
