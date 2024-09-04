const { useQueue } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'clear',
    category: 'Music',
    voiceChannel: true,
    description: ('Clear the queue'),

    async execute({ int, client }) {
        const queue = useQueue(int.guild);

        if (!queue || !queue.node.isPlaying()) return int.editReply({ content: `No music currently playing ${int.member}... try again ? ❌` });

        if (!queue.tracks.toArray()[1]) return int.editReply({ content: `No music in the queue after the current one ${int.member}... try again ? ❌` });

        queue.tracks.clear();

        const embed = new EmbedBuilder()
            .setColor('#68f298')
            .setAuthor({ name: `The queue has just been cleared 🗑️` });

        int.editReply({ embeds: [embed] });
    },
};