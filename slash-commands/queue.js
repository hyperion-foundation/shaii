const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('List of requested song by users'),
  async execute(interaction) {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#edcced')
          .setDescription(`This command is currently unavailable. Use the \`${process.env.PREFIX}queue\` command instead.`)
      ]
    }) && console.log(`[LOG (Info)]: "${interaction.user.username}" (User ID: ${interaction.user.id}) just used the "/queue" command on "${interaction.channel.name}" (Channel ID: ${interaction.channel.id}).`);
  }
};

// const Discord = require('discord.js');
// const cooldown = new Set();

// module.exports = {
//   name: 'queue',
//   run: async (client, message) => {
//     if (cooldown.has(message.author.id)) {
//       return message.channel.send({
//         embeds: [
//           new Discord.EmbedBuilder()
//             .setColor('#edcced')
//             .setDescription('Cooldown! Wait for `5 seconds` before use this command again')
//         ]
//       }) && console.log(`${message.author.tag} / ${message.author.id} just got cooldown while using the ${process.env.PREFIX}queue command`);
//     } else {
//       const queue = client.distube.getQueue(message);
//       if (!queue) {
//         return message.channel.send({
//           embeds: [
//             new Discord.EmbedBuilder()
//               .setColor('#edcced')
//               .setDescription('The queue is empty!')
//           ]
//         }) && console.log(`${message.author.tag} / ${message.author.id} just used the ${process.env.PREFIX}queue command, but the queue is empty`);
//       }
//       const q = queue.songs
//         .map((song, i) => `${i === 0 ? 'Now Playing:' : `${i}.`} **${song.name}** [${song.formattedDuration}]`)
//         .join('\n');
//       message.channel.send({
//         embeds: [
//           new Discord.EmbedBuilder()
//             .setColor('#edcced')
//             .setDescription(`${q}`)
//         ]
//       }) && console.log(`${message.author.tag} / ${message.author.id} just used the ${process.env.PREFIX}queue command`);
//       cooldown.add(message.author.id);
//       setTimeout(() => {
//         cooldown.delete(message.author.id);
//       }, 5000);
//     }
//   }
// };
