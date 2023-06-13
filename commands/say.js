const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Zegt iets in een kanaal')
    .addChannelOption(option => 
        option.setName('channel')
        .setDescription('channel to say the thing in')
        .setRequired(true)
        )
    .addStringOption(option => 
        option.setName('message')
        .setDescription('message to send')
        .setRequired(true)
        )
    ,
    async execute(interaction)
    {
        const channel = interaction.options.getChannel('channel');
        const message = interaction.options.getString('message');

        await channel.send(message);
        await interaction.reply({
            content: 'message sent',
            ephemeral: true
        });
    }
};