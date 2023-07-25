const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Request a song/music from YouTube/Spotify'),
  async execute(interaction) {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#edcced')
          .setDescription(`This command is currently unavailable. Use the \`${process.env.PREFIX}play\` command instead.`)
      ]
    }) && console.log(`[LOG (Info)]: "${interaction.user.username}" (User ID: ${interaction.user.id}) just used the "/play" command on "${interaction.channel.name}" (Channel ID: ${interaction.channel.id}).`);
  }
};

// /*
//  * This is "play" command that makes the bot will play a song from user.
//  * Example usage:
//  * s!play (Standard/Legacy Command)
//  * s!req (Standard/Legacy Command - Aliases)
//  * /play (Slash Command)
// */

// const Discord = require('discord.js');

// module.exports = {
//   // name: 'play',
//   // aliases: ['req'],
//   // description: 'Play a song from YouTube/Spotify',
//   // options: [
//   //   {
//   //     name: 'title',
//   //     description: 'Input any YouTube video title.',
//   //     type: Discord.ApplicationCommandOptionType.String
//   //   },
//   //   {
//   //     name: 'url',
//   //     description: 'Input any YouTube/Spotify link.',
//   //     type: Discord.ApplicationCommandOptionType.String
//   //   }
//   // ],
//   run: async (client, message, args) => {
//     const voiceChannel = message.member.voice.channel;
//     if (!voiceChannel) {
//       return message.channel.send({
//         embeds: [
//           new Discord.EmbedBuilder()
//             .setColor('#edcced')
//             .setDescription('You need to join a voice channel at first')
//         ]
//       });
//     } else {
//       const string = args.join(' ');
//       if (!string) {
//         return message.channel.send({
//           embeds: [
//             new Discord.EmbedBuilder()
//               .setColor('#edcced')
//               .setDescription('Please enter a valid query or put the YouTube/Spotify playlist link.')
//           ]
//         });
//       }
//       client.distube.play(message.member.voice.channel, string, {
//         member: message.member,
//         textChannel: message.channel,
//         message
//       });
//     }
//   }
// };

// // module.exports = {
// //   name: 'play',
// //   aliases: ['req'],
// //   run: async (client, message, args) => {
// //     const string = args.join(' ');
// //     if (!string) {
// //       return message.reply({
// //         embeds: [
// //           new Discord.EmbedBuilder()
// //             .setColor('#ec9bbb')
// //             .setDescription('Currently, Shaii can not play nor receiving song requests at the moment. There is an issue with Shaii, and if you want to know what happens with Shaii, please visit our Statuspage\nLink: https://hyperionfoundation.statuspage.io/incidents/b55b8vvlr8w8')
// //         ]
// //       }) && console.log(`${message.author.tag} / ${message.author.id} just used the ${process.env.PREFIX}play command, but it seems doesn't work`);
// //     } else {
// //       message.reply({
// //         embeds: [
// //           new Discord.EmbedBuilder()
// //             .setColor('#ec9bbb')
// //             .setDescription('Currently, Shaii can not play nor receiving song requests at the moment. There is an issue with Shaii, and if you want to know what happens with Shaii, please visit our Statuspage\nLink: https://hyperionfoundation.statuspage.io/incidents/b55b8vvlr8w8')
// //         ]
// //       }) && console.log(`${message.author.tag} / ${message.author.id} just used the ${process.env.PREFIX}play command, but it seems doesn't work`);
// //     }
// //   }
// // };