var express = require('express');
var router = express.Router();

var Tweet = require('../models/tweet.js');


function getDb(req) {
  return req.app.get('db');
}


router.get('/', (req, res) => {
  var tweet = Tweet.aggregate(
    { $sample: { size: 5 } },
    { $match: { sentiment_label: { $exists: false } } },
    (err, tweets) => {
      if (err) {
        res.send(err)
      }

      res.json(tweets);
    }
  )
});

router.post('/', (req, res) => {
    res.send('POST handler for api.');
});

module.exports = router;
