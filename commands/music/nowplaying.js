const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    category: 'Music',
    utilisation: '{prefix}nowplaying',
    voiceChannel: true,
    description: 'Shows the currently playing track details with buttons',

    execute(client, message) {
        const queue = player.nodes.get(message.guild.id);

        if (!queue || !queue.node.isPlaying()) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        const track = queue.currentTrack;

        const embed = new EmbedBuilder();

        embed.setColor('Red');
        embed.setThumbnail(track.thumbnail);
        embed.setAuthor({name: track.title, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }), url: track.url})

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = queue.node.getTimestamp();
        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

        embed.setDescription(`Volume **${queue.volume}**%\nDuration **${trackDuration}**\nLoop mode **${methods[queue.repeatMode]}**\nRequested by ${track.requestedBy}`);

        embed.setTimestamp();
        embed.setFooter({text: 'Made with heart by ShambaC ❤️', iconURL: message.author.avatarURL({ dynamic: true })});

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

        const row = new ActionRowBuilder().addComponents(saveButton, nextButton, pauseButton, playButton, stopButton);

        message.channel.send({ embeds: [embed], components: [row] });
    },
};