const Discord = require('discord.js')

module.exports = {
  name: 'skip',
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) {
      return message.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor('#ec9bbb')
            .setTitle(`${client.emotes.error} | Error`)
            .setDescription('There is nothing to be skipped, because the current song is empty!')
            .setTimestamp()
            .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
        ]
      })
    }
    try {
      const song = await queue.skip()
      message.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor('#ec9bbb')
            .setTitle(`${client.emotes.successgreen} | Skip`)
            .setDescription(`Song skipped!\n${client.emotes.note} Now playing: __${song.name}__`)
            .setTimestamp()
            .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
        ]
      })
    } catch (e) {
      message.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor('#ec9bbb')
            .setTitle(`${client.emotes.error} | Error`)
            .setDescription(`${e}`)
            .setTimestamp()
            .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
        ]
      })
    }
  }
}
