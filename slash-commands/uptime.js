/*
 * This is "uptime" command that telling how long the bot online from start.
 * Example usage:
 * s!uptime (Legacy Command)
 * /uptime (Slash Command)
*/

const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('uptime')
    .setDescription('Check the uptime of the bot'),
  async execute(interaction) {
    let totalSeconds = (interaction.client.uptime / 1000);
    const days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#edcced')
          .setDescription(`**${days}** days, **${hours}** hours, **${minutes}** minutes, **${seconds}** seconds.`)
      ]
    }) && console.log(`[LOG (Info)]: "${interaction.user.username}" (User ID: ${interaction.user.id}) just used the "/uptime" command on "${interaction.channel.name}" (Channel ID: ${interaction.channel.name}).`);
  }
};