const Discord = require('discord.js')

module.exports = {
  name: 'stop',
  aliases: ['disconnect', 'leave'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) {
      return message.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor('#ec9bbb')
            .setTitle(`${client.emotes.error} | Error`)
            .setDescription('There is nothing to be stopped, because the current queue is empty!')
            .addFields(
              { name: 'Example Command Usage', value: `${process.env.PREFIX}stop` }
            )
            .setTimestamp()
            .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
        ]
      })
    }
    queue.stop()
    message.channel.send(`${client.emotes.success} | Stopped!`)
    message.reply({
      embeds: [
        new Discord.EmbedBuilder()
          .setColor('#ec9bbb')
          .setDescription(`${client.emotes.stop} Stopped!`)
          .setTimestamp()
          .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
      ]
    })
  }
}
