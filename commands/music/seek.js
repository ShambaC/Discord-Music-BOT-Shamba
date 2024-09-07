const { useQueue } = require('discord-player');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'seek',
    category: 'Music',
    voiceChannel: true,
    description: ('Seek to a part of track'),
    options: [
        {
            name: 'time',
            description: ('Time to skip to, can be in any format'),
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    async execute({ int, client }) {
        const queue = useQueue(int.guild);

        if (!queue) return int.reply({ content: `No music currently playing ${int.member}... try again ? ❌`, ephemeral: true });

        const seekTime = int.options.getString('time');
        const timeToMS = ms(seekTime);
                
        if (timeToMS >= queue.currentTrack.durationMS) return int.reply({ content: `The indicated time is higher than the total time of the current song ${int.member}... try again ? ❌\n*Try for example a valid time like **5s, 10s, 20 seconds, 1m**...*`, ephemeral: true });

        await queue.seek(timeToMS);

        const embed = new EmbedBuilder()
            .setColor('#68f298')
            .setAuthor({ name: `Time set on the current song **${ms(timeToMS, { long: true })}** ✅` });

        int.reply({ embeds: [embed], ephemeral: false });
    },
};