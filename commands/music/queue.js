const { useQueue } = require('discord-player');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'queue',
    category: 'Music',
    voiceChannel: true,
    description: ('Shows the queue of tracks'),

    async execute({ int, client }) {
        const queue = useQueue(int.guild);

        if (!queue) return int.reply({ content: `No music currently playing ${int.member}... try again ? ❌`, ephemeral: true });

        if (!queue.tracks.toArray()[0]) return int.reply({ content: `No music in the queue after the current one ${int.member}... try again ? ❌`, ephemeral: true });

        const embed = new EmbedBuilder();
        const methods = ['', '🔁', '🔂', '🔴'];

        embed.setColor('Red');
        embed.setThumbnail(int.guild.iconURL({ size: 2048 }));
        embed.setAuthor({name: `Server queue - ${int.guild.name} ${methods[queue.repeatMode]}`, iconURL: client.user.displayAvatarURL({ size: 1024 })});

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})`);

        const songs = queue.tracks.size;
        const nextSongs = songs > 5 ? `And **${songs - 5}** other song(s)...` : `In the playlist **${songs}** song(s)...`;

        embed.setDescription(`Current ${queue.currentTrack.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

        embed.setTimestamp();
        embed.setFooter({text: 'Made with ❤️ by ShambaC', iconURL: int.user.avatarURL()});

        int.reply({ embeds: [embed], ephemeral: false });
    },
};