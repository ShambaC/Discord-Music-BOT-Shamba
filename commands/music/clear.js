module.exports = {
    name: 'clear',
    aliases: ['cq'],
    category: 'Music',
    utilisation: '{prefix}clear',
    voiceChannel: true,
    description: 'Clear the queue',

    async execute(client, message) {
        const queue = player.nodes.get(message.guild.id);

        if (!queue || !queue.node.isPlaying()) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        if (!queue.tracks[0]) return message.channel.send(`No music in the queue after the current one ${message.author}... try again ? ❌`);

        await queue.tracks.clear();

        message.channel.send(`The queue has just been cleared 🗑️`);
    },
};