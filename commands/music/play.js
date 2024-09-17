const { QueryType, useMainPlayer } = require('discord-player');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'play',
    category: 'Music',
    voiceChannel: true,
    description: ('Play a song with URL or search term'),
    options: [
        {
            name: 'song',
            description: ('Search terms or link'),
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
        }
    ],

    async autocomplete({ int, client }) {
        const focusedValue = int.options.getFocused();
        if (focusedValue === "") return;
        const player = useMainPlayer();

        const res = await player.search(focusedValue, {
            requestedBy: int.member,
            searchEngine: QueryType.AUTO,
        });

        await int.respond(
            res.tracks.map(track => ({ name: track.title, value: track.url })).splice(0, 8),
        );
    },

    async execute({ int, client }) {
        const songArg = int.options.getString('song');
        const player = useMainPlayer();

        const res = await player.search(songArg, {
            requestedBy: int.member,
            searchEngine: QueryType.AUTO,
        });

        const embed = new EmbedBuilder()
            .setColor('Red');

        if (!res || !res.tracks.length) return int.reply({ embeds: [embed.setAuthor({ name: `No results found ${int.member}... try again ? ❌` })], ephemeral: true });

        const queue = player.nodes.create(int.guild, {
            metadata: int.channel,
            play_embed_send: false,
            npembed: null,
            isPaused: false,
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            },
        });

        try {
            if (!queue.connection) await queue.connect(int.member.voice.channel);
        } catch {
            await player.deleteQueue(int.guildId);
            return int.reply({ embeds: [embed.setAuthor({ name: `I can't join the voice channel ${int.member}... try again ? ❌` })], ephemeral: true });
        }

        await int.reply({ embeds: [embed.setAuthor({ name: `Loading your ${res.playlist ? 'playlist' : 'track'}... 🎧` })], ephemeral: true });

        res.playlist ? queue.addTrack(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.node.isPlaying()) await queue.node.play();
    },
};