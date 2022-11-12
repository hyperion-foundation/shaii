const Discord = require('discord.js')

module.exports = {
  name: 'commands',
  aliases: ['help'],
  run: async (client, message) => {
    message.channel.send({
      embeds: [
        new Discord.EmbedBuilder()
          .setColor('#ec9bbb')
          .setTitle(`${client.user.username} Available Commands`)
          .setDescription(client.commands.map(cmd => `\`${cmd.name}\``).join(', '))
          .setTimestamp()
          .setFooter({ text: `${client.user.tag}`, iconURL: 'https://cdn.discordapp.com/avatars/703520871838515230/3b0b651531858fe205aa0c00e50035b2.png?size=4096' })
      ]
    })
  }
}
