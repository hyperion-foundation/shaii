/**
 * Command Description:
 * This is "stop" for legacy command.
 * Once this command is issued, the bot will immediately stop the current playing track and clear the queue.
 *
 * Cooldown Description:
 * This command includes the "cooldown" system.
 * Cooldown is a function to avoid floods/spams.
 * Every command issuer (user) have "5 seconds" cooldown.
 *
 * Example usage:
 * !stop
 */
const { EmbedBuilder } = require('discord.js');
const cooldown = new Set();

module.exports = {
  name: 'stop',
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
              .setDescription('There is nothing to be stopped, because the current queue is empty!')
              .addFields(
                { name: 'Example Command Usage', value: `${process.env.PREFIX}stop` }
              )
              .setTimestamp()
              .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
          ]
        });
      }
      queue.stop();
      message.channel.send(`${client.emotes.success} | Stopped!`);
      message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#ec9bbb')
            .setDescription(`${client.emotes.stop} Stopped!`)
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
