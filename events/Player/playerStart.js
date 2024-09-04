const { EmbedBuilder, ActionRowBuilder } = require("discord.js");

const { playPauseBtn } = require('../../buttons/playPause');
const { saveBtn } = require('../../buttons/saveTrack');
const { skipBtn } = require('../../buttons/skip');
const { stopBtn } = require('../../buttons/stop');

module.exports = (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode == 'TRACK') return;

    (async () => {
        const timestamp = queue.node.getTimestamp();
        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

        const embed = new EmbedBuilder();
        const row = new ActionRowBuilder().addComponents(saveBtn, playPauseBtn, skipBtn, stopBtn);

        embed.setColor('Red');
        embed.setThumbnail(track.thumbnail);
        embed.setAuthor({name: track.title, iconURL: client.user.displayAvatarURL({ size: 1024 }), url: track.url})

        if(queue.isPaused)
            {
                embed.setDescription(`Status : Paused\nDuration : ${trackDuration}`);
            }
            else
            {
                embed.setDescription(`Status : Playing\nDuration : ${trackDuration}`);
            }

        embed.setTimestamp();
        embed.setFooter({text: 'Made with ❤️ by ShambaC'});

        if(!queue.play_embed_send)
        {
            if(queue.npembed) queue.npembed.delete();
            queue.npembed = await queue.metadata.send({ embeds: [embed], components: [row]  });
            queue.play_embed_send = true;
        }
        else
        {          
            queue.npembed.edit({ embeds: [embed], components: [row]  });
            queue.play_embed_send = false;
        }
    })()
}