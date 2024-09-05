const { useQueue } = require('discord-player');
const { EmbedBuilder, ActionRowBuilder} = require('discord.js');

const { playPauseBtn } = require('../../buttons/playPause');
const { saveBtn } = require('../../buttons/saveTrack');
const { skipBtn } = require('../../buttons/skip');
const { stopBtn } = require('../../buttons/stop');

module.exports = {
    name: 'nowplaying',
    category: 'Music',
    voiceChannel: true,
    description: ('Shows the currently playing track details with buttons'),

    async execute({ int, client }) {
        const queue = useQueue(int.guild);

        if (!queue || !queue.node.isPlaying()) return int.reply({ content: `No music currently playing ${int.member}... try again ? ❌`, ephemeral: true });

        const track = queue.currentTrack;

        const embed = new EmbedBuilder();

        embed.setColor('Red');
        embed.setThumbnail(track.thumbnail);
        embed.setAuthor({name: track.title, iconURL: client.user.displayAvatarURL({ size: 1024 }), url: track.url})

        const methods = ['disabled', 'track', 'queue', 'autoplay'];

        const timestamp = queue.node.getTimestamp();
        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

        const progress = queue.node.createProgressBar();

        embed.setDescription(`Volume **${queue.node.volume}**%\nDuration **${trackDuration}**\nProgress ${progress}\nLoop mode **${methods[queue.repeatMode]}**\nRequested by ${track.requestedBy}`);

        embed.setTimestamp();
        embed.setFooter({text: 'Made with ❤️ by ShambaC', iconURL: int.user.avatarURL()});

        const row = new ActionRowBuilder().addComponents(saveBtn, playPauseBtn, skipBtn, stopBtn);

        int.reply({ embeds: [embed], components: [row], ephemeral: false });
    },
};