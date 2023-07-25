const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Show the current played song and requested by whom'),
  async execute(interaction) {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#edcced')
          .setDescription(`This command is currently unavailable. Use the \`${process.env.PREFIX}nowplaying\` command instead.`)
      ]
    }) && console.log(`[LOG (Info)]: "${interaction.user.username}" (User ID: ${interaction.user.id}) just used the "/nowplaying" command on "${interaction.channel.name}" (Channel ID: ${interaction.channel.id}).`);
  }
};

// const Discord = require('discord.js');
// const cooldown = new Set();

// module.exports = {
//   name: 'nowplaying',
//   aliases: ['np'],
//   run: async (client, message, args) => {
//     if (cooldown.has(message.author.id)) {
//       return message.channel.send({
//         embeds: [
//           new Discord.EmbedBuilder()
//             .setColor('#edcced')
//             .setDescription('Cooldown! Wait for `5 seconds` before use this command again')
//         ]
//       }) && console.log(`${message.author.tag} / ${message.author.id} just got cooldown when using ${process.env.PREFIX}nowplaying command`);
//     } else {
//       const queue = client.distube.getQueue(message);
//       if (!queue) {
//         return message.channel.send({
//           embeds: [
//             new Discord.EmbedBuilder()
//               .setColor('#edcced')
//               .setDescription('The queue is empty!')
//           ]
//         }) && console.log(`${message.author.tag} / ${message.author.id} just used the ${process.env.PREFIX}nowplaying command, but the queue is empty`);
//       }
//       const song = queue.songs[0];
//       message.channel.send({
//         embeds: [
//           new Discord.EmbedBuilder()
//             .setColor('#edcced')
//             .setDescription(`${client.emotes.note} **${song.name}** [${song.formattedDuration}] • Requested by ${song.user}`)
//         ]
//       }) && console.log(`${message.author.tag} / ${message.author.id} just used the ${process.env.PREFIX}nowplaying command`);
//       cooldown.add(message.author.id);
//       setTimeout(() => {
//         cooldown.delete(message.author.id);
//       }, 5000);
//     }
//   }
// };
