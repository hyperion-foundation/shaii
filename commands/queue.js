const Discord = require('discord.js')

module.exports = {
  name: 'queue',
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) {
      return message.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor('#ec9bbb')
            .addFields(
              { name: `${client.emotes.info} | Queue`, value: 'There is no songs in the queue list.' }
            )
            .setTimestamp()
            .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
        ]
      })
    }
    const q = queue.songs
      .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
      .join('\n')
    message.reply({
      embeds: [
        new Discord.EmbedBuilder()
          .setColor('#ec9bbb')
          .setTitle(`${client.emotes.queue} | Song Queue List`)
          .addFields(
            { name: `${q}`, value: '\n`- End of the queue -`' }
          )
          .setTimestamp()
          .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
      ]
    })
  }
}
