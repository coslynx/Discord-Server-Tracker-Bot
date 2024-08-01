const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const logger = require('../../utils/logger');
const config = require('../../utils/config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('set-logging-level')
    .setDescription('Set the bot\'s logging level')
    .addStringOption((option) =>
      option
        .setName('level')
        .setDescription('The logging level to set')
        .setRequired(true)
        .addChoices(
          { name: 'info', value: 'info' },
          { name: 'warn', value: 'warn' },
          { name: 'error', value: 'error' },
          { name: 'debug', value: 'debug' },
          { name: 'verbose', value: 'verbose' },
          { name: 'silly', value: 'silly' }
        )
    ),
  async execute(interaction) {
    const level = interaction.options.getString('level');
    try {
      // Update the logging level in the config
      config.loggingLevel = level;

      // Update the logger with the new level
      logger.level = level;

      const embed = new EmbedBuilder()
        .setTitle('Logging Level Updated')
        .setColor(0x0099ff)
        .setDescription(`The logging level has been set to **${level}**.`);

      return interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error setting logging level:', error);
      return interaction.reply({
        content: 'Error setting logging level. Please try again later.',
        ephemeral: true,
      });
    }
  },
};