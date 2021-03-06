import React, { useEffect, useState } from 'react';
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent, Dialog, DialogActions, DialogContent, DialogTitle,
  Grid,
  Rating,
  Skeleton, TextField,
  Typography
} from "@mui/material";
import {Redirect} from "react-router-dom";

function GameSessionListing(){
  const API_ENDPOINT = 'http://localhost:3000/api';
  const [isLoading, setIsLoading] = useState(false);
  const [gameSessions, setGameSessions] = useState([]);
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState(null);
  const [selectedGameSession, setSelectedGameSession] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    getGameSessions();
  }, []);

  async function getGameSessions(){
    try{
      setIsLoading(true);
      const gameSessions = await axios.get(`${API_ENDPOINT}/gameSessions`)
      setGameSessions(gameSessions.data);
      setIsLoading(false);
    } catch (e) {
      console.error('Failed to fetch game sessions: ' + e.message);
    }
  }

  function renderGameSessions(){
    return gameSessions.map((gameSession) => {
      let date = new Date(gameSession.created * 1000);

      return (
        <Grid item key={gameSession.gameSessionId}>
            <Card sx={{ minWidth: 275 }}>
              <Box border={1} borderRadius={1}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {gameSession.gameSessionName}
                    </Typography>
                    <Typography variant="body2">
                      {date.toLocaleString()}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" onClick={(event) => handleOpenDialog(event, gameSession.gameSessionId)}>Leave Feedback</Button>
                </CardActions>
              </Box>
            </Card>
        </Grid>
      );
    })

  }

  const handleFeedbackDialogClose = () => {
    setIsFeedbackDialogOpen(false);
    setSelectedGameSession(null);
  };

  const handleSubmitFeedback = async () => {
    await axios.post(`${API_ENDPOINT}/feedback/${selectedGameSession}`, {
      userId: currentUser.userId,
      rating: rating,
      comment: comment,
    }).catch((e) => {
      if (e.response){
        const errorMessage = e.response.data.error;
        const status = `${e.response.status} ${e.response.statusText}` ;
        console.error(`Failed to submit feedback: \n ${status} \n ${errorMessage}`);
        alert(`Failed to submit feedback: \n ${status} \n ${errorMessage}`);
      }
    });

    setComment(null);
    setRating(null);
    setIsFeedbackDialogOpen(false);
  };

  const handleOpenDialog = (event, gameSessionId) => {
    setSelectedGameSession(gameSessionId);
    setIsFeedbackDialogOpen(true);
  };

  return (
    <Grid container sx={{ padding: 4 }} spacing={2} direction="row" justifyContent="center" alignItems="flex-start">
      {!localStorage.getItem('currentUser') &&
        <Redirect to="/" />
      }
      {isLoading &&
      Array.from(new Array(20)).map((item, index) => (
          <Grid item key={index}>
            <Skeleton variant="rectangular" width={275} height={132} />
          </Grid>
        ))
      }
      {!isLoading &&
        renderGameSessions()
      }
      <Dialog
        open={isFeedbackDialogOpen}
        onClose={handleFeedbackDialogClose}
        aria-labelledby="bug-dialog"
        fullWidth
        maxWidth={'sm'}>
        <DialogTitle id="form-dialog-title">Submit Feedback</DialogTitle>
        <DialogContent>
          <Typography component="legend">Rating</Typography>
          <Rating
            value={rating}
            onChange={(event, newRating) => {
              setRating(newRating);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="feedback-comment"
            label="Comment"
            variant="outlined"
            multiline
            rows={6}
            fullWidth
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFeedbackDialogClose} variant="contained" color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitFeedback} variant="contained" color="primary">
            Submit Feedback
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default GameSessionListing;
