/**
 * Command Description:
 * This is "join" for legacy command.
 * Once this command is issued, the bot will immediately join your channel.
 *
 * Cooldown Description:
 * This command doesn't has the "cooldown" function.
 *
 * Example usage:
 * !join
 */

const { Constants, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'join',
  aliases: ['move'],
  run: async (client, message, args) => {
    let voiceChannel = message.member.voice.channel;
    if (args[0]) {
      voiceChannel = await client.channels.fetch(args[0]);
      if (!Constants.VoiceBasedChannelTypes.includes(voiceChannel?.type)) {
        return message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('#ec9bbb')
              .setTitle(`${client.emotes.error} | Error`)
              .setDescription(`${args[0]} is not a valid voice channel!`)
              .setTimestamp()
              .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
          ]
        });
      }
    }
    if (!voiceChannel) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#ec9bbb')
            .setTitle(`${client.emotes.error} | Error`)
            .setDescription('You must be in a voice channel first!')
            .setTimestamp()
            .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
        ]
      });
    }
    client.distube.voices.join(voiceChannel) && message.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#ec9bbb')
          .setDescription(`Successfully connected to \`${message.member.voice.channel.name}\`.`)
          .setTimestamp()
          .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
      ]
    });
  }
};
