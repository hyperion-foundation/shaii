/*
    There is something I need to add to this command.
    If someone know how to create a perfect 'latency' or 'ping' command, please tell me.
    And I want to add a function to this command if the bot actually can show us about bot ping voice channel connection.

    - SleepNov4 (Alexander Andhika S)
*/
const Discord = require('discord.js')

module.exports = {
  name: 'latency',
  aliases: ['ping'],
  run: async (client, message) => {
    message.reply({
      embeds: [
        new Discord.EmbedBuilder()
          .setColor('#ec9bbb')
          .setTitle(`${client.emotes.info} | Latency`)
          .addFields(
            { name: 'Websocket Latency', value: `${Math.round(client.ws.ping)} ms` },
            { name: 'API Latency', value: `${Date.now() - message.createdTimestamp} ms` }
          )
          .setTimestamp()
          .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
      ]
    })
  }
}
