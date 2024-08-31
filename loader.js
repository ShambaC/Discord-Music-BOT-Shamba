const { readdirSync } = require('fs');
const { Collection } = require('discord.js');
const { useMainPlayer } = require('discord-player');

client.commands = new Collection();
const commandArray = [];
const player = useMainPlayer();

const discordEvents = readdirSync("./events/Discord/").filter((file) => {
    file.endsWith(".js");
});
const playerEvents = readdirSync("./events/Player/").filter((file) => {
    file.endsWith(".js");
});

for (const file of discordEvents) {
    const DiscordEvent = require('./events/Discord/${file}');
    const txtEvent = `< -> > [Loaded Discord Event] <${file.split(".")[0]}>`;
    console.log(txtEvent);
    client.on(file.split(".")[0], DiscordEvent.bind(null, client));
    delete require.cache[require.resolve(`./events/Discord/${file}`)];
}

for (const file of playerEvents) {
    const PlayerEvent = require('./events/Player/${file}');
    const txtEvent = `< -> > [Loaded Player Event] <${file.split(".")[0]}>`;
    console.log(txtEvent);
    player.events.on(file.split(".")[0], DiscordEvent.bind(null, client));
    delete require.cache[require.resolve(`./events/Player/${file}`)];
}

readdirSync("./commands/").forEach((dirs) => {
    const commands = readdirSync(`./commands/${dirs}`).filter((file) => {
        file.endsWith(".js");
    });

    
})