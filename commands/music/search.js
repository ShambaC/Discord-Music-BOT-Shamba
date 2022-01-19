const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}search [song name/URL]',
    voiceChannel: true,
    description: 'Shows a list of 10 songs to choose from',

    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(`Please enter a valid search ${message.author}... try again ? ❌`);

        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send(`No results found ${message.author}... try again ? ❌`);

        
        
            const queue = await player.createQueue(message.guild, {
                metadata: message.channel,
                play_embed_send: false,
                npembed: null,
                isPaused: false
            });
        

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await player.deleteQueue(message.guild.id);
            return message.channel.send(`I can't join the voice channel ${message.author}... try again ? ❌`);
        }

        message.channel.send(`Here's your search results... 🎧`);

        var searchlist = [];

        for(let i = 0; i < 10; i++)
        {
            searchlist[i] = (i+1).toString() + ". " + res.tracks[i].title;
        }

        message.channel.send(searchlist.join('\n')).then(() => {

        let filter = m => m.author.id === message.author.id;
        message.channel.awaitMessages({
            filter,
            max: 1,
            time: 30000,
            errors: ['time']
        })
        .then(message => {
            message = message.first();
            var choice = parseInt(message.content);

            if(choice < 1 || choice > 10)
            {            
                return message.channel.send(`❌ Wrong choice !! Redo search !`);
            }
            else
            {
                queue.addTrack(res.tracks[choice - 1]);
                if (!queue.playing) queue.play();
            }
        })
        .catch(collected => {
            message.channel.send(`❌ Timeout ! Try again !`);
        });
    })

        if (!queue.playing) await queue.play();
    },
};