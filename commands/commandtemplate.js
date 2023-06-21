const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('commandtemplate')
    .setDescription('command template')
    ,
    async execute(interaction)
    {
        await interaction.reply('Command, nice.');
    }
};