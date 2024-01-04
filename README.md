# 🎵 Music-bot

A complete code to download for a music bot 🎧

Looking for a code for a music bot ? This fully open source code is made for your project !

You can try out the BOT by inviting it to your server [here](https://discord.com/api/oauth2/authorize?client_id=507874682242990081&permissions=2150942784&scope=bot%20applications.commands)

This Project was made with a fork of Zerio Dev's [Music BOT](https://github.com/ZerioDev/Music-bot).

Updated to use discord-player v6 and discord.js v14

## 📸 Screenshots
![image](https://user-images.githubusercontent.com/38806897/147191799-b880a8e6-ff5d-4702-84b0-95d23739d8ff.png)

![image](https://user-images.githubusercontent.com/38806897/147191840-b34d746f-a87b-447d-9610-89013dac8750.png)


## ⚡ Configuration

Setup the environment file.
- Copy the `.env.example` file and rename it to `.env`
- Edit the file and fill in the details accordingly.
- Keep the last variable unchanged.

```
px=
token=
playing=
type=
CLIENT_ID=
GUILD_ID=
DP_FORCE_YTDL_MOD="@distube/ytdl-core"
```

### Explanations
- `px`: prefix (No I don't like slash commands as a user so I will never add them)
- `token`: the token of the bot available on the [Discord Developers](https://discordapp.com/developers/applications) section
- `playing`: the playing message
- `type`: activity type (Currently does nothing. Activity types were changed to enum and I am too tired to write switch cases. Edit type directly in `ready.js`)
- `CLIENT_ID`: don't remember why I added this but you can get it in the application page.
- `GUILD_ID`: same, don't remember why I added this, ignore.
- `DP_FORCE_YTDL_MOD`: forces discord-player to use @distube ytdl fork. Don't change this is required as ytdl-core has a bug currently.

<i>No need to configure the lyrics file anymore</i>

<i>Ignore the `config.js` file. Its of no use any longer.</i>

## 📑 Installation

To use the project correctly you will need some tools.

[FFmpeg](https://www.ffmpeg.org) to process audio

[Node JS](https://nodejs.org/en/) (v16.9+) for environment

NOTE : If you are on windows, you can either have ffmpeg binaries downloaded and added to path in your system or you can try using the npm package `ffmpeg-static`. But if you are on Linux, do not use the npm package, instead do the following :
- `sudo apt update`
- `sudo apt install ffmpeg`

## 🤖 Commands

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

Realized with ❤️ by ShambaC

Contact me on Discord for any help => ShambaC#3440
