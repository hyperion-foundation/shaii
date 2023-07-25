const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('repeat')
    .setDescription('Repeat the current played song or the whole song in the queue'),
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
//   name: 'repeat',
//   aliases: ['loop'],
//   inVoiceChannel: true,
//   run: async (client, message, args) => {
//     if (cooldown.has(message.author.id)) {
//       return message.channel.send({
//         embeds: [
//           new Discord.EmbedBuilder()
//             .setColor('#edcced')
//             .setDescription('Cooldown! Wait for `5 seconds` before use this command again')
//         ]
//       }) && console.log(`${message.author.tag} / ${message.author.id} just got cooldown while using the ${process.env.PREFIX}repeat command`);
//     } else {
//       const queue = client.distube.getQueue(message);
//       if (!queue) {
//         return message.channel.send({
//           embeds: [
//             new Discord.EmbedBuilder()
//               .setColor('#edcced')
//               .setDescription('The queue is empty!')
//           ]
//         }) && console.log(`${message.author.tag} / ${message.author.id} just used the ${process.env.PREFIX}repeat command, but the queue is empty`);
//       }
//       let mode;
//       switch (args[0]) {
//       case 'off':
//         mode = 0;
//         break;
//       case 'song':
//         mode = 1;
//         break;
//       case 'queue':
//         mode = 2;
//         break;
//       }
//       mode = queue.setRepeatMode(mode);
//       mode = mode ? (mode === 2 ? 'Queue' : 'Song') : 'Off';
//       message.channel.send({
//         embeds: [
//           new Discord.EmbedBuilder()
//             .setColor('#edcced')
//             .setDescription(`Repeat mode has been changed to \`${mode}\``)
//         ]
//       }) && console.log(`${message.author.tag} / ${message.author.id} just changed the repeat mode to ${mode} mode`);
//       cooldown.add(message.author.id);
//       setTimeout(() => {
//         cooldown.delete(message.author.id);
//       }, 5000);
//     }
//   }
// };
