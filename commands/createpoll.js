const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('createpoll')
    .setDescription('Makes a new poll')
    .addStringOption(option => 
        option.setName('question')
        .setDescription('question for the poll')
        .setRequired(true)
        )
    ,
    async execute(interaction)
    {
        await interaction.reply({
            content: 'Poll started',
            ephemeral: true
        });
    }
};