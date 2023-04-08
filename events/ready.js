const{ ActivityType } = require('discord.js')

module.exports = async (client) => {
    console.log(`Logged to the client ${client.user.username}\n-> Ready on ${client.guilds.cache.size} servers for a total of ${client.users.cache.size} users`);

    client.user.setPresence({
        activities: [{name: process.env.playing, type: ActivityType.Playing}]
    })
    client.user.setStatus('online')
};