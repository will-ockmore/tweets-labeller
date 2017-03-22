const express = require('express');

const Tweet = require('../models/tweet.js');


const router = express.Router();

router.get('/', (req, res) => {
  Tweet.aggregate(
    { $sample: { size: 5 } },
    { $match: { sentiment_label: { $exists: false } } },
    (err, tweets) => {
      if (err) {
        res.send(err);
      }

      res.json(tweets);
    }
  );
});

router.route('/:id')
  .get((req, res) => {
    Tweet.findById(req.params.id, (err, tweet) => {
      if (err) {
        res.send(err);
      }

      res.json(tweet);
    });
  })

  .post((req, res) => {
    Tweet.findById(req.params.id, (err, tweet) => {
      if (err) {
        res.send(err);
      }

      tweet.sentiment_label = req.body.sentiment_label;

      tweet.save(error => {
        if (error) {
          res.send(error);
        }

        res.json({ message: 'Tweet updated!', data: tweet });
      });
    });
  });

module.exports = router;
