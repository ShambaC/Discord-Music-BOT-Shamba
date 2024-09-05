const { readdirSync } = require('fs');
const { Collection } = require('discord.js');
const { useMainPlayer } = require('discord-player');

client.commands = new Collection();
const commandsArray = [];
const player = useMainPlayer();

const discordEvents = readdirSync("./events/Discord/").filter((file) => {
    return file.endsWith(".js");
});
const playerEvents = readdirSync("./events/Player/").filter((file) => {
    return file.endsWith(".js");
});

for (const file of discordEvents) {
    const DiscordEvent = require(`./events/Discord/${file}`);
    const txtEvent = `< -> > [Loaded Discord Event] <${file.split(".")[0]}>`;
    console.log(txtEvent);
    client.on(file.split(".")[0], DiscordEvent.bind(null, client));
    delete require.cache[require.resolve(`./events/Discord/${file}`)];
}

for (const file of playerEvents) {
    const PlayerEvent = require(`./events/Player/${file}`);
    const txtEvent = `< -> > [Loaded Player Event] <${file.split(".")[0]}>`;
    console.log(txtEvent);
    player.events.on(file.split(".")[0], PlayerEvent.bind(null, client));
    delete require.cache[require.resolve(`./events/Player/${file}`)];
}

readdirSync("./commands/").forEach((dirs) => {
    const commands = readdirSync(`./commands/${dirs}`).filter((file) => {
        return file.endsWith(".js");
    });

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        if (command.name && command.description) {
            commandsArray.push(command);
            const txtEvent = `< -> > [Loaded Command] <${command.name.toLowerCase()}>`;
            console.log(txtEvent);
            client.commands.set(command.name.toLowerCase(), command);
            delete require.cache[require.resolve(`./commands/${dirs}/${file}`)];
        }
        else {
            const txtEvent = `< -> > [Failed Command] <${command.name.toLowerCase()}>`;
            console.log(txtEvent);
        }
    }
});

client.on("ready", (client) => {
    // client.application.commands.set(commandsArray);

    client.guilds.cache.get('1048076055874916512').commands.set(commandsArray);
});