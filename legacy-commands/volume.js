/**
 * Command Description:
 * This is a "volume" for legacy command. Once this command is issued, you can adjust the bot volume to high or low.
 *
 * Cooldown Description:
 * This command includes the "cooldown" system.
 * Cooldown is a function to avoid floods/spams.
 * Every command issuer (user) have "5 seconds" cooldown.
 *
 * Additional Note:
 * You can set the default volume through the Distube library.
 * File Location: /node_modules/distube/index.js
 * Code line: 1727 or just find "this.volume = 50;"
 *
 * Example usage:
 * !volume 15
*/

const { EmbedBuilder } = require('discord.js');
const cooldown = new Set();

module.exports = {
  name: 'volume',
  aliases: ['vol'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply({
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
              .setDescription('You can\'t set my volume when the current queue is empty or you must join a voice channel first!')
              .setTimestamp()
              .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
          ]
        });
      }
      const volume = parseInt(args[0]);
      if (isNaN(volume)) {
        return message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('#ec9bbb')
              .setTitle(`${client.emotes.error} | Error`)
              .setDescription('Please input valid number!')
              .addFields(
                { name: 'Example Command Usage', value: `\`${process.env.PREFIX}vol 10\` or \`${process.env.PREFIX}vol 20\`` }
              )
              .setTimestamp()
              .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
          ]
        });
      }
      queue.setVolume(volume);
      message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#ec9bbb')
            .setTitle(`${client.emotes.successgreen} | Volume`)
            .setDescription(`My volume has been set to \`${volume}\`%.`)
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
