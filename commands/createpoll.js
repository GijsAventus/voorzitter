const { 
    PermissionFlagsBits, 
    ChatInputCommandInteraction, 
    SlashCommandBuilder, 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle } = require('discord.js');

const ms = require('ms');

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
    .addStringOption(option => 
        option.setName('duration')
        .setDescription('Specify a time, example: 12h, 3d, 10m')
        .setRequired(true)
        )
    ,
    
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    
    async execute(interaction)
    {
        const pollQuestion = interaction.options.getString('question');
        const duration = interaction.options.getString('duration');

        const endTime = Math.floor(Date.now() / 1000) + Math.floor(ms(duration)/1000);

        const pollEmbed = new EmbedBuilder()
        .setTitle('Poll:')
        .setDescription(pollQuestion)
        .addFields(
            {name:'Yes', value:'0', inline:true},
            {name:'No', value:'0', inline:true},
            {name:'Ends in:', value:`<t:${endTime}:R>`, inline:false},
            {name:'Ends at:', value:`<t:${endTime}:f>`, inline:false},
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