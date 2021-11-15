import React from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem, Select,
} from "@mui/material";
import _ from 'lodash';
import {useHistory} from "react-router-dom";

function LogIn(){
  const history = useHistory();
  const [selectedUser, setSelectedUser] = React.useState('');
  const localStorage = window.localStorage;
  const listOfUsers = [
    {
      userId: '30ef5656-4500-11ec-81d3-0242ac130003',
      userName: 'Player 1',
      userType: 'player',
    },
    {
      userId: '4023e4b6-4500-11ec-81d3-0242ac130003',
      userName: 'Player 2',
      userType: 'player',
    },
    {
      userId: '44242972-4500-11ec-81d3-0242ac130003',
      userName: 'Player 3',
      userType: 'player',
    },
    {
      userId: '4aa9155a-4500-11ec-81d3-0242ac130003',
      userName: 'Ops TeamMember 1',
      userType: 'ops',
    },
  ]

  const handleChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    const currentUser = _.find(listOfUsers, { userId: selectedUser });
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    console.log({currentUser});
    if (currentUser.userType === 'player'){
      console.log('player');
      history.push(`/gameSessions`);
    }
    else if (currentUser.userType === 'ops'){
      console.log('ops');
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
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <FormControl fullWidth>
          <InputLabel id="user-select-label">User</InputLabel>
          <Select
            id="user-select"
            labelId="user-select-label"
            value={selectedUser}
            label="User"
            onChange={handleChange}
          >
            <MenuItem value={'30ef5656-4500-11ec-81d3-0242ac130003'}>Player 1</MenuItem>
            <MenuItem value={'4023e4b6-4500-11ec-81d3-0242ac130003'}>Player 2</MenuItem>
            <MenuItem value={'44242972-4500-11ec-81d3-0242ac130003'}>Player 3</MenuItem>
            <MenuItem value={'4aa9155a-4500-11ec-81d3-0242ac130003'}>Ops TeamMember 1</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
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

export default LogIn;