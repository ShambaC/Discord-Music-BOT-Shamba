const { Player } = require('discord-player');
const { Client, GatewayIntentBits } = require('discord.js');
const { YoutubeiExtractor } = require('discord-player-youtubei');

global.client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
    ],
    disableMentions: 'everyone',
});

client.config = require('./config');

require("dotenv").config();

const player = new Player(client, client.config.opt.discordPlayer);
player.extractors.register(YoutubeiExtractor, {
    authentication: process.env.YTtoken
});
player.extractors.loadDefault((ext) => !['YouTubeExtractor'].includes(ext));

require('./loader');

client.login(process.env.token);