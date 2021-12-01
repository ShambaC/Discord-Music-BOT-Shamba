module.exports = {
    name: 'progress',
    aliases: ['pbar'],
    category: 'Music',
    utilisation: '{prefix}progress',
    voiceChannel: true,
    description: 'Shows the current timestamp of the track as a bar',

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();

        if (timestamp.progress == 'Infinity') return message.channel.send(`Playing a live, no data to display 🎧`);

        message.channel.send(`${progress} (**${timestamp.progress}**%)`);
    },
};