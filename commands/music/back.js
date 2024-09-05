const { useQueue } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'back',
    category: 'Music',
    voiceChannel: true,
    description: ('Play the previous song'),

    async execute({ int, client }) {
        const queue = useQueue(int.guild);

        const embed = new EmbedBuilder()
            .setColor("Red");

        if (!queue || !queue.node.isPlaying()) return int.reply({ embeds: [embed.setAuthor({ name: `No music currently playing ${message.author}... try again ? ❌` })], ephemeral: true });

        if (!queue.history.previousTrack) return int.reply({ embeds: [embed.setAuthor({ name: `There was no music played before ${message.author}... try again ? ❌`})], ephemeral: true });

        await queue.history.back();

        embed.setColor('#68f298');
        embed.setAuthor({ name: `Playing the **previous** track ✅` });

        int.reply({ embeds: [embed], ephemeral: false });
    },
};