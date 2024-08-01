const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show a list of available commands'),
  async execute(interaction) {
    const commands = interaction.client.application.commands.cache.filter(
      (command) => command.defaultPermission === true
    );

    const embed = new EmbedBuilder()
      .setTitle('Available Commands')
      .setColor(0x0099ff)
      .setDescription(
        commands
          .map((command) => `**/${command.name}**: ${command.description}`)
          .join('\n')
      );

    await interaction.reply({ embeds: [embed] });
  },
};