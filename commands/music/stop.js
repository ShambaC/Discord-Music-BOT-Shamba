const { useQueue } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'stop',
    category: 'Music',
    voiceChannel: true,
    description: ('Stops and disconnects the BOT'),

    execute({ int, client }) {
        const queue = useQueue(int.guild);

        if (!queue || !queue.node.isPlaying()) return int.reply({ content: `No music currently playing ${int.member}... try again ? ❌`, ephemeral: true });

        if(!queue.deleted)
        {
            queue.play_embed_send = false;
            if(queue.npembed) queue.npembed.delete();
            queue.npembed = null;
            queue.delete();
        }

        const embed = new EmbedBuilder()
            .setColor('#68f298')
            .setAuthor({ name: `Music stopped into this server, see you next time ✅` });

        int.reply({ embeds: [embed], ephemeral: false });
    },
};