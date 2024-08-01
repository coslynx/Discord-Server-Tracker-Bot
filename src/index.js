const Discord = require('discord.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const config = require('./utils/config');
const commands = require('./commands');
const events = require('./events');
const models = require('./models');

dotenv.config();

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.GUILD_VOICE_STATES] });

// Connect to the database
mongoose.connect(config.databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    logger.info('Connected to database.');
  })
  .catch((err) => {
    logger.error('Error connecting to database:', err);
  });

// Log in the bot
client.on('ready', () => {
  logger.info(`Logged in as ${client.user.tag}`);

  // Register commands
  commands.register(client);
});

// Register event handlers
events.register(client);

client.login(config.discordToken)
  .catch((err) => {
    logger.error('Error logging in:', err);
  });