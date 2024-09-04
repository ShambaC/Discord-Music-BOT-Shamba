const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'back',
    aliases: ['previous'],
    category: 'Music',
    utilisation: '{prefix}back',
    voiceChannel: true,
    description: 'Play the previous song',

    async execute({ int }) {
        const queue = player.nodes.get(message.guild.id);

        const embed = new EmbedBuilder()
            .setColor("Red");

        if (!queue || !queue.node.isPlaying()) return int.editReply({ embeds: [embed.setAuthor({ name: `No music currently playing ${message.author}... try again ? ❌` })] });

        if (!queue.history.previousTrack) return int.editReply({ embeds: [embed.setAuthor({ name: `There was no music played before ${message.author}... try again ? ❌`})] });

        await queue.history.back();

        embed.setColor('#68f298');
        embed.setAuthor({ name: `Playing the **previous** track ✅` });

        int.editReply({ embeds: [embed] });
    },
};