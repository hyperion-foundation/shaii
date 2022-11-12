const Discord = require('discord.js')

module.exports = {
  name: 'uptime',
  run: async (client, message) => {
    let totalSeconds = (client.uptime / 1000)
    const days = Math.floor(totalSeconds / 86400)
    totalSeconds %= 86400
    const hours = Math.floor(totalSeconds / 3600)
    totalSeconds %= 3600
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = Math.floor(totalSeconds % 60)
    message.reply({
      embeds: [
        new Discord.EmbedBuilder()
          .setColor('#ec9bbb')
          .setTitle(`${client.user.username} Uptime`)
          .setDescription(`**${days}** days, **${hours}** hours, **${minutes}** minutes and **${seconds}** seconds / **${client.uptime}** ms`)
          .setTimestamp()
          .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
      ]
    })
  }
}
