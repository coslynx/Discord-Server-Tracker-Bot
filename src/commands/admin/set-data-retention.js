const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const config = require('../../utils/config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('set-data-retention')
    .setDescription('Set the data retention policy for the bot')
    .addIntegerOption((option) =>
      option
        .setName('days')
        .setDescription('Number of days to retain data (0 for unlimited)')
        .setRequired(true)
    ),
  async execute(interaction) {
    const days = interaction.options.getInteger('days');
    try {
      // Update the data retention policy in the config
      config.dataRetentionDays = days;

      // Optionally, you might want to implement data purging here based on the new setting
      // ...

      const embed = new EmbedBuilder()
        .setTitle('Data Retention Policy Updated')
        .setColor(0x0099ff)
        .setDescription(
          `Data retention policy has been set to **${days} days**. ` +
            (days === 0 ? 'Data will be retained indefinitely.' : '')
        );

      return interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error setting data retention policy:', error);
      return interaction.reply({
        content:
          'Error setting data retention policy. Please try again later.',
        ephemeral: true,
      });
    }
  },
};