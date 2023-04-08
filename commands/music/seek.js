const ms = require('ms');

module.exports = {
    name: 'seek',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}seek [time]',
    voiceChannel: true,
    description: 'Seek to a part of track',

    async execute(client, message, args) {
        const queue = player.nodes.get(message.guild.id);

        if (!queue || !queue.node.isPlaying()) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);
        if (!args[0]) return message.channel.send("Please Enter a timestamp !");
        
        const timeToMS = ms(args.join(' '));
                
        if (timeToMS >= queue.current.durationMS) return message.channel.send(`The indicated time is higher than the total time of the current song ${message.author}... try again ? ❌\n*Try for example a valid time like **5s, 10s, 20 seconds, 1m**...*`);

        await queue.seek(timeToMS);

        message.channel.send(`Time set on the current song **${ms(timeToMS, { long: true })}** ✅`);
    },
};