import React, { useEffect, useState } from 'react';
import axios from "axios";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem, OutlinedInput,
  Paper,
  Rating,
  Select, Skeleton,
  Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, ToggleButton, ToggleButtonGroup,
  Tooltip
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Redirect} from "react-router-dom";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paperItem: {
    padding: 2,
  },
}));

function FeedbackListing() {
  const API_ENDPOINT = 'http://localhost:3000/api';
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [orderBy, setOrderBy] = useState('created');
  const [sortOrder, setSortOrder] = useState('desc');
  const [rating, setRating] = useState([]);

  useEffect(() => {
    getFeedback();
  }, [orderBy, sortOrder, rating]);

  async function getFeedback(){
    try{
      setIsLoading(true);
      const gameSessions = await axios.get(`${API_ENDPOINT}/gameSessions`);
      const users = await axios.get(`${API_ENDPOINT}/users`);
      const feedback = await axios.get(`${API_ENDPOINT}/feedback`,
        {
          headers: {
            'x-sorting-by': orderBy,
            'x-sorting-order': sortOrder,
          },
          params : {
            rating: rating.length > 0 ? rating?.join(',') : null,
          }
        });
      if (feedback.status === 200){
        const parsedData = feedback?.data?.map( f => {
          const createdOn = new Date(f.created * 1000);
          const gameSessionName = _.find(gameSessions?.data, { gameSessionId: f.gameSessionId });
          const userName = _.find(users?.data, { userId: f.userId });
          return (
            {
              id: f.feedbackId,
              gameSessionId: gameSessionName?.gameSessionName,
              userId: userName?.userName,
              rating: f.rating,
              comment: f.comment,
              created: createdOn.toLocaleString('en-US'),
            }
          )
        });
        setRows(parsedData);
      }
      setIsLoading(false);
    } catch (e) {
      console.error('Failed to fetch feedback: ' + e.message);
    }
  }

  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };

  const handleFilterChange = (event) => {
    setRating(event.target.value);
  };

  const handleChangeOrderByAscDescFilter = (event, orderAscDescValue) => {
    setSortOrder(orderAscDescValue);
  };

  return (
    <div>
      {!localStorage.getItem('currentUser') &&
        <Redirect to="/" />
      }
      <Grid container>
        <Grid item xs={12} style={{ margin: 10 }}>
          <Paper className={classes.paper} variant="outlined">
            <div className={classes.paperItem}>
              <FormControl sx={{ m: 1, width: 150 }}>
                <InputLabel id="rating-select-label">Filter By Rating</InputLabel>
                <Select
                  labelId="rating-select-label"
                  id="rating-select"
                  multiple
                  value={rating}
                  onChange={handleFilterChange}
                  input={<OutlinedInput id="select-multiple-rating" label="Rating" />}
                  renderValue={(selected) => selected.sort().join(', ')}
                >
                  {Array.from(new Array(6)).map((item, index) => (
                    <MenuItem key={index} value={index}>
                      <Rating name="read-only" value={index} readOnly />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className={classes.paperItem}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="order-by-select-label">Order By</InputLabel>
                <Select
                  labelId="order-by-select-label"
                  id="order-by-select"
                  value={orderBy}
                  label="Order By"
                  onChange={handleOrderByChange}
                  autoWidth
                >
                  <MenuItem value={'created'}>Created on</MenuItem>
                  <MenuItem value={'rating'}>Rating</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={classes.paperItem}>
              <ToggleButtonGroup value={sortOrder} exclusive onChange={handleChangeOrderByAscDescFilter} aria-label="thumbnails size ratio">
                <Tooltip title={'Ascending'} value="asc" placement="top-start" arrow>
                  <ToggleButton value="asc" aria-label="asc thumbnails">
                    Asc
                  </ToggleButton>
                </Tooltip>
                <Tooltip title={'Descending'} value="desc" placement="top" arrow>
                  <ToggleButton value="desc" aria-label="desc thumbnails">
                    Desc
                  </ToggleButton>
                </Tooltip>
              </ToggleButtonGroup>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <br/>
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width={'18%'}>Feedback ID</TableCell>
              <TableCell width={'15%'}>Game Session</TableCell>
              <TableCell width={'15%'}>User</TableCell>
              <TableCell width={'5%'}>Rating</TableCell>
              <TableCell width={'36%'}>Comment</TableCell>
              <TableCell width={'11%'}>Created On</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading &&
              <TableRow key={'Skeleton'}>
                <TableCell><Skeleton variant="rectangular" width={'100%'} height={150} /></TableCell>
                <TableCell><Skeleton variant="rectangular" width={'100%'} height={150} /></TableCell>
                <TableCell><Skeleton variant="rectangular" width={'100%'} height={150} /></TableCell>
                <TableCell><Skeleton variant="rectangular" width={'100%'} height={150} /></TableCell>
                <TableCell><Skeleton variant="rectangular" width={'100%'} height={150} /></TableCell>
                <TableCell><Skeleton variant="rectangular" width={'100%'} height={150} /></TableCell>
              </TableRow>
            }
            {!isLoading &&
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.gameSessionId}</TableCell>
                  <TableCell>{row.userId}</TableCell>
                  <TableCell><Rating value={row.rating} readOnly/></TableCell>
                  <TableCell>{row.comment}</TableCell>
                  <TableCell>{row.created}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default FeedbackListing;
