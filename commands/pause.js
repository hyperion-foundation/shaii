const Discord = require('discord.js')

module.exports = {
  name: 'pause',
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) {
      return message.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor('#ec9bbb')
            .setTitle(`${client.emotes.error} | Error`)
            .setDescription('There is no song or music to be paused, because the current queue is empty!')
            .addFields(
              { name: 'Example Command Usage', value: `\`${process.env.PREFIX}pause\`` }
            )
            .setTimestamp()
            .setFooter({ text: `${client.user.tag}`, value: '<put your bot avatar link>' })
        ]
      })
    }
    if (queue.paused) {
      queue.resume()
      return message.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor('#ec9bbb')
            .setDescription(`${client.emotes.play} Resumed!`)
            .setTimestamp()
            .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
        ]
      })
    }
    queue.pause()
    message.reply({
      embeds: [
        new Discord.EmbedBuilder()
          .setColor('#ec9bbb')
          .setDescription(`${client.emotes.pause} Paused!`)
          .setTimestamp()
          .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
      ]
    })
  }
}
