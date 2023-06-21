const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('command template')
    .setDescription('command template')
    ,
    async execute(interaction)
    {
        await interaction.reply('Command, nice.');
    }
};