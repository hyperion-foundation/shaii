const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const pkg = require('../package.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('version')
    .setDescription('Checking the bot version'),
  async execute(interaction) {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#edcced')
          .setDescription(`\`v${pkg.version}\``)
      ]
    }) && console.log(`[LOG (Info)]: "${interaction.user.username}" (User ID: ${interaction.user.id}) just used the "/version" command on "${interaction.channel.name}" (Channel ID: ${interaction.channel.id}).`);
  }
};