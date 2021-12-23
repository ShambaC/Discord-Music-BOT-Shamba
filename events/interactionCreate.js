const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const embed = new MessageEmbed();

const saveButton = new MessageButton();
saveButton.setLabel('Save this track');
saveButton.setCustomId('saveTrack');
saveButton.setStyle('SUCCESS');

const nextButton = new MessageButton();
nextButton.setLabel('Skip');
nextButton.setCustomId('skipButton');
nextButton.setStyle('SECONDARY');
nextButton.setEmoji('⏭️');

const pauseButton = new MessageButton();
pauseButton.setLabel('Pause');
pauseButton.setCustomId('pauseint');
pauseButton.setStyle('SECONDARY');
pauseButton.setEmoji('⏸️');

const playButton = new MessageButton();
playButton.setLabel('Resume');
playButton.setCustomId('playint');
playButton.setStyle('SECONDARY');
playButton.setEmoji('▶️');

const stopButton = new MessageButton();
stopButton.setLabel('Stop');
stopButton.setCustomId('stopint');
stopButton.setStyle('DANGER');
stopButton.setEmoji('⏹️');

const row1 = new MessageActionRow().addComponents(saveButton, nextButton, playButton, stopButton);
const row2 = new MessageActionRow().addComponents(saveButton, nextButton, pauseButton, stopButton);

module.exports = (client, int) => {
    if (!int.isButton()) return;

    const queue = player.getQueue(int.guildId);

    switch (int.customId) {
        case 'saveTrack': {
            if (!queue || !queue.playing) return int.reply({ content: `No music currently playing <@${int.user.id}>... try again ? ❌`,ephemeral: true, components: [] });

            int.member.send(`You saved the track ${queue.current.title} | ${queue.current.author} from the server ${int.member.guild.name} ✅`).then(() => {
                return int.reply({ content: `I have sent you the title of the music by private messages <@${int.user.id}> ✅`,ephemeral: true, components: [] });
            }).catch(error => {
                return int.reply({ content: `Unable to send you a private message <@${int.user.id}>... try again ? ❌`,ephemeral: true, components: [] });
            });
            break;
        }
        case 'skipButton': {
            if (!queue || !queue.playing) return int.reply({content: `No music currently playing <@${int.user.id}>... try again ? ❌`, components: [] });

            const success = queue.skip();

            return int.reply(success ? {content : `Current music ${queue.current.title} skipped ✅`,ephemeral: true, components: [] } : {content :  `Something went wrong <@${int.user.id}>... try again ? ❌`,ephemeral: true, components: [] });
            break;
        }
        case 'pauseint': {
            if (!queue || !queue.playing) return int.reply({ content: `No music currently playing <@${int.user.id}>... try again ? ❌`, components: [] });
                   
            const success = queue.setPaused(true);
            if(success)
            {
                queue.isPaused = true;
                const timestamp = queue.getPlayerTimestamp();
                const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

                embed.setColor('RED');
                embed.setThumbnail(track.thumbnail);
                embed.setAuthor(track.title, client.user.displayAvatarURL({ size: 1024, dynamic: true }), track.url);
                embed.setDescription(`Status : Paused\nDuration : ${trackDuration}`);
                embed.setTimestamp();
                embed.setFooter('Made with heart by ShambaC ❤️');
                queue.npembed.edit({ embeds: [embed], components: [row1]  });
                return 0;
            }
                
            return int.reply({content : `Something went wrong <@${int.user.id}>... try again ? ❌`,ephemeral: true, components: [] });
            
            break;
        }
        case 'playint': {
            if (!queue || !queue.playing) return int.reply({ content: `No music currently playing <@${int.user.id}>... try again ? ❌`, components: [] });
                   
            const success = queue.setPaused(false);
            if(success)
            {
                queue.isPaused = false;
                const timestamp = queue.getPlayerTimestamp();
                const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

                embed.setColor('RED');
                embed.setThumbnail(track.thumbnail);
                embed.setAuthor(track.title, client.user.displayAvatarURL({ size: 1024, dynamic: true }), track.url);
                embed.setDescription(`Status : Playing\nDuration : ${trackDuration}`);
                embed.setTimestamp();
                embed.setFooter('Made with heart by ShambaC ❤️');
                queue.npembed.edit({ embeds: [embed], components: [row2]  });
                return 0;
            }
                
            return int.reply({content : `Something went wrong <@${int.user.id}>... try again ? ❌`,ephemeral: true, components: [] });
            
            break;
        }
        case 'stopint': {
            if (!queue || !queue.playing) return int.reply({ content: `No music currently playing <@${int.user.id}>... try again ? ❌`, components: [] });

            if(queue.npembed) queue.npembed.delete();
            queue.destroy();

            return int.reply({ content: `Music stopped into this server, see you next time ✅`, components: [] });
            
            break;
        }
    }
}; 