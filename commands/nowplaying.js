const Discord = require('discord.js')

module.exports = {
  name: 'nowplaying',
  aliases: ['np'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) {
      return message.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor('#ec9bbb')
            .setTitle(`${client.emotes.error} | Error`)
            .setDescription('There is no song or music in the current queue!')
            .addFields(
              { name: 'Example Command Usage', value: `\`${process.env.PREFIX}nowplaying\` or \`${process.env.PREFIX}np\`` }
            )
            .setTimestamp()
            .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
        ]
      })
    }
    const song = queue.songs[0]
    message.reply({
      embeds: [
        new Discord.EmbedBuilder()
          .setColor('#ec9bbb')
          .setTitle(`${client.emotes.note} | Now Playing`)
          .addFields(
            { name: `Title: __${song.name}__\nLength: \`${song.formattedDuration}\``, value: `Requested by ${song.user}` }
          )
          .setTimestamp()
          .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
      ]
    })
  }
}
