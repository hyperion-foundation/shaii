const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('voicelatency')
    .setDescription('Checking the bot Voice Connection latency'),
  async execute(interaction) {
    // const voiceChannel = interaction.member.voice.channel;
    // if (!voiceChannel) {
    //   interaction.reply({
    //     embeds: [
    //       new EmbedBuilder()
    //         .setColor('#edcced')
    //         .setDescription('You must be in a voice channel!')
    //     ]
    //   }) && console.log(`[LOG (Error)]: "${interaction.user.tag}" (${interaction.user.id}) just used the "/voicelatency" command but the user not in a voice channel.`);
    // } else {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#edcced')
          .setDescription('This command is currently unavailable.')
      ]
    }) && console.log(`[LOG (Info)]: "${interaction.user.username}" (${interaction.user.id}) just used the "/voicelatency" command on "${interaction.channel.name}" (Channel ID: ${interaction.channel.id}).`);
    // const voiceConnection = await interaction.guild.voice;
    // if (voiceConnection) {
    //   const connectionTime = voiceConnection.connectionTime;
    //   if (connectionTime) {
    //     const connectionLatency = Date.now() - connectionTime;
    //     await interaction.reply({
    //       embeds: [
    //         new EmbedBuilder()
    //           .setColor('#edcced')
    //           .setDescription(`Voice Connection Latency: \`${connectionLatency}\` ms.`)
    //       ]
    //     }) && console.log(`[LOG (Info)]: "${interaction.user.tag}" (${interaction.user.id}) just used the "/voicelatency" command.`);
    //   }
    // }
    // }
  }
};