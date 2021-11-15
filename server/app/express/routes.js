const express = require('express');

const feedbackRoutes = require('../modules/feedback/feedback-routes');
const gameSessionRoutes = require('../modules/game-session/game-session-routes');

const router = express.Router();

module.exports = async (app) => {

  // Feedback
  router.get('/feedback', feedbackRoutes.getAll);
  router.get('/feedback/:gameSessionId', feedbackRoutes.getGameSessionFeedback);
  router.post('/feedback/:gameSessionId', feedbackRoutes.insertFeedback);

  // Game Sessions
  router.get('/gameSessions', gameSessionRoutes.getAll);

  app.use('/api', router);
};
