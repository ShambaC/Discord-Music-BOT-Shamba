const { useQueue } = require("discord-player");
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'remove',
    category: 'Music',
    voiceChannel: true,
    description: 'Remove a particular track from queue',
    options: [
        {
            name: 'song',
            description: ('The posiiton of the song in the queue that you want to remove'),
            type: ApplicationCommandOptionType.Integer,
            min_value: 0,
            required: false
        }
    ],

    async execute({ int, client }) {
        const queue = useQueue(int.guild);

        if (!queue) return int.reply({ content: `No music currently playing ${int.member}... try again ? ❌`, ephemeral: true });

        if (!queue.tracks.toArray()[1]) return int.reply({ content: `No music in the queue after the current one ${int.member}... try again ? ❌`, ephemeral: true });

        const songNum = int.getInteger('song');
        if(songNum > queue.tracks.size) return int.reply({ content: `No music in the queue after the current one ${message.author}... try again ? ❌`, ephemeral: true })

        queue.node.remove(songNum - 1);

        const embed = new EmbedBuilder()
            .setColor('#68f298')
            .setAuthor({ name: `Removed song at queue position ${songNum} 🗑️` });

        int.reply({ embeds: [embed], ephemeral: false });
    },
}; 