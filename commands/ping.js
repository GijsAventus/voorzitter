const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check if bot is online')
    ,
    async execute(interaction)
    {
        await interaction.reply("I'm online. (pong)");
    }
};