//Setup
const fs = require('fs');
const Discord = require('discord.js');
const bot = new Discord.Client();
const request = require('request');
const { Console } = require('console');
const exec = require('child_process').exec;
const roleData = JSON.parse(fs.readFileSync('./output.json'));


//Reads file with token and logs in
const info = JSON.parse(fs.readFileSync('./token.JSON'))
const token = info.token
bot.login(token);

var runningLength = 0;
var roleArray = [];


//Searches for roles
function searchRoles (role, msg) {
    //roles is all the roles on the server as a list
    var roles = [];
    //roleString and roleArray help match what user sees to how the data needs to be stored to be accessed easily
    var roleString = "";
    roleArray = [];
    msg.channel.send("Searching for roles with that name...");
    //msg needs to be sent to next function, not sure how required this line is
    msg = msg;
    //iterates through the roles
    for (i=0;i<roleData.length;i++) {
        roles.push(roleData[i].name)
    }
    //Goes through every role
    var j = 1;
    for ( let i = 0; i < roles.length; i++ ) {
        //if it finds a role that includes the string that the user searched for it adds it to the array and string
        if (roles[ i ].includes(role)) {
            //formatting happens here
            roleString = roleString.concat(j + ". " + roles[ i ] + ", \n");
            roleArray.push(roles[i]);
            j++;
        }
    }

    //When it's done it sends array string and message to next function
    //if it found a role that matches it
    if (roleArray.length != 0 && roleArray.length < 10) {
        msg.channel.send("Enter the number corresponding to your class");
        console.log(roleArray.length);
        msg.channel.send(roleString);
        runningLength = roleArray.length;
    //Otherwise it asks them to try again
    } else if (roleArray.length == 0) {
        msg.channel.send("Could not find any classes containing the word " + role 
        + ".  Try just searching for your teachers name, and if that doensn't work, double check that you spelled it correctly");
    } else {
        msg.channel.send("We found too many results, please try to narrow it down.  (tip, try just typing in your teacher's last name)")
    }
}


//Sends list to channel and gets finds their choice of role

//try changing to this : 

//client.on("message", (message) => {

//});

function setSelectedChoice(msg, member) {
    //camelcase babyyy
    for (i = 0; i < roleArray.length; i++) {
        if (!msg.author.bot && msg.content == i) {
            var role = msg.guild.roles.cache.find(role => role.name === roleArray[msg.content - 1]);
            console.log(role);
            msg.member.roles.add(role);
            msg.channel.send('You have joined the ' + role.name + ' channel!');
            runninglength = 0;
            roleArray = [];
            return;
        }
    }
}


//when the bot turns on
bot.on('message', msg=> {
    if (msg.author.bot) return;
    const member = msg.member;
    if (runningLength == 0) {
        if (msg.content.slice(0, 7) == '.search') {
            //the five might be 6 according to different code, but I have no idea why it would be
            //this would also make the below 7 an 8, but it didn't in the other code, so this might have problems
            searchRoles(msg.content.slice(8, msg.content.length+1), msg);
            console.log("search role worked");
        }
    } else {
        setSelectedChoice(msg, member);
    }
})

bot.login;