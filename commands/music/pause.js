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

const row = new ActionRowBuilder().addComponents(saveButton, nextButton, playButton, stopButton);

module.exports = {
    name: 'pause',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}pause',
    voiceChannel: true,
    description: 'Pause the track',

    execute(client, message) {
        const queue = player.nodes.get(message.guild.id);

        if (!queue) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        const success = queue.node.pause();

        if(success) 
        {
            queue.isPaused = true;
            const track = queue.currentTrack;
            const timestamp = queue.node.getTimestamp();
            const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

            embed.setColor('Red');
            embed.setThumbnail(track.thumbnail);
            embed.setAuthor({name: track.title, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }), url: track.url})
            embed.setDescription(`Status : Paused\nDuration : ${trackDuration}`);
            embed.setTimestamp();
            embed.setFooter({text: 'Made with heart by ShambaC ❤️'});
            queue.npembed.edit({ embeds: [embed], components: [row]  });
        }

        return message.channel.send(success ? `Current music ${queue.currentTrack.title} paused ✅` : `Something went wrong ${message.author}... try again ? ❌`);
    },
};