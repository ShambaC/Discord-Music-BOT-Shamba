const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const embed = new EmbedBuilder();

const saveButton = new ButtonBuilder();
saveButton.setLabel('Save this track');
saveButton.setCustomId('saveTrack');
saveButton.setStyle(ButtonStyle.Success);

const nextButton = new ButtonBuilder();
nextButton.setLabel('Skip');
nextButton.setCustomId('skipButton');
nextButton.setStyle(ButtonStyle.Secondary);
nextButton.setEmoji('⏭️');

const pauseButton = new ButtonBuilder();
pauseButton.setLabel('Pause');
pauseButton.setCustomId('pauseint');
pauseButton.setStyle(ButtonStyle.Secondary);
pauseButton.setEmoji('⏸️');

const playButton = new ButtonBuilder();
playButton.setLabel('Resume');
playButton.setCustomId('playint');
playButton.setStyle(ButtonStyle.Secondary);
playButton.setEmoji('▶️');

const stopButton = new ButtonBuilder();
stopButton.setLabel('Stop');
stopButton.setCustomId('stopint');
stopButton.setStyle(ButtonStyle.Danger);
stopButton.setEmoji('⏹️');

const row1 = new ActionRowBuilder().addComponents(saveButton, nextButton, playButton, stopButton);
const row2 = new ActionRowBuilder().addComponents(saveButton, nextButton, pauseButton, stopButton);

module.exports = (client, int) => {
    if (!int.isButton()) return;

    const queue = player.nodes.get(int.guildId);
    const track = queue.currentTrack;

    switch (int.customId) {
        case 'saveTrack': {
            if (!queue || !queue.node.isPlaying()) return int.reply({ content: `No music currently playing <@${int.user.id}>... try again ? ❌`,ephemeral: true, components: [] });

            int.member.send(`You saved the track ${queue.currentTrack.title} | ${queue.currentTrack.author} from the server ${int.member.guild.name} ✅`).then(() => {
                return int.reply({ content: `I have sent you the title of the music by private messages <@${int.user.id}> ✅`,ephemeral: true, components: [] });
            }).catch(error => {
                return int.reply({ content: `Unable to send you a private message <@${int.user.id}>... try again ? ❌`,ephemeral: true, components: [] });
            });
            break;
        }
        case 'skipButton': {
            if (!queue || !queue.node.isPlaying()) return int.reply({content: `No music currently playing <@${int.user.id}>... try again ? ❌`, components: [] });

            const success = queue.node.skip();

            return int.reply(success ? {content : `Current music ${queue.currentTrack.title} skipped ✅`,ephemeral: true, components: [] } : {content :  `Something went wrong <@${int.user.id}>... try again ? ❌`,ephemeral: true, components: [] });
            break;
        }
        case 'pauseint': {
            if (!queue || !queue.node.isPlaying()) return int.reply({ content: `No music currently playing <@${int.user.id}>... try again ? ❌`, components: [] });
                   
            const success = queue.node.pause();
            if(success)
            {
                queue.isPaused = true;
                const timestamp = queue.node.getTimestamp();
                const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

                embed.setColor('Red');
                embed.setThumbnail(track.thumbnail);
                embed.setAuthor({name: track.title, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }), url: track.url})
                embed.setDescription(`Status : Paused\nDuration : ${trackDuration}`);
                embed.setTimestamp();
                embed.setFooter({text: 'Made with heart by ShambaC ❤️'});
                queue.npembed.edit({ embeds: [embed], components: [row1]  });
                return 0;
            }
                
            return int.reply({content : `Something went wrong <@${int.user.id}>... try again ? ❌`,ephemeral: true, components: [] });
            
            break;
        }
        case 'playint': {
            if (!queue) return int.reply({ content: `No music currently playing <@${int.user.id}>... try again ? ❌`, components: [] });
                   
            const success = queue.node.resume();
            if(success)
            {
                queue.isPaused = false;
                const timestamp = queue.node.getTimestamp();
                const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

                embed.setColor('Red');
                embed.setThumbnail(track.thumbnail);
                embed.setAuthor({name: track.title, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }), url: track.url})
                embed.setDescription(`Status : Playing\nDuration : ${trackDuration}`);
                embed.setTimestamp();
                embed.setFooter({text: 'Made with heart by ShambaC ❤️'});
                queue.npembed.edit({ embeds: [embed], components: [row2]  });
                return 0;
            }
                
            return int.reply({content : `Something went wrong <@${int.user.id}>... try again ? ❌`,ephemeral: true, components: [] });
            
            break;
        }
        case 'stopint': {
            if (!queue || !queue.node.isPlaying()) return int.reply({ content: `No music currently playing <@${int.user.id}>... try again ? ❌`, components: [] });

            if(queue.npembed) queue.npembed.delete();
            queue.npembed = null;
            queue.delete();

            return int.reply({ content: `Music stopped into this server, see you next time ✅`, components: [] });
            
            break;
        }
    }
}; 