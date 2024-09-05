const { EmbedBuilder } = require("@discordjs/builders");
const { useQueue } = require("discord-player");

module.exports = {
    name: 'progress',
    category: 'Music',
    voiceChannel: true,
    description: ('Shows the current timestamp of the track as a bar'),

    async execute({ int, client }) {
        const queue = useQueue(int.guild);

        if (!queue || !queue.node.isPlaying()) return int.reply({ content: `No music currently playing ${int.member}... try again ? ❌`, ephemeral: true });

        const progress = queue.node.createProgressBar();
        const timestamp = queue.node.getTimestamp();

        if (timestamp.progress == 'Infinity') return int.reply({ content: `Playing a live, no data to display 🎧`, ephemeral: true });

        const embed = new EmbedBuilder()
            .setColor('Red')
            .setAuthor({ name: `${progress} (**${timestamp.progress}**%)` });

        int.reply({ embeds: [embed], ephemeral: false });
    },
};