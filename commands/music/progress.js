module.exports = {
    name: 'progress',
    aliases: ['pbar'],
    category: 'Music',
    utilisation: '{prefix}progress',
    voiceChannel: true,
    description: 'Shows the current timestamp of the track as a bar',

    async execute(client, message) {
        const queue = player.nodes.get(message.guild.id);

        if (!queue || !queue.node.isPlaying()) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        const progress = queue.node.createProgressBar();
        const timestamp = queue.node.getTimestamp();

        if (timestamp.progress == 'Infinity') return message.channel.send(`Playing a live, no data to display 🎧`);

        message.channel.send(`${progress} (**${timestamp.progress}**%)`);
    },
};