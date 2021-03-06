const { RichEmbed } = require("discord.js");
const fs = require("fs");
let cols = JSON.parse(fs.readFileSync("./color.json", "utf8"));
module.exports = {
  name: "crole",
  aliases: ["hexrole"],
  category: "RoleManagement",
  description: "***COLOR CHANGE*** Changes role color to a given Hex Color",
  run: (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message
        .reply("You don't have the required permissions to use this command.")
        .then(m => m.delete(5000));
    let rRole = message.mentions.roles.first();
    if (!rRole) return message.reply("ERROR 404 role not found");
    let text = args[1];
    let mf = cols[text];
    if (!text) return message.reply.toUpperCase("please select random or hex color");
    if (text.startsWith("#")) {
      call();
    } else if (text.startsWith("random")) {
      cal();
    } else if (text.startsWith(text)) {
      color();
    }
    function color() {
      message.channel.send(`color changed to ${mf}`)
      rRole.edit({
        color: mf
      });
  
}
    function cal() {
      try {
        let random = Math.floor(Math.random() * 16777215).toString(16);

        rRole.edit({
          color: random
        });
        let bed = new RichEmbed()
          .setColor(random)
          .setTitle("role color changed")
          .addField(
            `${message.author.tag}`,
            "changed the " + rRole + " color to " + text + "\n" + random
          );
        message.channel.send(bed);
      } catch (err) {
        message.reply(err.stack);
      }
    }
    function call() {
      if (text.length > "7") return message.reply("Must be 6 values in length");
      try {
        rRole.edit({
          color: text
        });
        let embed = new RichEmbed()
          .setColor(text)
          .setTitle("role color changed")
          .addField(
            `${message.author.tag}`,
            "changed the " + rRole + " color to " + text
          );
        message.channel.send(embed);
      } catch (error) {
        message.guild.channels.find("name", "errorlogs").send(error + "01=^^");
      }
    }
  }
};
