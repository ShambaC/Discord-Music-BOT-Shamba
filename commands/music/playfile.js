const { QueryType, useMainPlayer } = require('discord-player');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'playfile',
    category: 'Music',
    voiceChannel: true,
    description: ('Play the file attached to this command message'),
    options: [
        {
            name: 'file',
            description: ('file you want to play'),
            required: true,
            type: ApplicationCommandOptionType.Attachment
        }
    ],

    async execute({ int, client }) {

        var attached_song = int.options.getAttachment('file');

        var attached_song_url = attached_song.url;
        const player = useMainPlayer()

        const res = await player.search(attached_song_url, {
            requestedBy: int.member,
            searchEngine: QueryType.AUTO
        });

        const embed = new EmbedBuilder()
            .setColor('Red');

        if (!res || !res.tracks.length) return int.reply({ embeds: [embed.setAuthor({ name: `Not a valid file ${int.member}... try again ? ❌` })], ephemeral: true });

        const queue = await player.nodes.create(int.guild, {
            metadata: int.channel,
            play_embed_send: false,
            npembed: null,
            isPaused: false,
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        });
        

        try {
            if (!queue.connection) await queue.connect(int.member.voice.channel);
        } catch {
            await player.deleteQueue(message.guild.id);
            return int.reply({ embeds: [embed.setAuthor({ name: `I can't join the voice channel ${int.member}... try again ? ❌` })], ephemeral: true });
        }

        await int.reply({ embeds: [embed.setAuthor({ name: `Loading your ${res.playlist ? 'playlist' : 'track'}... 🎧` })], ephemeral: false });

        res.playlist ? queue.addTrack(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.node.isPlaying()) await queue.node.play();
    },
};