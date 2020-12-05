import { Client, Intents } from 'discord.js';

const bot = new Client({ ws: { intents: Intents.NON_PRIVILEGED } });

bot.on('message', message => {
  if (!message.author.bot && message.content === 'ping!')
    message.channel.send('pong!')
      .catch(console.error);
});

bot.on('ready', () => {
  console.info('Ping Pong have logged in to Discord.');

  bot.user?.setPresence({
    activity: {
      type: 'PLAYING',
      name: '自動デプロイ実験中',
    }
  });
});

bot.login(process.env['PING_PONG_TOKEN'])
  .then(process.on('SIGTERM', bot.destroy))
  .catch(console.error);
