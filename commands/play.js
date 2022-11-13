const Discord = require('discord.js')

module.exports = {
  name: 'play',
  aliases: ['req'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(' ')
    if (!string) {
      return message.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor('#ec9bbb')
            .setTitle(`${client.emotes.error} | Error`)
            .setDescription('Please enter a song url or song query to search.')
            .addFields(
              { name: 'Example Command Usage', value: `\`${process.env.PREFIX}play <youtube url>\` or \`${process.env.PREFIX}play <song query>\` (without brackets).` }
            )
            .setTimestamp()
            .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
        ]
      })
    }
    client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message
    })
  }
}
