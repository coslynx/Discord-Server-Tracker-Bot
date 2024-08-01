const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const userService = require('../../services/userService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('user-activity')
    .setDescription('Get user activity details for the server.')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user to get activity details for (optional)')
        .setRequired(false)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;

    try {
      const activity = await userService.getUserActivity(user);

      if (!activity) {
        return interaction.reply({
          content: 'No activity found for this user.',
          ephemeral: true,
        });
      }

      const embed = new EmbedBuilder()
        .setTitle(`${user.tag} Activity`)
        .setColor(0x0099ff)
        .addFields(
          {
            name: 'Messages Sent',
            value: activity.messageCount.toString(),
            inline: true,
          },
          {
            name: 'Voice Time (Hours)',
            value: (activity.voiceTime / 3600).toFixed(2),
            inline: true,
          },
          {
            name: 'Invites Sent',
            value: activity.inviteCount.toString(),
            inline: true,
          },
          {
            name: 'Invites Accepted',
            value: activity.inviteAcceptedCount.toString(),
            inline: true,
          },
          {
            name: 'Join Date',
            value: activity.joinDate.toLocaleString(),
            inline: true,
          }
        );

      return interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error getting user activity:', error);
      return interaction.reply({
        content: 'Error getting user activity. Please try again later.',
        ephemeral: true,
      });
    }
  },
};