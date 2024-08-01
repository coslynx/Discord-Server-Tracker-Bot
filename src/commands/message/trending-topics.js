const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const messageService = require('../../services/messageService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('trending-topics')
    .setDescription('Get a list of trending topics on the server'),
  async execute(interaction) {
    try {
      const trendingTopics = await messageService.getTrendingTopics();

      if (trendingTopics.length === 0) {
        return interaction.reply({
          content: 'No trending topics found.',
          ephemeral: true,
        });
      }

      const embed = new EmbedBuilder()
        .setTitle('Trending Topics')
        .setColor(0x0099ff)
        .setDescription(
          trendingTopics.map((topic) => {
            return `**${topic.topic}**: ${topic.count} mentions`;
          }).join('\n')
        );

      return interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error getting trending topics:', error);
      return interaction.reply({
        content: 'Error getting trending topics. Please try again later.',
        ephemeral: true,
      });
    }
  },
};