/**
 * Command Description:
 * This is "nowplaying" for legacy command. Once this command is issued, the bot will reply your message.
 * The message contains the current playing music/song.
 *
 * Cooldown Description:
 * This command includes with "cooldown" system.
 * Cooldown is a function to avoid floods/spams.
 * Every command issuer (user) have 5 seconds cooldown.
 *
 * Example usage:
 * !nowplaying
 * !np
 */

const { EmbedBuilder } = require('discord.js');
const cooldown = new Set();

module.exports = {
  name: 'nowplaying',
  aliases: ['np'],
  inVoiceChannel: true,
  run: async (client, message) => {
    if (cooldown.has(message.author.id)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor('#ec9bbb')
            .setDescription('You\'re on cooldown! Please wait for `5 seconds` before using it again.')
            .setTimestamp()
            .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
        ]
      });
    } else {
      const queue = client.distube.getQueue(message);
      if (!queue) {
        return message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('#ec9bbb')
              .setTitle(`${client.emotes.error} | Error`)
              .setDescription('There is no song or music in the current queue!')
              .setTimestamp()
              .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
          ]
        });
      }
      const song = queue.songs[0];
      message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#ec9bbb')
            .setTitle(`${client.emotes.note} | Now Playing`)
            .addFields(
              { name: `Title: __${song.name}__\nLength: \`${song.formattedDuration}\``, value: `Requested by ${song.user}` }
            )
            .setTimestamp()
            .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
        ]
      });
      cooldown.add(message.author.id);
      setTimeout(() => {
        cooldown.delete(message.author.id);
      }, 5000);
    }
  }
};
