/**
 * Command Description:
 * This is "commands" for legacy command. Once this command is issued, the bot will reply your message.
 * The message contains all available commands.
 *
 * Cooldown Description:
 * This command includes the "cooldown" system.
 * Cooldown is a function to avoid floods/spams.
 * Every command issuer (user) have 5 seconds cooldown.
 *
 * Example usage:
 * !commands
 * !help
 * !h
*/

const { EmbedBuilder } = require('discord.js');
const cooldown = new Set();

module.exports = {
  name: 'commands',
  aliases: ['help', 'h'],
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
    } else {
      message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor('#ec9bbb')
            .setTitle(`${client.user.username} Available Commands`)
            .setDescription(client.legacyCommands.map(cmd => `\`${cmd.name}\``).join(', '))
            .setTimestamp()
            .setFooter({ text: `${client.user.tag}`, iconURL: '<put your bot avatar link>' })
        ]
      });
      cooldown.add(message.author.id);
      setTimeout(() => {
        cooldown.delete(message.author.id);
      }, 5000);
    }
  }
};
