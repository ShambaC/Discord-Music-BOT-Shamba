module.exports = {
    name: 'save',
    aliases: ['sv'],
    category: 'Music',
    utilisation: '{prefix}save',
    voiceChannel: true,
    description: 'Saves the name of the track to user\'s DMs',

    async execute(client, message) {
        const queue = player.nodes.get(message.guild.id);

        if (!queue || !queue.node.isPlaying()) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        message.author.send(`You saved the track ${queue.currentTrack.title} | ${queue.currentTrack.author} from the server ${message.guild.name} ✅`).then(() => {
            message.channel.send(`I have sent you the title of the music by private messages ✅`);
        }).catch(error => {
            message.channel.send(`Unable to send you a private message ${message.author}... try again ? ❌`);
        });
    },
};