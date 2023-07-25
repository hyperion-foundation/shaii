/*
 * This is "latency" command. Once this command is issued, the bot will reply your message.
 * The message contains the bot latency information. The latency is calculated based on when the command was issued (API)
 * and based the current location where the bot was hosted from (WebSocket). The latency numbers are shown in milliseconds (ms).
 * Example usage:
 * /latency (Slash Command)
*/

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('latency')
    .setDescription('Checking the bot latency'),
  async execute(interaction) {
    const sent = await interaction.reply({ content: 'Measuring...', fetchReply: true });
    interaction.editReply(`API: ${sent.createdTimestamp - interaction.createdTimestamp} ms.\nWebSocket: ${interaction.client.ws.ping} ms.`);
    console.log(`[LOG (Info)]: "${interaction.user.username}" (${interaction.user.id}) just used the "/latency" command on "${interaction.channel.name}" (Channel ID: ${interaction.channel.id}).`);
  }
};