const { 
    PermissionFlagsBits, 
    ChatInputCommandInteraction, 
    SlashCommandBuilder, 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('createpoll')
    .setDescription('Makes a new poll')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option => 
        option.setName('question')
        .setDescription('question for the poll')
        .setRequired(true)
        )
    ,
    
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    
    async execute(interaction)
    {
        const pollQuestion = interaction.options.getString('question');
        
        const pollEmbed = new EmbedBuilder()
        .setTitle('titel')
        .setDescription(pollQuestion)
        .addFields(
            {name:'Yes', value:'0', inline:true},
            {name:'No', value:'0', inline:true}
        )
        .setColor(0xAA4444);

        const replyObject = await interaction.reply({embeds:[pollEmbed], fetchReply:true})

        const pollButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder().setLabel('Yes').setCustomId(`Poll-Yes-${replyObject.id}`).setStyle(ButtonStyle.Success),
            new ButtonBuilder().setLabel('No').setCustomId(`Poll-No-${replyObject.id}`).setStyle(ButtonStyle.Danger)
        )
        
        interaction.editReply({components:[pollButtons]})

    }
};