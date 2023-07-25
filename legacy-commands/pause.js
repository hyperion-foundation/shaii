/**
 * Command Description:
 * This is "pause" for legacy command. Once this command is issued, the bot will immediately pause the current playing track.
 *
 * Cooldown Description:
 * This command includes with "cooldown" system.
 * Cooldown is a function to avoid floods/spams.
 * Every command issuer (user) have 5 seconds cooldown.
 *
 * Example usage:
 * !pause
 */

const { EmbedBuilder } = require('discord.js');
const cooldown = new Set();

module.exports = {
  name: 'pause',
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
              .setDescription('There is no song or music to be paused, because the current queue is empty!')
              .addFields(
                { name: 'Example Command Usage', value: `\`${process.env.PREFIX}pause\`` }
              )
              .setTimestamp()
              .setFooter({ text: `${client.user.tag}`, value: '<put your bot avatar link>' })
          ]
        });
      }
      if (queue.paused) {
        queue.resume();
        return message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('#ec9bbb')
              .setDescription(`${client.emotes.play} Resumed!`)
              .setTimestamp()
              .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
          ]
        });
      }
      queue.pause();
      message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#ec9bbb')
            .setDescription(`${client.emotes.pause} Paused!`)
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
