const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('embedtest')
    .setDescription('embed test cmd')
    ,
    async execute(interaction)
    {
        
        const embed = new EmbedBuilder()
        .setTitle('Test Embed')
        .setColor(0x0099FF)
        .setDescription('Mooie embed');

        interaction.reply({ embeds: [embed] });
    }
};
