require('dotenv').config();
const { DisTube } = require('distube');
const { Client, Collection, EmbedBuilder, Events, GatewayIntentBits } = require('discord.js');
const { readdir, readdirSync } = require('node:fs');
const { join } = require('node:path');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ]
});
const pkg = require('./package.json');
const config = require('./config.json');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');

client.config = require('./config.json');

/**
 * You can remove the "plugins" option if you don't want to use the Spotify feature.
 * Don't forget comment the line "16" if you don't want to use the Spotify feature.
*/
client.distube = new DisTube(client, {
  leaveOnEmpty: true,
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      parallel: true,
      emitEventsAfterFetching: false,
      api: {
        clientId: '', // Fill the blank with your Spotify ClientID (Optional)
        clientSecret: '' // Fill the blank with your Spotify Client Secret (Optional)
      }
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
});

// Start Legacy Commands
client.legacyCommands = new Collection();
client.legacyAliases = new Collection();
// End Legacy Commands

// Start Slash Commands
client.slashCommands = new Collection();
client.slashAliases = new Collection();
// End Slash Commands

client.emotes = config.emoji;

// Start Legacy Commands
readdir('./legacy-commands/', (err, files) => {
  if (err) return console.log('Could not find any commands!');
  const jsFiles = files.filter(f => f.split('.').pop() === 'js');
  if (jsFiles.length <= 0) return console.log('Could not find any commands!');
  jsFiles.forEach(file => {
    const cmd = require(`./legacy-commands/${file}`);
    console.log(`Loaded ${file}`);
    client.legacyCommands.set(cmd.name, cmd);
    if (cmd.aliases) cmd.aliases.forEach(alias => client.legacyAliases.set(alias, cmd.name));
  });
});
// End Legacy Commands

// Start Slash Commands
const commandsPath = join(__dirname, 'slash-commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.slashCommands.set(command.data.name, command);
  }
  else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.slashCommands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  }
  catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    }
    else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
});
// End Slash Command

client.on('ready', () => {
  console.log(`"${client.user.tag}" is ready!`);
  client.user.setPresence({ activities: [{ name: `${process.env.PREFIX}help | v${pkg.version}` }], status: 'online' });
});

/**
 * The line "120" used for debugging. Uncomment it if you want to debug your bot.
 */
// client.on('debug', console.log);

client.on('messageCreate', async message => {
  if (message.author.bot || !message.guild) return;
  const prefix = process.env.PREFIX;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.legacyCommands.get(command) || client.legacyCommands.get(client.legacyAliases.get(command));
  if (!cmd) return;
  if (cmd.inVoiceChannel && !message.member.voice.channel) {
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#ec9bbb')
          .setTitle(`${client.emotes.error} | Error`)
          .setDescription('You must be in a voice channel first!')
          .setTimestamp()
          .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
      ]
    });
  }
  try {
    cmd.run(client, message, args);
  } catch (e) {
    console.error(e);
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#ec9bbb')
          .setTitle(`${client.emotes.error} | Error`)
          .setDescription(`\`${e}\``)
          .setTimestamp()
          .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
      ]
    });
  }
});

client.distube
  .on('playSong', (queue, song) =>
    queue.textChannel.send({
      embeds: [
        new EmbedBuilder()
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
        new EmbedBuilder()
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
          new EmbedBuilder()
            .setColor('#ec9bbb')
            .setTitle(`${client.emotes.error} | Error`)
            .setDescription(`An error occurred: ${e.toString().slice(0, 1974)}`)
            .setTimestamp()
            .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
        ]
      }) && console.error(e);
    }
  })
  .on('empty', channel => channel.send('The channel was empty, so I disconnected from that channel.')) // When the bot don't have any current listeners, the bot will disconnect from the current channel automatically, but didn't send this respond.
  .on('searchNoResult', (message, query) =>
    message.reply({
      embeds: [
        new EmbedBuilder()
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
      new EmbedBuilder()
        .setColor('#ec9bbb')
        .setTitle(`${client.emotes.successgreen} | Finished`)
        .setDescription(`All requested songs have been played.\n\nIf you want to request more song, just type \`${process.env.PREFIX}play <song title>\` or \`${process.env.PREFIX}play <youtube url>\` (without brackets).`)
        .setTimestamp()
        .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
    ]
  }));

client.login(process.env.TOKEN);
