const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const messageService = require('../../services/messageService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('message-stats')
    .setDescription('Get message statistics for the server')
    .addStringOption((option) =>
      option
        .setName('author')
        .setDescription('The user who sent the messages (optional)')
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName('channel')
        .setDescription('The channel where the messages were sent (optional)')
        .setRequired(false)
    )
    .addIntegerOption((option) =>
      option
        .setName('limit')
        .setDescription('The maximum number of messages to display (optional)')
        .setRequired(false)
    ),
  async execute(interaction) {
    const author = interaction.options.getString('author');
    const channel = interaction.options.getString('channel');
    const limit = interaction.options.getInteger('limit');

    try {
      const messages = await messageService.getMessages({
        author,
        channel,
        limit,
      });

      if (messages.length === 0) {
        return interaction.reply({
          content: 'No messages found with the given criteria.',
          ephemeral: true,
        });
      }

      const embed = new EmbedBuilder()
        .setTitle('Message Statistics')
        .setColor(0x0099ff)
        .setDescription(
          messages.map((message) => {
            return `**Author:** ${message.author.tag}\n**Channel:** ${message.channel}\n**Content:** ${message.content}\n**Timestamp:** ${new Date(
              message.timestamp
            ).toLocaleString()}`;
          }).join('\n\n')
        );

      return interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error getting message statistics:', error);
      return interaction.reply({
        content: 'Error getting message statistics. Please try again later.',
        ephemeral: true,
      });
    }
  },
};