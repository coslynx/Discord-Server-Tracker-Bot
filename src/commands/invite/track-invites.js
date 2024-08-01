const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const inviteService = require('../../services/inviteService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('track-invites')
    .setDescription('Track invites on the server.'),
  async execute(interaction) {
    try {
      // Get the invite code from the interaction
      const inviteCode = interaction.options.getString('inviteCode');

      // Validate the invite code
      if (!inviteCode) {
        return interaction.reply({
          content: 'Please provide a valid invite code.',
          ephemeral: true,
        });
      }

      // Track the invite using the inviteService
      const invite = await inviteService.trackInvite(inviteCode);

      // Create an embed to display the invite information
      const embed = new EmbedBuilder()
        .setTitle('Invite Tracked')
        .setColor(0x0099ff)
        .setDescription(
          `**Inviter:** ${invite.inviter.tag}\n**Invitee:** ${invite.invitee.tag}\n**Code:** ${invite.code}\n**Uses:** ${invite.uses}/${invite.maxUses}\n**Timestamp:** ${new Date(
            invite.timestamp
          ).toLocaleString()}`
        );

      // Send the embed to the user
      return interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error tracking invite:', error);
      return interaction.reply({
        content: 'Error tracking invite. Please try again later.',
        ephemeral: true,
      });
    }
  },
};