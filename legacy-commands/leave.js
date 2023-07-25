/**
 * Command Description:
 * This is "leave" for legacy command. Once this command is issued, the bot will immediately leave from the current connected channel.
 * The command issuer (user) need to connect to a voice channel that has the bot in it.
 *
 * Cooldown Description:
 * This command doesn't have the "cooldown" function.
 *
 * Example usage:
 * !leave
 * !dc
 */

const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'leave',
  aliases: ['dc'],
  run: async (client, message) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#ec9bbb')
            .setDescription('You can\'t disconnect me if you are not in voice channel with me.')
            .setTimestamp()
            .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
        ]
      });
    }
    client.distube.voices.leave(message);
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#ec9bbb')
          .setDescription(`Successfully disconnected from \`${message.member.channel.name}\`.`)
          .setTimestamp()
          .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
      ]
    });
  }
};
