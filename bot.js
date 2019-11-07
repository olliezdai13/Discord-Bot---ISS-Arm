const Discord = require("discord.js");
const Snoowrap = require("snoowrap");
const client = new Discord.Client();
const auth = require("./auth.json");
const prefix = auth.prefix;
let msgChannelId = null;
let channel = null;
let reddit = null;

const supportedCommands = ["anchor", "status", "author_reddit", "help"];

client.on('ready', () => {
	console.log("Logged in as " + client.user.tag + "!");
});

client.login(auth.token);

client.on("ready", () => {
	console.log("Bot initializing...\n Ready.\n");
});

Snoowrap.fromApplicationOnlyAuth({
	userAgent: "ISS Arm",
	//These tokens must be found in auth.json which should be stored securely
	clientId: auth.reddit_iss_arm_id,
	clientSecret: auth.reddit_iss_arm_secret,
	grantType: Snoowrap.grantType.CLIENT_CREDENTIALS
}).then(r => {
	console.log("Authenticated with Reddit API as userAgent: " + "ISS Arm");
	reddit = r;
});

client.on('message', msg => {
	console.log(msg.content.startsWith(prefix));
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;
	
	const args = msg.content.slice(prefix.length).trim().split(/ +/g);
	const command = "" + args.shift().toLowerCase();

	console.log("command processed: " + command);

	//Start commands that can be run in any channel:
	if (command === "anchor") {
		console.log("command entered: anchor");
		msgChannelId = msg.channel.id;
		channel = client.channels.get(msgChannelId);
		channel.send("Bot anchored to channel with id: " + msgChannelId);
	}

	if (command === "status") {
		console.log("command entered: status");
		msg.reply(	"International Space Station's Arm moving as usual\n"
				+ "Arm module anchored to channel: " + getAnchor() + "\n"
		);
	}

	if (command === "") {
		console.log("command entered: \"\"");
		msg.reply("type \"iss arm help\" for a list of commands");
	}
	//End commands that can be run in any channel.

	if (supportedCommands.includes(command) && msg.channel.id != msgChannelId) { 
		msg.reply("That command requires you to install the ISS Arm. Try running \"iss arm anchor\"");	
		return;
	} else if (msg.channel.id != msgChannelId) return;
	if (msg.channel.id != msgChannelId) return;
	
	//The following commands will only be run if they are initiated in the anchor channel.

	if (command === "help") {
		let commands = "";
		supportedCommands.forEach(cmd => { commands = commands + cmd + "\n\t"; });
		console.log("command entered: help");
		channel.send("ISS ARM MODULE INSTRUCTIONS ARE AS FOLLOWS:\nTo run a command, type \"iss arm <command>\"\n\n"
				+ "COMMANDS:\n\t" + commands);
	}

	if (command === "author_reddit") {
		console.log("command entered: reddittest");
		console.log("Snoowrap initialized as: " + reddit);
		try {
			reddit.getUser('tunabearmonkey').fetch().then(userInfo => {
				console.log(userInfo.name);
				console.log(userInfo.created_utc);
				channel.send("Bot author's reddit account info: name=" + userInfo.name + " \t created_utc=" + userInfo.created_utc);
			})
		} catch(error) {
			console.log("An error occurred when running command 'reddittest'. Perhaps reddit api did not initialize successfully?");
			console.log("Error Msg: " + error.message);
			channel.send("An error occurred. Please try again later");
		}
	}

});

function getAnchor(){
	if (!channel) {
		return "none (Run the 'anchor' command somewhere)";
	} else {
		return client.channels.get(msgChannelId).name;
	}
}
