const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Makes the bot leave from the current connected voice channel'),
  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#edcced')
            .setDescription('You can\'t disconnect me if you are not in voice channel with me.')
        ]
      }) && console.log(`[LOG (Error)]: "${interaction.user.tag}" (User ID: ${interaction.user.id}) trying to disconnect "${interaction.client.user.username}" on "${interaction.channel.name}" (Channel ID: ${interaction.channel.id}), but the user didn't entered a voice channel.`);
    }
    interaction.client.distube.voices.leave(voiceChannel);
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#edcced')
          .setDescription(`Successfully disconnected from \`${interaction.member.voice.channel.name}\`.`)
      ]
    }) && console.log(`[LOG (Info)]: "${interaction.client.user.username}" (Client ID: ${interaction.client.user.id}) successfully disconnected from "${interaction.member.voice.channel.name}" (Voice Channel ID: ${interaction.member.voice.channel.id}). Requested by "${interaction.user.tag}" (User ID: ${interaction.user.id}) using the "/leave" command.`);
  }
};