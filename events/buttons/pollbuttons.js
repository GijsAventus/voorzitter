const { ButtonInteraction } = require("discord.js");

const votedMembers = new Set();

module.exports = {
    name: 'interactionCreate',

    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {
        if(!interaction.isButton()) return;

        const splitInteractionId = interaction.customId.split('-');
        if (splitInteractionId[0] !== 'Poll') return;
        
        if (votedMembers.has(`${interaction.user.id}-${interaction.message.id}`))
        return interaction.reply({content:'You already voted', ephemeral: true});
        
        const pollEmbed = interaction.message.embeds[0];

        const durationField = pollEmbed.fields[2];
        const endTime = durationField.value.slice(3, -3);
        if(Math.floor(Date.now() / 1000) >= endTime)
        return interaction.reply({content:'This poll has ended.', ephemeral: true})

        votedMembers.add(`${interaction.user.id}-${interaction.message.id}`);

        const yesField = pollEmbed.fields[0];
        const noField = pollEmbed.fields[1];

        const voteCountedReply = 'Vote Counted!';

        switch(splitInteractionId[1]) {
            case 'Yes' :
                const newYesCount = parseInt(yesField.value) + 1;
                yesField.value = newYesCount;
                interaction.reply({content:voteCountedReply, ephemeral:true})
                interaction.message.edit({embeds:[pollEmbed]});
                break;
        
            case 'No' :
                const newNoCount = parseInt(yesField.value) + 1;
                noField.value = newNoCount;
                interaction.reply({content:voteCountedReply, ephemeral:true})
                interaction.message.edit({embeds:[pollEmbed]});
                break;
            
        }

    }
}