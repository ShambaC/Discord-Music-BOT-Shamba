module.exports = {
    name: 'skip',
    aliases: ['sk'],
    category: 'Music',
    utilisation: '{prefix}skip',
    voiceChannel: true,
    description: 'Skips the current song',

    execute(client, message) {
        const queue = player.nodes.get(message.guild.id);

        if (!queue || !queue.node.isPlaying()) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        const success = queue.node.skip();

        return message.channel.send(success ? `Current music ${queue.currentTrack.title} skipped ✅` : `Something went wrong ${message.author}... try again ? ❌`);
    },
};