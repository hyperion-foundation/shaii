/**
 * Command Description:
 * This is "resume" for legacy command. Once this command is issued, the bot will immediately resume the queue.
 *
 * Cooldown Description:
 * This command includes the "cooldown" system.
 * Cooldown is a function to avoid floods/spams.
 * Every command issuer (user) have "5 seconds" cooldown.
 *
 * Example usage:
 * !resume
 * !unpause
 */

const { EmbedBuilder } = require('discord.js');
const cooldown = new Set();

module.exports = {
  name: 'resume',
  aliases: ['unpause'],
  inVoiceChannel: true,
  run: async (client, message) => {
    if (cooldown.has(message.author.id)) {
      message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#ec9bb')
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
              .setDescription('There is no song to be resumed because the current queue is empty!')
              .addFields(
                { name: 'Example Command Usage', value: `${process.env.PREFIX}resume` }
              )
              .setTimestamp()
              .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
          ]
        });
      }
      if (queue.paused) {
        queue.resume();
        message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('#ec9bbb')
              .addFields(
                { name: `${client.emotes.play} | Resume`, value: 'The queue is resumed.' }
              )
              .setTimestamp()
              .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
          ]
        });
      } else {
        message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('#ec9bbb')
              .addFields(
                { name: `${client.emotes.error} | Error`, value: 'The queue isn\'t paused!' }
              )
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
