const { Constants, EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'join',
  aliases: ['move'],
  run: async (client, message, args) => {
    let voiceChannel = message.member.voice.channel
    if (args[0]) {
      voiceChannel = await client.channels.fetch(args[0])
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
        })
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
            .setFooter({ text: `${client.user.tag}`, iconURL: 'https://cdn.discordapp.com/avatars/703520871838515230/3b0b651531858fe205aa0c00e50035b2.png?size=4096' })
        ]
      })
    }
    client.distube.voices.join(voiceChannel)
  }
}
