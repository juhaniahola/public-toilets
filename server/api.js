const express = require('express');

const Toilet = require('./models/toilet');
const haversine = require('./haversine');

const router = express.Router();

router.get('/', (_req, res, _next) => {
  return res
    .json({ message: 'Public Toilets API', response: null, status: 200 })
    .status(200);
});

router.get('/toilets', async (req, res, _next) => {
  const kilometerInMeters = 1000;
  const kilometers = 3;
  const maxDistance = kilometerInMeters * kilometers;

  const lat = req.query.lat;
  const long = req.query.long;

  // const lat = 60.20
  // const long = 24.88

  if (!lat || !long) {
    return res
      .json({
        message: 'No query params passed or not passed correctly',
        response: null,
      })
      .status(404);
  }

  if (lat && long) {
    await Toilet.find(
      {
        location: {
          $near: {
            $maxDistance: maxDistance,
            $geometry: {
              type: 'Point',
              coordinates: [long, lat],
            },
          },
        },
      },
      (error, results) => {
        if (error) {
          return res
            .json({ message: 'There was an error', response: null })
            .status(500);
        }

        if (results && results.length) {
          const resultsWithDistance = results.map((elem) => {
            const locationLong = elem.location.coordinates[0];
            const locationLat = elem.location.coordinates[1];

            const distance = haversine({
              lat1: lat,
              lon1: long,
              lat2: locationLat,
              lon2: locationLong,
            });

            return {
              _id: elem._id,
              name: elem.name,
              location: elem.location,
              distance,
            };
          });

          return res
            .json({
              message: `Results within ${kilometers} kilometers`,
              response: resultsWithDistance,
            })
            .status(200);
        }

        return res.json({ message: 'No results', response: null }).status(404);
      },
    );
  }
});

module.exports = router;
