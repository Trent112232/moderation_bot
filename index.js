////////////////////////////////////
// Discord Bot Template by Trent! //
// https://github.com/Trent112232 //
////////////////////////////////////


// If these dependencies don't work, or arent installed, open your terminal and run: npm install
// Or just install them separately with: npm install [PACKAGE]
const Discord = require("discord.js");
const client = new Discord.Client();
const chalk = require('chalk');
// Used a variable to define the token, it's only used at the bottom of the script so you can remove this if you like.
const settings = {
    botToken: "TOKEN HERE"
};
const config = require("./config.json"); // The config stores the prefix, for commands. If you like, however, you can also add other things to the config.
client.on("ready", () => { // The bot's presence
    console.log(`Bot initialised!`); // Tells you when the bot's online
    client.user.setPresence({
        game: {
            name: "Discord Bot",
            type: "PLAYING"
        }
    })
    })
client.on("message", async message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
        
    if(command === "help") { // Here you can start adding commands!
        message.channel.send({embed: {
            color: 1146986, // The embed bar's colour.
            title: "Bot", // The title of the embed.
            description: "`help`" // The actual text in the embed.
          }});
		message.channel.send("Here's a normal message!") // Sends a message that isn't in an embed.
		message.react('😎'); // The bot can also react to the user's message, with an emoji.
    }

    })
client.login(settings.botToken);