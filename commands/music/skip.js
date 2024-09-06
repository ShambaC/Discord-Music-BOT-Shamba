const { useQueue } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'skip',
    category: 'Music',
    voiceChannel: true,
    description: ('Skips the current song'),

    async execute({ int, client }) {
        const queue = useQueue(int.guild);

        if (!queue) return int.reply({ content: `No music currently playing ${int.member}... try again ? ❌`, ephemeral: true });

        const success = queue.node.skip();

        const embed = new EmbedBuilder()
            .setColor('#68f298')
            .setAuthor({ name: success ? `Current music ${queue.currentTrack.title} skipped ✅` : `Something went wrong ${int.member}... try again ? ❌` });

        return int.reply({ embeds: [embed], ephemeral: false });
    },
};