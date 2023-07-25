/*
 * This is "commands" for slash command. Once this command is issued, the bot will reply your message.
 * The message contains all available commands.
 *
 * Example usage:
 * /help
*/

const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Showing list of available commands'),
  async execute(interaction) {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#edcced')
          .setTitle(`${interaction.client.user.username} Commands`)
          .setDescription(`**Legacy Commands**\n\`${process.env.PREFIX}help\` / \`${process.env.PREFIX}commands\`\n\`${process.env.PREFIX}join\`\n\`${process.env.PREFIX}latency\` / \`${process.env.PREFIX}ping\` / \`${process.env.PREFIX}lat\`\n\`${process.env.PREFIX}leave\` / \`${process.env.PREFIX}dc\`\n\`${process.env.PREFIX}nowplaying\` / \`${process.env.PREFIX}np\`\n\`${process.env.PREFIX}pause\`\n\`${process.env.PREFIX}play\` / \`${process.env.PREFIX}req\`\n\`${process.env.PREFIX}queue\`\n\`${process.env.PREFIX}repeat\` / \`${process.env.PREFIX}loop\`\n\`${process.env.PREFIX}resume\`\n\`${process.env.PREFIX}skip\`\n\`${process.env.PREFIX}stop\`\n\`${process.env.PREFIX}uptime\` / \`${process.env.PREFIX}up\`\n\`${process.env.PREFIX}version\` / \`${process.env.PREFIX}ver\`\n\`${process.env.PREFIX}voicelatency\` / \`${process.env.PREFIX}voicelat\` / \`${process.env.PREFIX}voiceping\`\n\`${process.env.PREFIX}volume\` / \`${process.env.PREFIX}vol\`\n\n**Slash Commands**\n/help\n/join\n/latency\n/leave\n/nowplaying\n/pause\n/play\n/queue\n/repeat\n/resume\n/skip\n/stop\n/uptime\n/version\n/voicelatency\n/volume`)
      ]
    }) && console.log(`[LOG (Info)]: "${interaction.user.username}" (User ID: ${interaction.user.id}) just used the "/help" command on "${interaction.channel.name}" (Channel ID: ${interaction.channel.id}).`);
  }
};
