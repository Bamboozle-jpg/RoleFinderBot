//Setup
const fs = require('fs');
const Discord = require('discord.js');
const bot = new Discord.Client();
const request = require('request');
const { Console } = require('console');
const exec = require('child_process').exec;

//Reads file with token and logs in
const info = JSON.parse(fs.readFileSync('./token.JSON'))
const token = info.token
bot.login(token);


//Searches for roles
function searchRoles (role, msg) {
    msg.channel.send("Searching for roles with that name...");
    //roleString and roleArray help match what user sees to how the data needs to be stored to be accessed easily
    var roleString = "";
    var roleArray = [];
    //msg needs to be sent to next function, not sure how required this line is
    msg = msg;
    //iterates through the roles
    for ( let i = 0; i < roles.length; i++ ) {
        //if it finds a role that includes the string that the user searched for it adds it to the array and string
        if (roles[ i ].includes(role)) {
            //formatting happens here
            roleString = roleString.concat(i+1 + ". " + roles[ i ] + ", \n");
            roleArray.push(role);
        }
    }
    //When it's done it sends array string and message to next function
    //if it found a role that matches it
    if (roleArray.length != 0) {
        printSearchedRoles(roleString, roleArray, msg);
    //Otherwise it asks them to try again
    } else {
        msg.channel.send("Could not find any classes containging the word " + role 
        + ".  Try just searching for your teachers name, and if that doensn't work, double check that you spelled it correctly");
    }
}


//Sends list to channel and gets finds their choice of role
function printSearchedRoles(rolestring, rolearray, msg) {
    //camelcase babyyy
    roleString = roleString;
    roleArray = roleArray; 
    msg.channel.send("Enter the number corresponding to your class");
    msg.channel.send(roleString);
    for (i = 0; i < roleArray.length; i++) {
        if (!msg.author.bot && msg.content == roleArray[i]) {
            var role = member.guild.roles.cache.find(role => role.name === roleArray[i]);
            member.roles.add(role);
        }
    }
}


//when the bot turns on
bot.on('message', msg=> {
    if (msg.content.slice(0, 5) === '.search') {
        //the five might be 6 according to different code, but I have no idea why it would be
        //this would also make the below 7 an 8, but it didn't in the other code, so this might have problems
        searchRoles(msg.content.slice(7, msg.content.lenght), msg);
        console.log("search role worked");
    }
})