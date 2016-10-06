const express = require('express');
const router = express.Router();
const AvoidTraffic = require('../lib/google-client-avoid-traffic');

/* GET home page. */
router.get('/', (req, res, next) => {
  const avoidTraffic = new AvoidTraffic(process.env.GOOGLE_API_KEY);

  avoidTraffic.getData({
    origins: ['7090 Mariposa St, San Diego'],
    destinations: ['1135 City Lights Dr, Aliso Viejo'],
    avoid: ['tolls'],
    units: 'imperial',
  })
    .then(response => {
      console.log(`Success: ${JSON.stringify(response)}`);
      res.json(response);
    })
    .catch(error => {
      console.log(`Error: ${JSON.stringify(error)}`);
    });
});

module.exports = router;
