const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Set the bot volume based on number (percentage)'),
  async execute(interaction) {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#edcced')
          .setDescription(`This command currently unavailable. Use the \`${process.env.PREFIX}volume\` command instead.`)
      ]
    }) && console.log(`[LOG (Info)]: "${interaction.user.username}" (User ID: ${interaction.user.id}) just used the "/volume" command on "${interaction.channel.name}" (Channel ID: ${interaction.channel.id}).`);
  }
};

// const Discord = require('discord.js');
// const cooldown = new Set();

// module.exports = {
//   name: 'volume',
//   aliases: ['vol'],
//   run: async (client, message, args) => {
//     const voiceChannel = message.member.voice.channel;
//     if (!voiceChannel) {
//       message.channel.send({
//         embeds: [
//           new Discord.EmbedBuilder()
//             .setColor('#edcced')
//             .setDescription('Your action is prohibited!')
//         ]
//       }) && console.log(`[LOG (Error)]: "${message.author.tag}" (User ID: ${message.author.id}) trying to set the bot volume on "${message.channel.name}" (Channel ID: ${message.channel.id}), but unsucessful.`);
//     } else if (cooldown.has(message.author.id)) {
//       message.channel.send({
//         embeds: [
//           new Discord.EmbedBuilder()
//             .setColor('#edcced')
//             .setDescription('You\'re on cooldown! Wait for `5 seconds` before using it again.')
//         ]
//       }) && console.log(`${message.author.tag} / ${message.author.id} just got cooldown when using the ${process.env.PREFIX}volume command`);
//     }
//     const queue = client.distube.getQueue(message);
//     if (!queue) {
//       return message.channel.send({
//         embeds: [
//           new Discord.EmbedBuilder()
//             .setColor('#edcced')
//             .setDescription('The queue is empty!')
//         ]
//       }) && console.log(`${message.author.tag} / ${message.author.id} just the ${process.env.PREFIX}volume command, but the queue is empty`);
//     }
//     const volume = parseInt(args[0]);
//     if (isNaN(volume)) {
//       return message.channel.send({
//         embeds: [
//           new Discord.EmbedBuilder()
//             .setColor('#edcced')
//             .setDescription('Please enter a valid number!')
//         ]
//       }) && console.log(`${message.author.tag} / ${message.author.id} didn't put the valid number when setting the bot volume`);
//     }
//     queue.setVolume(volume);
//     message.channel.send({
//       embeds: [
//         new Discord.EmbedBuilder()
//           .setColor('#edcced')
//           .setDescription(`Volume has been set to \`${volume}\``)
//       ]
//     }) && console.log(`${message.author.tag} / ${message.author.id} just set the bot volume`);
//     cooldown.add(message.author.id);
//     setTimeout(() => {
//       cooldown.delete(message.author.id);
//     }, 5000);
//   }
// };
