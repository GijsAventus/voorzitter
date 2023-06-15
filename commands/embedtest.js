const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('embedtest')
    .setDescription('Testing for embeds')
    ,
    async execute(interaction)
    {
        const embedTest = new EmbedBuilder()
        .setTitle('Test Embed')
        .setDescription('Voor embed testing zooi')
        .addFields(
            {name:'Test field 1', value:'description 1', inline: true},
            {name:'Test field 2', value:'description 2', inline: true},
        )
        .setColor(0x89B0AE);
        interaction.reply({embeds: [embedTest]});
    }
};

