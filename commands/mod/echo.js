
const { RichEmbed } = require("discord.js");
module.exports = {
	name: "echo",
  aliases: ["announce"],
	category: "message",
	description: "Message another chat using the bot",
	run: (client, message, args)=>{
    message.delete()
    var i = 5000
       if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cant do that")
        const text = message.content.split(" ").slice(2)
        if(!text) message.channel.send("What Should i say?")
        let mUser = message.mentions.channels.first()
        if(!mUser) return message.reply("please Mention channel")
    mUser.startTyping();
    setTimeout(()=>{
      mUser.send(text.join(" "))
    }, i)
    mUser.stopTyping();

	}
}
