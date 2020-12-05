import { Client, Intents } from 'discord.js';
import Twitter from 'twitter';

const commitHash = process.env['COMMIT_HASH'];

const twitter = new Twitter({
  consumer_key       : process.env['TWITTER_CONSUMER_KEY'],
  consumer_secret    : process.env['TWITTER_CONSUMER_SECRET'],
  access_token_key   : process.env['TWITTER_ACCESS_TOKEN'],
  access_token_secret: process.env['TWITTER_ACCESS_TOKEN_SECRET'],
});

const bot = new Client({ ws: { intents: Intents.NON_PRIVILEGED } });

bot.on('ready', () => {
  process.on('exit', bot.destroy);
  console.info('Ping Pong has logged in to Discord.');

  bot.user?.setPresence({
    activity: {
      type: 'PLAYING',
      name: `現在のコミット: ${commitHash?.slice(0, 7) ?? '不明'}`,
    }
  });
});

bot.on('message', message => {
  if (message.content === 'ping!')
    message.channel.send('pong!')
      .catch(console.error);

  const match = message.content.match(/^\/tweets (.+)/);
  if (match)
    twitter.get('search/tweets', { q: `${match[1]} exclude:retweets`, count: 5 })
      .then(tweets => {
        message.channel.send(
          tweets.statuses
            .map(tweet => `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`)
            .join('\n')
        )
          .catch(console.error);
      })
      .catch(console.error);
});

bot.login(process.env['PING_PONG_TOKEN'])
  .catch(console.error);
