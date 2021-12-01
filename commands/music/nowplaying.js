const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    category: 'Music',
    utilisation: '{prefix}nowplaying',
    voiceChannel: true,
    description: 'Shows the currently playing track details with buttons',

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        const track = queue.current;

        const embed = new MessageEmbed();

        embed.setColor('RED');
        embed.setThumbnail(track.thumbnail);
        embed.setAuthor(track.title, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

        embed.setDescription(`Volume **${queue.volume}**%\nDuration **${trackDuration}**\nLoop mode **${methods[queue.repeatMode]}**\nRequested by ${track.requestedBy}`);

        embed.setTimestamp();
        embed.setFooter('Made with heart by ShambaC ❤️', message.author.avatarURL({ dynamic: true }));

        const saveButton = new MessageButton();
        saveButton.setLabel('Save this track');
        saveButton.setCustomId('saveTrack');
        saveButton.setStyle('SUCCESS');

        const nextButton = new MessageButton();
        nextButton.setLabel('⏭️');
        nextButton.setCustomId('skipButton');
        nextButton.setStyle('SECONDARY');

        const pauseButton = new MessageButton();
        pauseButton.setLabel('⏸️');
        pauseButton.setCustomId('pauseint');
        pauseButton.setStyle('SECONDARY');

        const playButton = new MessageButton();
        playButton.setLabel('▶️');
        playButton.setCustomId('playint');
        playButton.setStyle('SECONDARY');

        const stopButton = new MessageButton();
        stopButton.setLabel('⏹️');
        stopButton.setCustomId('stopint');
        stopButton.setStyle('DANGER');

        const row = new MessageActionRow().addComponents(saveButton, nextButton, pauseButton, playButton, stopButton);

        message.channel.send({ embeds: [embed], components: [row] });
    },
};