const discord = require("discord.js");

const ALLOWED_CHANNEL_ID = "1115209989938757652";

const client = new discord.Client({
    intents: [
		discord.GatewayIntentBits.Guilds,
		discord.GatewayIntentBits.GuildMessages,
		discord.GatewayIntentBits.MessageContent,
		discord.GatewayIntentBits.GuildMembers,
    ]
});

client.on("ready", ()=>{
    console.log("huppekee regering online voorzitter")
});

client.on("messageCreate", (message)=>{
    if(message.author.bot) return;

    if(message.channel.id !== ALLOWED_CHANNEL_ID) return;

    console.log(`${message.author.tag} in #${message.channel.name} stuurde: ${message.content}`);
    
    const emoji = message.guild.emojis.cache.find(emoji => emoji.name === "confetti");

    console.log(emoji);

    message.react(emoji);

    message.reply("huppekee");
})

client.login("MTExNTIwNjIyNzY2NDgzMDQ3NA.G5z9SZ.QiPDZx1VuZgKJcIQE73YKsZR5BzF4YDa31cbA8");