const { useQueue } = require('discord-player');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const { playPauseBtn } = require('../../buttons/playPause');
const { saveBtn } = require('../../buttons/saveTrack');
const { skipBtn } = require('../../buttons/skip');
const { stopBtn } = require('../../buttons/stop');

const embed = new EmbedBuilder();
const row = new ActionRowBuilder().addComponents(saveBtn, playPauseBtn, skipBtn, stopBtn);

module.exports = {
    name: 'pause',
    category: 'Music',
    voiceChannel: true,
    description: ('Pause the track'),

    async execute({ int, client }) {
        const queue = useQueue(int.guild);

        if (!queue) return int.reply({ content: `No music currently playing ${int.member}... try again ? ❌`, ephemeral: true });
        if (queue.node.isPaused) return int.reply({ content: `The track is already paused ✅`, ephemeral: true });

        const success = queue.node.pause();

        if(success) 
        {
            queue.isPaused = true;
            const track = queue.currentTrack;
            const timestamp = queue.node.getTimestamp();
            const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

            embed.setColor('Red');
            embed.setThumbnail(track.thumbnail);
            embed.setAuthor({name: track.title, iconURL: client.user.displayAvatarURL({ size: 1024 }), url: track.url})
            embed.setDescription(`Status : Paused\nDuration : ${trackDuration}`);
            embed.setTimestamp();
            embed.setFooter({text: 'Made with ❤️ by ShambaC'});
            queue.npembed.edit({ embeds: [embed], components: [row] });
        }

        const pauseEmbed = new EmbedBuilder()
            .setColor('Red')
            .setAuthor({ name: success ? `Current music ${queue.currentTrack.title} paused ✅` : `Something went wrong ${int.member}... try again ? ❌` });

        return int.reply({ embeds: [pauseEmbed], ephemeral: false });
    },
};