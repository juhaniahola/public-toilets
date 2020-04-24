const express = require('express');

const Toilet = require('./models/toilet');

const router = express.Router();

router.get('/', (_req, res, _next) => {
  return res.json({ message: 'Public Toilets API', response: null, status: 200 }).status(200)
})

router.get('/toilets', async (req, res, _next) => {
  const lat = req.query.lat;
  const long = req.query.long;

  if(lat && long) {
    const toilets = await Toilet.find();
    return res.json({ message: 'Toilets within 5km radius', response: toilets }).status(200)
  }
  
  return res.json({ message: 'No query params passed or not passed correctly', response: null }).status(404);
})

module.exports = router;