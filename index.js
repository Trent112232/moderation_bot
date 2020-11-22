const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const ms = require("ms");
const chalk = require('chalk');



const settings = {
    botToken: ""
};

const config = require("./config.json");
client.on("ready", () => {
    console.log(`Bot initialised`); 
    client.user.setPresence({
        game: {
            name: ";help | Made by Trent",
            type: "Playing"
        }
    })
    })
client.on("message", async message => {

    if(message.author.bot) return;
        
    if(!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();  
    if(command === ";kick") {
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("Can't find user!");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You are lacking the permissions `Manage Messages`!");
        if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Thas person cannot be kicked!");

        message.guild.member(kUser).kick(kReason)
        message.channel.send("User was kicked!");

        return;
    }
    if(command === ";ban") {
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send("Can't find user!");
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You are lacking the permissions `Manage Messages`!");
        if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Thas person cannot be kicked!");

        message.guild.member(bUser).ban(bReason)
        message.channel.send("User was banned!");

        return;
    }
    if(command === ";timeout") {
        let tomute = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!tomute) return message.reply("Couldn't find user.");
        if(tomute.hasPermission("ADMINISTRATOR")) return message.reply("Can't mute them!");
        let muterole = message.guild.roles.find(`name`, `Timeout`);
        
        let mutetime = args[1];
        if(!mutetime) return message.reply("You didn't specify a time!");

        await(tomute.addRole(muterole.id)); // If this doesn't work, try topit.roles.add(muterole.id);
        message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

        setTimeout(function(){
            tomute.removeRole(muterole.id); // If this doesn't work, try topit.roles.remove(muterole.id);
            message.channel.send(`<@${tomute.id}> has been unmuted!`)
        }, ms(mutetime));
    }
    if(command === ";pit") {
        let topit = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!topit) return message.reply("Couldn't find user.");
        if(topit.hasPermission("ADMINISTRATOR")) return message.reply("You can't sentence them!");
        let pitrole = message.guild.roles.find(`name`, `Pit`);
        
        let pittime = args[1];
        if(!pittime) return message.reply("You didn't specify a time!");

        await(topit.addRole(pitrole.id)); // If this doesn't work, try topit.roles.add(pitrole.id);
        message.reply(`<@${topit.id}> has been sentenced to the gulag for ${ms(ms(pittime))}`);

        setTimeout(function(){
            topit.removeRole(pitrole.id); // If this doesn't work, try topit.roles.remove(pitrole.id);
            message.channel.send(`<@${topit.id}> has been released from the pit!`)
        }, ms(pittime));
    }
    })
client.login(settings.botToken);
