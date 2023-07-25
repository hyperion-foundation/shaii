const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skip the current played song'),
  async execute(client, interaction) {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#edcced')
          .setDescription(`This command currently unavailable. Use the \`${process.env.PREFIX}skip\` command instead.`)
      ]
    }) && console.log(`[LOG (Info)]: "${interaction.user.username}" (User ID: ${interaction.user.id}) just used the "/skip" command on "${interaction.channel.name}" (Channel ID: ${interaction.channel.id}).`);
    // await interaction.reply({
    //   embeds: [
    //     new EmbedBuilder()
    //       .setColor('#edcced')
    //       .setDescription('')
    //   ]
    // });
  }
};
