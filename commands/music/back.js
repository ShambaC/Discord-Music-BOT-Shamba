module.exports = {
    name: 'back',
    aliases: ['previous'],
    category: 'Music',
    utilisation: '{prefix}back',
    voiceChannel: true,
    description: 'Play the previous song',

    async execute(client, message) {
        const queue = player.nodes.get(message.guild.id);

        if (!queue || !queue.node.isPlaying()) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        if (!queue.previousTracks[1]) return message.channel.send(`There was no music played before ${message.author}... try again ? ❌`);

        await queue.history.back();

        message.channel.send(`Playing the **previous** track ✅`);
    },
};