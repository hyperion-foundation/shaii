require('dotenv').config()
const { DisTube } = require('distube')
const Discord = require('discord.js')
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.MessageContent
  ]
})
const fs = require('fs')
const config = require('./config.json')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

client.config = require('./config.json')
client.distube = new DisTube(client, {
  leaveOnEmpty: true,
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
})
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.emotes = config.emoji

fs.readdir('./commands/', (err, files) => {
  if (err) return console.log('Could not find any commands!')
  const jsFiles = files.filter(f => f.split('.').pop() === 'js')
  if (jsFiles.length <= 0) return console.log('Could not find any commands!')
  jsFiles.forEach(file => {
    const cmd = require(`./commands/${file}`)
    console.log(`Loaded ${file}`)
    client.commands.set(cmd.name, cmd)
    if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
  })
})

client.on('ready', () => {
  console.log(`${client.user.tag} is ready!`)
  client.user.setPresence({
    status: 'streaming',
    activities: [
      { name: `on ${client.guilds.cache.size} servers | ${process.env.PREFIX}commands`, type: '1', url: '<any Twitch channel link>' } // You can put any Twitch link you like
    ]
  })
})

client.on('messageCreate', async message => {
  if (message.author.bot || !message.guild) return
  const prefix = process.env.PREFIX
  if (!message.content.startsWith(prefix)) return
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
  if (!cmd) return
  if (cmd.inVoiceChannel && !message.member.voice.channel) {
    return message.reply({
      embeds: [
        new Discord.EmbedBuilder()
          .setColor('#ec9bbb')
          .setTitle(`${client.emotes.error} | Error`)
          .setDescription('You must be in a voice channel first!')
          .setTimestamp()
          .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
      ]
    })
  }
  try {
    cmd.run(client, message, args)
  } catch (e) {
    console.error(e)
    message.reply({
      embeds: [
        new Discord.EmbedBuilder()
          .setColor('#ec9bbb')
          .setTitle(`${client.emotes.error} | Error`)
          .setDescription(`\`${e}\``)
          .setTimestamp()
          .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
      ]
    })
  }
})

client.distube
  .on('playSong', (queue, song) =>
    queue.textChannel.send({
      embeds: [
        new Discord.EmbedBuilder()
          .setColor('#ec9bbb')
          .setTitle(`${client.emotes.play} | Playing`)
          .addFields(
            { name: `Title: __${song.name}__\nLength: \`${song.formattedDuration}\``, value: `Requested by ${song.user}` }
          )
          .setTimestamp()
          .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
      ]
    })
  )
  .on('addSong', (queue, song) =>
    queue.textChannel.reply({
      embeds: [
        new Discord.EmbedBuilder()
          .setColor('#ec9bbb')
          .setTitle(`${client.emotes.new} | New Song Added`)
          .addFields(
            { name: `__${song.name}__ - \`${song.formattedDuration}\``, value: `Requested by ${song.user}` }
          )
          .setTimestamp()
          .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
      ]
    })
  )
  .on('error', (channel, e) => {
    if (channel) {
      channel.send({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor('#ec9bbb')
            .setTitle(`${client.emotes.error} | Error`)
            .setDescription(`An error occurred: ${e.toString().slice(0, 1974)}`)
            .setTimestamp()
            .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
        ]
      })
    } else console.error(e)
  })
  .on('empty', channel => channel.send('The channel was empty, so I disconnected from that channel.')) // When the bot don't have any current listeners, the bot will disconnect from the current channel automatically, but didn't send this respond.
  .on('searchNoResult', (message, query) =>
    message.reply({
      embeds: [
        new Discord.EmbedBuilder()
          .setColor('#ec9bbb')
          .setTitle(`${client.emotes.error} | Error`)
          .setDescription(`Sorry, but I can't find anything related to __${query}__`)
          .setTimestamp()
          .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
      ]
    })
  )
  .on('finish', queue => queue.textChannel.send({
    embeds: [
      new Discord.EmbedBuilder()
        .setColor('#ec9bbb')
        .setTitle(`${client.emotes.successgreen} | Finished`)
        .setDescription(`All requested songs have been played.\n\nIf you want to request more song, just type \`${process.env.PREFIX}play <song title>\` or \`${process.env.PREFIX}play <youtube url>\` (without brackets).`)
        .setTimestamp()
        .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
    ]
  }))

client.login(process.env.TOKEN)
