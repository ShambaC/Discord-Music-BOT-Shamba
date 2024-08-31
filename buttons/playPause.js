const { ButtonBuilder, ButtonStyle, EmbedBuilder, ActionRowBuilder } = require("discord.js");
const { saveBtn } = require('./saveTrack');
const { skipBtn } = require('./skip');
const { stopBtn } = require('./stop');

const playPauseBtn = new ButtonBuilder();
playPauseBtn.setLabel("Play/Pause");
playPauseBtn.setCustomId('playPause');
playPauseBtn.setStyle(ButtonStyle.Secondary);
playPauseBtn.setEmoji(`⏯️`);

async function btnFn({ int, queue }) {
    if (!queue || !queue.node.isPlaying()) return int.reply({ content: `No music currently playing <@${int.user.id}>... try again ? ❌`, components: [] });

    const track = queue.currentTrack;
    const embed = new EmbedBuilder();
    const row = new ActionRowBuilder().addComponents(saveBtn, skipBtn, playPauseBtn, stopBtn);

    if (queue.isPaused) {
        // Resume
        const success = queue.node.resume();
            if(success) {
                queue.isPaused = false;
                
                const timestamp = queue.node.getTimestamp();
                const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

                embed.setColor('Red');
                embed.setThumbnail(track.thumbnail);
                embed.setAuthor({name: track.title, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }), url: track.url})
                embed.setDescription(`Status : Playing\nDuration : ${trackDuration}`);
                embed.setTimestamp();
                embed.setFooter({text: 'Made with ❤️ by ShambaC'});
                queue.npembed.edit({ embeds: [embed], components: [row]  });
                return 0;
            }
                    
            return int.reply({content : `Something went wrong <@${int.user.id}>... try again ? ❌`,ephemeral: true, components: [] });
    }
    else {
        // Pause
        const success = queue.node.pause();
            if(success) {
                queue.isPaused = false;
                
                const timestamp = queue.node.getTimestamp();
                const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

                embed.setColor('Red');
                embed.setThumbnail(track.thumbnail);
                embed.setAuthor({name: track.title, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }), url: track.url})
                embed.setDescription(`Status : Paused\nDuration : ${trackDuration}`);
                embed.setTimestamp();
                embed.setFooter({text: 'Made with heart by ShambaC ❤️'});
                queue.npembed.edit({ embeds: [embed], components: [row]  });
                return 0;
            }
                    
            return int.reply({content : `Something went wrong <@${int.user.id}>... try again ? ❌`,ephemeral: true, components: [] });
    }
}

module.exports = { playPauseBtn, btnFn };