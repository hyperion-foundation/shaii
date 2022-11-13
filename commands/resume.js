const Discord = require('discord.js')

module.exports = {
  name: 'resume',
  aliases: ['resume', 'unpause'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) {
      return message.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor('#ec9bbb')
            .setTitle(`${client.emotes.error} | Error`)
            .setDescription('There is no song to be resumed because the current queue is empty!')
            .addFields(
              { name: 'Example Command Usage', value: `${process.env.PREFIX}resume` }
            )
            .setTimestamp()
            .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
        ]
      })
    }
    if (queue.paused) {
      queue.resume()
      message.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor('#ec9bbb')
            .addFields(
              { name: `${client.emotes.play} | Resume`, value: 'The queue is resumed.' }
            )
            .setTimestamp()
            .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
        ]
      })
    } else {
      message.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor('#ec9bbb')
            .addFields(
              { name: `${client.emotes.error} | Error`, value: 'The queue isn\'t paused!' }
            )
            .setTimestamp()
            .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
        ]
      })
    }
  }
}
