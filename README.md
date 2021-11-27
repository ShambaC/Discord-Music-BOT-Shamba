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
- `app/type`, type of the activity status //PLAYING, STREAMING, LISTENING, WATCHING, CUSTOM, COMPETING

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

### 🤖 Commands

|       Name       | Description                                                        | Options              |
|:----------------:|--------------------------------------------------------------------|----------------------|
| invite           | Invite link for the bot                                            |                      |
| ping             | Check the ping of the BOT                                          |                      |
| back(previous)   | Play the previous song                                             |                      |
| clear(cq)        | Clear the queue                                                    |                      |
| filter           | Apply filters to the current queue                                 | filter name          |
| loop(lp, repeat) | Loop the queue or current track                                    | none, queue          |
| lyrics           | Displays the lyrics of the current track or the track you searched | none, search term    |
| nowplaying(np)   | Shows the currently playing track details with buttons             |                      |
| pause            | Pause the track                                                    |                      |
| play(p)          | Play a song with URL or search term                                | URL, search term     |
| playfile(pf)     | Play the file attached to this command message                     |                      |
| progress(pbar)   | Shows the current timestamp of the track as a bar                  |                      |
| queue(q)         | Shows the queue of tracks                                          |                      |
| remove(rm)       | Remove a particular track from queue                               | track number         |
| resume(rs)       | Resumes the track                                                  |                      |
| save(sv)         | Saves the name of the track to user's DMs                          |                      |
| search           | Shows a list of 10 songs to choose from                            | Search Terms         |
| seek             | Seek to a part of track                                            | Timestamp in seconds |
| shuffle          | Shuffle the queue order                                            |                      |
| skip(sk)         | Skips the current song                                             |                      |
| stop(dc)         | Stops and disconnects the BOT                                      |                      |
| volume(vol)      | Set internal volume of the BOT                                     | value                |

Without forgetting of course the code editor ^^

Realized with ❤️ by ShambaC(ShambaC#3440).

You can try out the BOT by inviting it to your server [here](https://discord.com/api/oauth2/authorize?client_id=507874682242990081&permissions=2150942784&scope=bot%20applications.commands)

Contact me on Discord for any help => ShambaC#3440
