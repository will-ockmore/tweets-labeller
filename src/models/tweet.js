const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  created_at: Date,
  id_str: String,
  text: String,
  sentiment_label: String,
  truncated: Boolean,
  user: {
    id_str: String,
    name: String,
    screen_name: String,
    location: String,
    followers_count: Number,
    statuses_count: Number,
    lang: String,
  },
  entities: {
    hashtags: [
      {
        text: String,
      }
    ],
    urls: Array,
    user_mentions: [
      {
        screen_name: String,
        name: String,
      }
    ],
    symbols: []
  },
  favorited: Boolean,
  retweeted: Boolean,
  lang: String,
  timestamp_ms: Number,
});

module.exports = mongoose.model('Tweet', TweetSchema);
