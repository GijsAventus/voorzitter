require('dotenv').config();

const fs = require('fs');
const path = require('path');

const {REST} = require('@discordjs/rest');
const { isContextMenuApplicationCommandInteraction } = require('discord-api-types/utils/v9');
const { Routes } = require('discord-api-types/v9');
const { Client, GatewayIntentBits, Collection } = require('discord.js');

const pollButtonsInteraction = require('./events/buttons/pollbuttons.js');

// intents, dit is welke informatie discord stuurt naar de app. zo krijg je alleen wat je nodig hebt
const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

console.log('Updating slash commands...');

// registreer een nieuw slashcommand voor elk .js bestand in de commands directory
const commands = [];
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}

client.on('ready', ()=> {
    const guild_ids = client.guilds.cache.map(guild => guild.id);

    const rest = new REST({version: '9'}).setToken(process.env.TOKEN);
    for(const guildId of guild_ids) {
        rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),
        {body: commands})
        .then(() => console.log('Successfully updated commands for guild ' + guildId))
        .catch(console.error);
    }
});

// triggert wanneer een nieuwe interactie gemaakt wordt. dit kan een commando zijn of een klik op een van de knoppen die de bot heeft gemaakt
client.on('interactionCreate', async interaction => {
    pollButtonsInteraction.execute(interaction);
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    }
    catch(error) {
        console.error(error);
        await interaction.reply({content:"error :frowning2:"});
    }
})

client.login(process.env.TOKEN);