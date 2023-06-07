const discord = require("discord.js");

const ALLOWED_CHANNEL_ID = "1115209989938757652";

const client = new discord.Client({
    intents: [
		discord.GatewayIntentBits.Guilds,
		discord.GatewayIntentBits.GuildMessages,
		discord.GatewayIntentBits.MessageContent,
		discord.GatewayIntentBits.GuildMembers,
        discord.GatewayIntentBits.GuildMessageReactions,
        discord.GatewayIntentBits.DirectMessages
    ]
});

client.on("ready", ()=>{
    console.log("huppekee regering online voorzitter")
});

client.on("messageCreate", (message) => {
    try {
        if(message.author.bot) return;

        if(message.channel.id !== ALLOWED_CHANNEL_ID) return;

        console.log(`${message.author.tag} in #${message.channel.name} stuurde: ${message.content}`);
        
        const emoji = message.guild.emojis.cache.find(emoji => emoji.name === "confetti");

        message.react(emoji);

        message.reply("huppekee");

        const target = message.guild.members.cache.find(member => member.id === "557218928368156674");

        if(message.content?.startsWith("!ban")) {
            if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply("huppekee, jij mag dat niet");
            target.ban({reason: "huppekee"}).catch((err) => {
                throw new Error(err);
            });
        }
        
    } catch (error) {
        console.trace(error);
        message.reply(`OnMessage Error:\n> ${error?.message || "er is iets misgegaan"}`)
    }
})

client.login("MTExNTIwNjIyNzY2NDgzMDQ3NA.G5z9SZ.QiPDZx1VuZgKJcIQE73YKsZR5BzF4YDa31cbA8");