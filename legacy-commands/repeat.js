/**
 * Command Description:
 * This is "repeat" for legacy command. Once this command is issued, the bot will immediately change the loop mode.
 *
 * Cooldown Description:
 * This command includes the "cooldown" system.
 * Cooldown is a function to avoid floods/spams.
 * Every command issue (user) have "5 seconds" cooldown.
 *
 * Example usage:
 * !repeat queue (for looping the queue)
 * !repeat song (for looping the current playing track)
 * !repeat off (for turning off the loop)
 */

const { EmbedBuilder } = require('discord.js');
const cooldown = new Set();

module.exports = {
  name: 'repeat',
  aliases: ['loop', 'rp'],
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
              .setDescription('There is no song in the current queue!')
              .setTimestamp()
              .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
          ]
        });
      }
      let mode;
      switch (args[0]) {
      case 'off':
        mode = 0;
        break;
      case 'song':
        mode = 1;
        break;
      case 'queue':
        mode = 2;
        break;
      }
      mode = queue.setRepeatMode(mode);
      mode = mode ? (mode === 2 ? 'Queue' : 'Current Song') : 'Off';
      message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#ec9bbb')
            .setDescription(`Repeat Mode has been set to \`${mode}\`.`)
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
