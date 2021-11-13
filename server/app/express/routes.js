const express = require('express');

const feedbackRoutes = require('../modules/feedback/feedback-routes');

const router = express.Router();

module.exports = async (app) => {

  router.get('/feedback', feedbackRoutes.getAll);
  router.post('/feedback/:gameSessionId', feedbackRoutes.insertFeedback);

  app.use('/api', router);
};
