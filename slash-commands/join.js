/*
 * This is "join" for slash command.
 * Once the command is issued, the bot will join to your current connected channel.
 *
 * Example usage:
 * /join
*/

const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Makes the bot join to voice channel that you are currently connected to'),
  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#edcced')
            .setDescription('You must enter a voice channel!')
        ]
      }) && console.log(`[LOG (Error)]: "${interaction.user.username}" (User ID: ${interaction.user.id}) just used the "/join" command on "${interaction.channel.name}" (Channel ID: ${interaction.channel.id}), but the user didn't entered a voice channel.`);
    }
    interaction.client.distube.voices.join(voiceChannel) && interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#edcced')
          .setDescription(`Successfully connected to \`${interaction.member.voice.channel.name}\`.`)
      ]
    }) && console.log(`[LOG (Info)]: "${interaction.client.user.username}" (Client ID: ${interaction.client.user.id}) has successfully connected to "${interaction.member.voice.channel.name}" (Voice Channel ID: ${interaction.member.voice.channel.id}). Requested by "${interaction.user.username}" (User ID: ${interaction.user.id}) using the "/join" command.`);
  }
};