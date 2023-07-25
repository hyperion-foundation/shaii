/*
 * This is a Deploy Command file.
 * To activate the slash command feature, you should use this file to deploy all the commands.
 *
 * Need a tutorial to deploy the command?
 * Go to our wiki: https://github.com/hyperion-foundation/shaii/wiki
*/

require('dotenv').config();
const { REST, Routes } = require('discord.js');
// const { clientId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const commandsPath = path.join(__dirname, 'slash-commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./slash-commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
// const rest = new REST({ version: '10'}).setToken(token); <- For the config.json method

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    const data = await rest.put(
      // Routes.applicationCommands(clientId), <- For the config.json method
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();