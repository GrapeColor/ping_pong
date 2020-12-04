import { Client, Intents } from 'discord.js';

const bot = new Client({ ws: { intents: Intents.NON_PRIVILEGED } });

console.log(process.env['EXPERIMENT_ENV']);

bot.on('message', message => {
  if (message.content = 'ping!') message.channel.send('pong!');
});

bot.login(process.env['PING_PONG_TOKEN'])
  .then(() => {
    process.on('SIGTERM', bot.destroy);
    console.info('Ping Pong have logged in to Discord.');
  })
  .catch(console.error);
