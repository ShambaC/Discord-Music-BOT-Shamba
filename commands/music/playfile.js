const { QueryType } = require('discord-player');

module.exports = {
    name: 'playfile',
    aliases: ['pf'],
    category: 'Music',
    utilisation: '{prefix}playfile',
    voiceChannel: true,
    description: 'Play the file attached to this command message',

    async execute(client, message, args) {

        var attached_song = message.attachments.first();

        if(attached_song == null)
        {
            return message.channel.send(`Please attach a music file ❌`);
        }

        var attached_song_url = attached_song.url;

        const res = await player.search(attached_song_url, {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send(`Not a valid file ${message.author}... try again ? ❌`);

        const queue = await player.nodes.create(message.guild, {
            metadata: message.channel,
            play_embed_send: false,
            npembed: null,
            isPaused: false,
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        });
        

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await player.deleteQueue(message.guild.id);
            return message.channel.send(`I can't join the voice channel ${message.author}... try again ? ❌`);
        }

        await message.channel.send(`Loading your ${res.playlist ? 'playlist' : 'track'}... 🎧`);

        res.playlist ? queue.addTrack(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.node.isPlaying()) await queue.node.play();
    },
};