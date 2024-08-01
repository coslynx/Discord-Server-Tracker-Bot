const dotenv = require('dotenv');
const logger = require('./logger');

dotenv.config();

const config = {
  discordToken: process.env.DISCORD_TOKEN,
  databaseUrl: process.env.MONGO_URI,
  guildId: process.env.GUILD_ID, // Add this for guild-specific functionalities
  loggingLevel: process.env.LOGGING_LEVEL || 'info',
  dataRetentionDays: parseInt(process.env.DATA_RETENTION_DAYS) || 0, // 0 for unlimited
};

// Optional: Validate configuration values
if (!config.discordToken) {
  logger.error('Missing DISCORD_TOKEN in .env file.');
  process.exit(1);
}

if (!config.databaseUrl) {
  logger.error('Missing MONGO_URI in .env file.');
  process.exit(1);
}

if (!config.guildId) {
  logger.warn('GUILD_ID is not set. Bot will operate on all guilds.');
}

module.exports = config;