const { useQueue } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'shuffle',
    category: 'Music',
    voiceChannel: true,
    description: ('Shuffle the queue order'),

    async execute({ int, client }) {
        const queue = useQueue(int.guild);

        if (!queue || !queue.node.isPlaying()) return int.reply({ content: `No music currently playing ${int.member}... try again ? ❌`, ephemeral: true });

        if (!queue.tracks.toArray()[1]) return int.reply({ content: `No music in the queue after the current one ${int.member}... try again ? ❌`, ephemeral: true });

        await queue.tracks.shuffle();

        const embed = new EmbedBuilder()
            .setColor('#68f298')
            .setAuthor({ name: `Queue shuffled **${queue.tracks.length}** song(s) ! ✅` });

        return int.reply({ embeds: [embed], ephemeral: false });
    },
};