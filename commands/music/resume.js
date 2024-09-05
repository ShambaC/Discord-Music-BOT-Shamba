const { EmbedBuilder, ActionRowBuilder } = require('discord.js');

const { playPauseBtn } = require('../../buttons/playPause');
const { saveBtn } = require('../../buttons/saveTrack');
const { skipBtn } = require('../../buttons/skip');
const { stopBtn } = require('../../buttons/stop');
const { useQueue } = require('discord-player');

const embed = new EmbedBuilder();
const row = new ActionRowBuilder().addComponents(saveBtn, playPauseBtn, skipBtn, stopBtn);

module.exports = {
    name: 'resume',
    category: 'Music',
    voiceChannel: true,
    description: ('Resumes the track'),

    async execute({ int, client }) {
        const queue = useQueue(int.guild);

        if (!queue) return int.reply({ content: `No music currently playing ${int.member}... try again ? ❌`, ephemeral: true });

        const success = queue.node.resume();
        if(success)
            {
                queue.isPaused = false;
                const track = queue.currentTrack;
                const timestamp = queue.node.getTimestamp();
                const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

                embed.setColor('Red');
                embed.setThumbnail(track.thumbnail);
                embed.setAuthor({name: track.title, iconURL: client.user.displayAvatarURL({ size: 1024 }), url: track.url})
                embed.setDescription(`Status : Playing\nDuration : ${trackDuration}`);
                embed.setTimestamp();
                embed.setFooter({text: 'Made with ❤️ by ShambaC'});
                queue.npembed.edit({ embeds: [embed], components: [row]  });
            }

        const resumeEmbed = new EmbedBuilder()
            .setColor('Red')
            .setAuthor({ name: success ? `Current music ${queue.currentTrack.title} resumed ✅` : `Something went wrong ${int.member}... try again ? ❌` });

        return int.reply({ embeds: [resumeEmbed], ephemeral: false });
    },
};