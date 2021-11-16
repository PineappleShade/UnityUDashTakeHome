import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem, Select,
} from "@mui/material";
import _ from 'lodash';
import { useHistory, withRouter} from "react-router-dom";
import axios from "axios";

function LogIn(props){
  const API_ENDPOINT = 'http://localhost:3000/api';
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState([]);
  const localStorage = window.localStorage;

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers(){
    try{
      setIsLoading(true);
      const users = await axios.get(`${API_ENDPOINT}/users`);
      setUsers(users.data);
      setIsLoading(false);
    } catch (e) {
      console.error('Failed to fetch game sessions: ' + e.message);
    }
  }

  const handleChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    const currentUser = _.find(users, { userId: selectedUser });
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    props.callback(currentUser);
    if (currentUser.userType === 'player'){
      history.push(`/gameSessions`);
    }
    else if (currentUser.userType === 'ops'){
      history.push(`/feedback`);
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ mt: 1, width: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="user-select-label">User</InputLabel>
          <Select
            id="user-select"
            labelId="user-select-label"
            value={selectedUser}
            label="User"
            onChange={handleChange}
          >
            {users.map((user) => (
              <MenuItem key={user.userId} value={user.userId}>{user.userName}</MenuItem>
            ))

            }
          </Select>
        </FormControl>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogIn}
        >
          Log In
        </Button>
      </Box>
    </Box>
  )
}

export default withRouter(LogIn);
