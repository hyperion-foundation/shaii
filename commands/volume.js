/*
  You can set the default volume through the Distube library.
  File Location: /node_modules/distube/index.js
  Code line: 1727 (this.volume = 50;)
*/

const Discord = require('discord.js')

module.exports = {
  name: 'volume',
  aliases: ['vol'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    // if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    if (!queue) {
      return message.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor('#ec9bbb')
            .setTitle(`${client.emotes.error} | Error`)
            .setDescription('You can\'t set my volume when the current queue is empty or you must join a voice channel first!')
            .setTimestamp()
            .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
        ]
      })
    }
    const volume = parseInt(args[0])
    if (isNaN(volume)) {
      return message.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor('#ec9bbb')
            .setTitle(`${client.emotes.error} | Error`)
            .setDescription('Please input valid number!')
            .addFields(
              { name: 'Example Command Usage', value: `\`${process.env.PREFIX}vol 10\` or \`${process.env.PREFIX}vol 20\`` }
            )
            .setTimestamp()
            .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
        ]
      })
    }
    queue.setVolume(volume)
    message.reply({
      embeds: [
        new Discord.EmbedBuilder()
          .setColor('#ec9bbb')
          .setTitle(`${client.emotes.successgreen} | Volume`)
          .setDescription(`My volume has been set to \`${volume}\`%.`)
          .setTimestamp()
          .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
      ]
    })
  }
}
