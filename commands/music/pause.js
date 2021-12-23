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

const row = new MessageActionRow().addComponents(saveButton, nextButton, playButton, stopButton);

module.exports = {
    name: 'pause',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}pause',
    voiceChannel: true,
    description: 'Pause the track',

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        const success = queue.setPaused(true);

        if(success) 
        {
            queue.isPaused = true;
            const track = queue.current;
            const timestamp = queue.getPlayerTimestamp();
            const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

            embed.setColor('RED');
            embed.setThumbnail(track.thumbnail);
            embed.setAuthor(track.title, client.user.displayAvatarURL({ size: 1024, dynamic: true }), track.url);
            embed.setDescription(`Status : Paused\nDuration : ${trackDuration}`);
            embed.setTimestamp();
            embed.setFooter('Made with heart by ShambaC ❤️');
            queue.npembed.edit({ embeds: [embed], components: [row]  });
        }

        return message.channel.send(success ? `Current music ${queue.current.title} paused ✅` : `Something went wrong ${message.author}... try again ? ❌`);
    },
};