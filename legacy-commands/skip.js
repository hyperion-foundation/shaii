/**
 * Command Description:
 * This is "skip" for legacy command. Once the command is issued, the bot will immediately skip the current playing track
 *
 * Cooldown Description:
 * This command includes the "cooldown" system.
 * Cooldown is a function to avoid floods/spams.
 * Every command issuer (user) have "5 seconds" cooldown.
 *
 * Example usage:
 * !skip
 */

const { EmbedBuilder } = require('discord.js');
const cooldown = new Set();

module.exports = {
  name: 'skip',
  inVoiceChannel: true,
  run: async (client, message) => {
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
              .setDescription('There is nothing to be skipped, because the current queue is empty!')
              .addFields(
                { name: 'Example Command Usage', value: `${process.env.PREFIX}skip` }
              )
              .setTimestamp()
              .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
          ]
        });
      } try {
        const song = await queue.skip();
        message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('#ec9bbb')
              .setTitle(`${client.emotes.successgreen} | Skip`)
              .setDescription(`Song skipped!\n${client.emotes.note} Now playing: __${song.name}__`)
              .setTimestamp()
              .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
          ]
        });
      } catch (e) {
        message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('#ec9bbb')
              .setTitle(`${client.emotes.error} | Error`)
              .setDescription(`${e}`)
              .setTimestamp()
              .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
          ]
        });
      }
      cooldown.add(message.author.id);
      setTimeout(() => {
        cooldown.delete(message.author.id);
      }, 5000);
    }
  }
};
