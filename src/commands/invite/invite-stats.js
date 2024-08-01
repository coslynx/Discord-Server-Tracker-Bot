const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const inviteService = require('../../services/inviteService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('invite-stats')
    .setDescription('Get invite statistics for the server.')
    .addStringOption((option) =>
      option
        .setName('inviter')
        .setDescription('The user who created the invites (optional)')
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName('invitee')
        .setDescription('The user who used the invite (optional)')
        .setRequired(false)
    )
    .addIntegerOption((option) =>
      option
        .setName('limit')
        .setDescription('The maximum number of invites to display (optional)')
        .setRequired(false)
    ),
  async execute(interaction) {
    const inviter = interaction.options.getString('inviter');
    const invitee = interaction.options.getString('invitee');
    const limit = interaction.options.getInteger('limit');

    try {
      const invites = await inviteService.getInvites({
        inviter,
        invitee,
        limit,
      });

      if (invites.length === 0) {
        return interaction.reply({
          content: 'No invites found with the given criteria.',
          ephemeral: true,
        });
      }

      const embed = new EmbedBuilder()
        .setTitle('Invite Statistics')
        .setColor(0x0099ff)
        .setDescription(
          invites.map((invite) => {
            return `**Inviter:** ${invite.inviter.tag}
            **Invitee:** ${invite.invitee.tag}
            **Code:** ${invite.code}
            **Uses:** ${invite.uses}/${invite.maxUses}
            **Timestamp:** ${new Date(invite.timestamp).toLocaleString()}`;
          }).join('\n\n')
        );

      return interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error getting invite statistics:', error);
      return interaction.reply({
        content: 'Error getting invite statistics. Please try again later.',
        ephemeral: true,
      });
    }
  },
};