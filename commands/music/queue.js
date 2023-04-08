const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'queue',
    aliases: ['q'],
    category: 'Music',
    utilisation: '{prefix}queue',
    voiceChannel: true,
    description: 'Shows the queue of tracks',

    execute(client, message) {
        const queue = player.nodes.get(message.guild.id);

        if (!queue) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        if (!queue.tracks[0]) return message.channel.send(`No music in the queue after the current one ${message.author}... try again ? ❌`);

        const embed = new EmbedBuilder();
        const methods = ['', '🔁', '🔂'];

        embed.setColor('Red');
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setAuthor({name: `Server queue - ${message.guild.name} ${methods[queue.repeatMode]}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })});

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})`);

        const songs = queue.tracks.size;
        const nextSongs = songs > 5 ? `And **${songs - 5}** other song(s)...` : `In the playlist **${songs}** song(s)...`;

        embed.setDescription(`Current ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

        embed.setTimestamp();
        embed.setFooter({text: 'Made with heart by ShambaC ❤️', iconURL: message.author.avatarURL({ dynamic: true })});

        message.channel.send({ embeds: [embed] });
    },
};