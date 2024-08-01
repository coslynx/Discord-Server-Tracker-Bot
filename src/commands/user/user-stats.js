const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const userService = require('../../services/userService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('user-stats')
    .setDescription('Get user statistics for the server.')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user to get statistics for (optional)')
        .setRequired(false)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser('user');

    try {
      const stats = await userService.getUserStats(user);

      if (!stats) {
        return interaction.reply({
          content: 'No user found with the given criteria.',
          ephemeral: true,
        });
      }

      const embed = new EmbedBuilder()
        .setTitle(`${user.tag} Statistics`)
        .setColor(0x0099ff)
        .addFields(
          { name: 'Messages Sent', value: stats.messageCount.toString(), inline: true },
          { name: 'Voice Time', value: stats.voiceTime.toString(), inline: true },
          { name: 'Invites Sent', value: stats.inviteCount.toString(), inline: true },
          { name: 'Invites Accepted', value: stats.inviteAcceptedCount.toString(), inline: true },
          { name: 'Join Date', value: stats.joinDate.toLocaleString(), inline: true }
        );

      return interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error getting user statistics:', error);
      return interaction.reply({
        content: 'Error getting user statistics. Please try again later.',
        ephemeral: true,
      });
    }
  },
};