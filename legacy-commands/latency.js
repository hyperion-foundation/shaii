/*
    There is something I need to add to this command.
    If someone know how to create a perfect 'latency' or 'ping' command, please tell me.
    And I want to add a function to this command if the bot actually can show us about bot ping voice channel connection.

    - SleepNov4 (Alexander Andhika S)
*/
const { EmbedBuilder } = require('discord.js');
const cooldown = new Set();

module.exports = {
  name: 'latency',
  aliases: ['ping'],
  run: async (client, message) => {
    if (cooldown.has(message.author.id)) {
      message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#ec9bbb')
            .setDescription('You\'re on cooldown! Please wait for `5 seconds` before using it again.')
            .setTimestamp()
            .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
        ]
      });
    }
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#ec9bbb')
          .setTitle(`${client.emotes.info} | Latency`)
          .addFields(
            { name: 'Websocket Latency', value: `${Math.round(client.ws.ping)} ms` },
            { name: 'API Latency', value: `${Date.now() - message.createdTimestamp} ms` }
          )
          .setTimestamp()
          .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
      ]
    });
  }
};
