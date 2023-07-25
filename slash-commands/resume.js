const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resume the current paused queue'),
  async execute(interaction) {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#edcced')
          .setDescription(`This command currently unavailable. Use the \`${process.env.PREFIX}resume\` command instead.`)
      ]
    }) && console.log(`[LOG (Info)]: "${interaction.user.username}" (User ID: ${interaction.user.id}) just used the "/resume" command on "${interaction.channel.name}" (Channel ID: ${interaction.channel.id}).`);
  }
};

// const Discord = require('discord.js');
// const cooldown = new Set();

// module.exports = {
//   name: 'resume',
//   run: async (client, message) => {
//     const voiceChannel = message.member.voice.channel;
//     if (!voiceChannel) {
//       return message.channel.send({
//         embeds: [
//           new Discord.EmbedBuilder()
//             .setColor('#edcced')
//             .setDescription('Your action is prohibited!')
//         ]
//       }) && console.log(`${message.author.tag} / ${message.author.id} just used the ${process.env.PREFIX}resume command, but unsuccessful`);
//     } else {
//       if (cooldown.has(message.author.id)) {
//         return message.channel.send({
//           embeds: [
//             new Discord.EmbedBuilder()
//               .setColor('#edcced')
//               .setDescription('Cooldown! Wait for `5 seconds` before using this command again')
//           ]
//         }) && console.log(`${message.author.tag} / ${message.author.id} just got cooldown while using the ${process.env.PREFIX}resume command`);
//       }
//       const queue = client.distube.getQueue(message);
//       if (!queue) {
//         return message.channel.send({
//           embeds: [
//             new Discord.EmbedBuilder()
//               .setColor('#edcced')
//               .setDescription('The queue is empty!')
//           ]
//         }) && console.log(`${message.author.tag} / ${message.author.id} just used the ${process.env.PREFIX}resume, but the queue is empty`);
//       }
//       if (queue.paused) {
//         queue.resume();
//         message.channel.send({
//           embeds: [
//             new Discord.EmbedBuilder()
//               .setColor('#edcced')
//               .setDescription('Resumed!')
//           ]
//         }) && console.log(`${message.author.tag} / ${message.author.id} just used the ${process.env.PREFIX}resume command`);
//       } else {
//         message.channel.send({
//           embeds: [
//             new Discord.EmbedBuilder()
//               .setColor('#edcced')
//               .setDescription('The queue is not paused!')
//           ]
//         }) && console.log(`${message.author.tag} / ${message.author.id} just used the ${process.env.PREFIX}resume command, but the queue is not paused`);
//       }
//       cooldown.add(message.author.id);
//       setTimeout(() => {
//         cooldown.delete(message.author.id);
//       }, 5000);
//     }
//   }
// };
