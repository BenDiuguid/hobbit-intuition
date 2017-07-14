const Twit = require('twit');

module.exports = () => {
  const bot = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
  });

  const stream = bot.stream('statuses/filter', {
    track: 'artificial intelligence,#ArtificialIntelligence',
    language: 'en',
    filter_level: 'low',
  });

  stream.on('connect', () => console.log('connect'));
  stream.on('reconnect', () => console.log('reconnect'));
  stream.on('connected', () => console.log('connected'));
  stream.on('disconnect', () => console.log('disconnect'));
  // stream.on('message', msg => (console.log('MESSAGE'), console.log(msg)));
  stream.on('warning', warn => (console.log('WARNING'), console.log(warn)));
  stream.on('error', err => (console.log('ERROR'), console.log(err)));

  stream.on('tweet', tweet => handleTweet(tweet));

  const tweetStatus = (bot, status) => bot.post('statuses/update', { status });

  const replaceText = text =>
    text
      .replace(/artificial\sintelligence/gi, 'Hobbit Intuition')
      .replace(/artificialintelligence/gi, 'HobbitIntuition');

  const replaceAbbreviation = text => text.replace(/AI/g, 'HI');

  async function handleTweet(tweet) {
    console.log();
    console.log(`received tweet: ${tweet.text}`);
    const text = tweet.truncated ? tweet.extended_tweet.full_text : tweet.text;
    const status = replaceText(text);
    debugger;
    if (status === text || tweet.retweeted_status) return;
    const { data } = await tweetStatus(bot, replaceAbbreviation(status));
    console.log(data);
    console.log(`Tweeted ${data.text}`);
    console.log();
  }

  return bot;
};
