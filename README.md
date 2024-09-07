# 🎵 Music-bot v2

A complete code to download for a music bot 🎧

Looking for a code for a music bot ? This fully open source code is made for your project !

You can try out the BOT by inviting it to your server [here](https://discord.com/oauth2/authorize?client_id=507874682242990081)

This Project was made with a fork of Zerio Dev's [Music BOT](https://github.com/ZerioDev/Music-bot).

Updated to add slash commands (Yes, I folded under 0 pressure)

## 📸 Screenshots
![image](https://github.com/user-attachments/assets/97116182-b368-4ff5-953e-f9e6538f5f44)

![image](https://github.com/user-attachments/assets/19ba836b-99a6-4b20-a995-d7574213f41f)

## ⚡ Configuration

Setup the environment file.
- Copy the `.env.example` file and rename it to `.env`
- Edit the file and fill in the details accordingly.
- Keep the last variable unchanged.

```
token=
playing=
type=
CLIENT_ID=
GUILD_ID=
YTtoken=
```

### Explanations
- `token`: the token of the bot available on the [Discord Developers](https://discordapp.com/developers/applications) section
- `playing`: the playing message
- `type`: activity type (Currently does nothing. Activity types were changed to enum and I am too tired to write switch cases. Edit type directly in `ready.js`)
- `CLIENT_ID`: don't remember why I added this but you can get it in the application page.
- `GUILD_ID`: same, don't remember why I added this, ignore.
- `YTtoken`: You need to paste your youtube authentication token here. Run this command: `npx --no discord-player-youtubei` and follow the instructions on your terminal. Use a dummy account. <b>Paste the whole generated string.</b>

## 📑 Installation

To use the project correctly you will need some tools.

[FFmpeg](https://www.ffmpeg.org) to process audio

[Node JS](https://nodejs.org/en/) (v18+) for environment

NOTE : If you are on windows, you can either have ffmpeg binaries downloaded and added to path in your system or you can try using the npm package `ffmpeg-static`. But if you are on Linux, do not use the npm package, instead do the following :
- `sudo apt update`
- `sudo apt install ffmpeg`

## 🤖 Commands

|       Name       | Description                                                        | Options              |
|:----------------:|--------------------------------------------------------------------|----------------------|
| about            | Show info about the bot                                            |                      |
| help             | Show the help embed                                                | none, command name   |
| invite           | Invite link for the bot                                            |                      |
| ping             | Check the ping of the BOT                                          |                      |
| back             | Play the previous song                                             |                      |
| clear            | Clear the queue                                                    |                      |
| filter           | Apply filters to the current queue                                 | filter name          |
| loop             | Loop the queue or current track                                    | none, queue          |
| lyrics           | Displays the lyrics of the current track or the track you searched | none, search term    |
| nowplaying       | Shows the currently playing track details with buttons             |                      |
| pause            | Pause the track                                                    |                      |
| play             | Play a song with URL or search term                                | URL, search term     |
| playfile         | Play the file attached to this command                             |                      |
| progress         | Shows the current timestamp of the track as a bar                  |                      |
| queue            | Shows the queue of tracks                                          |                      |
| remove           | Remove a particular track from queue                               | track number         |
| resume           | Resumes the track                                                  |                      |
| save             | Saves the name of the track to user's DMs                          |                      |
| seek             | Seek to a part of track                                            | Timestamp            |
| shuffle          | Shuffle the queue order                                            |                      |
| skip             | Skips the current song                                             |                      |
| stop             | Stops and disconnects the BOT                                      |                      |
| volume           | Set internal volume of the BOT                                     | value                |

- `search` command was removed as it is now integrated into the play command.
- Added `autoplay` to loop options to play similar songs when the queue ends.

Without forgetting of course the code editor ^^

Realized with ❤️ by ShambaC

Contact me on Discord for any help => ShambaC#3440
