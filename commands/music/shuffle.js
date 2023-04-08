module.exports = {
    name: 'shuffle',
    aliases: ['sh'],
    category: 'Music',
    utilisation: '{prefix}shuffle',
    voiceChannel: true,
    description: 'Shuffle the queue order',

    async execute(client, message) {
        const queue = player.nodes.get(message.guild.id);

        if (!queue || !queue.node.isPlaying()) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        if (!queue.tracks[0]) return message.channel.send(`No music in the queue after the current one ${message.author}... try again ? ❌`);

        await queue.tracks.shuffle();

        return message.channel.send(`Queue shuffled **${queue.tracks.length}** song(s) ! ✅`);
    },
};