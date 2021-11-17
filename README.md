# Music-bot

A complete code to download for a music bot 🎧

Looking for a code for a music bot ? This fully open source code is made for your project !

This Project was made with a fork of Zerio Dev's [Music BOT](https://github.com/ZerioDev/Music-bot).

### ⚡ Configuration

Open the configuration file located in the main folder `config.js`.

```js
module.exports = {
    app: {
        px: 'XXX',
        token: 'XXX',
        playing: 'Game',
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: 'XXX',
            commands: []
        },
        maxVol: 100,
        loopMessage: false,
        discordPlayer: {
            leaveOnEnd: false,
            leaveOnStop: false,
            leaveOnEmpty: false,
            leaveOnEmptyCooldown: 30000,
            autoSelfDeaf: true,
			ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
```

Basic configuration

- `app/px`, the prefix that will be set to use the bot
- `app/token`, the token of the bot available on the [Discord Developers](https://discordapp.com/developers/applications) section
- `app/playing`, the activity of the bot

DJ mode configuration

- `opt/DJ/enabled`, whether the DJ mode should be activated or not 
- `opt/DJ/roleName`, the name of the DJ role to be used
- `opt/DJ/commands`, the list of commands limited to members with the DJ role

Advanced configuration

- `opt/maxVol`, the maximum volume that users can define
- `opt/discordPlayer`, options used by discord-player

Configure the lyrics command

- Open the `lyrics.js` file under `commands/music`
- Use your Genius app token here or leave it blank in line 3 : `const Client = new Genius.Client("Token or blank");`
- Create your Genius client [here](http://genius.com/api-clients)

### 📑 Installation

To use the project correctly you will need some tools.

[FFmpeg](https://www.ffmpeg.org) to process audio

[Node JS](https://nodejs.org/en/) (v16) for environment

Without forgetting of course the code editor ^^

Realized with ❤️ by ShambaC(ShambaC#3440).

You can try out the BOT by inviting it to your server [here](https://discord.com/api/oauth2/authorize?client_id=507874682242990081&permissions=2150942784&scope=bot%20applications.commands)

Contact me on Discord for any help => ShambaC#3440
