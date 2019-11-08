# International Space Station Arm
A bot by Oliver Dai

This bot was made to explore the Discord Bot API, the Reddit API through Snoowrap, and to practice with JavaScript, Git, NodeJS, and development using purely Ubuntu.


###Documentation:
You cannot run this bot on your own machine unless you generate a few private keys. If you do want to run ISS Arm: 
1. Register your own instance of this Discord Bot with its own ID and Token. Also register your own instance of this reddit app with its own ID and Secret.
2. Download the repo and create a file called auth.json to hold private keys. The contents of the file should be as follows: 
```json
{
	"token": "<your_discord_bot_token>",
	"prefix": "iss arm ",
	
	"reddit_iss_arm_secret": "<your_reddit_app_secret>",
	"reddit_iss_arm_id": "<your_reddit_app_id>"
}
```
Replace the `< ... >` with your own tokens.

3. Install NodeJS

4. Add the bot to your server. (See Discord Bot documentation and use your own bot instance

5. Run bot.js using `node bot.js`

### Supported Commands
To run any command, prefix your message with `iss arm <command>`
*Commands that require `anchor` to be run first are marked with \**
- help : displays useful information about the bot \*
- status : displays the bot's status
- anchor : locks the bot to the channel this is run in. Prerequisite to many other commands.
- author_reddit : displays Reddit account information about the bot's author 'tunabearmonkey' \*
