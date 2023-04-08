module.exports = {
    name: 'stop',
    aliases: ['dc'],
    category: 'Music',
    utilisation: '{prefix}stop',
    voiceChannel: true,
    description: 'Stops and disconnects the BOT',

    execute(client, message) {
        const queue = player.nodes.get(message.guild.id);

        if (!queue || !queue.node.isPlaying()) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        if(!queue.deleted)
        {
            queue.play_embed_send = false;
            if(queue.npembed) queue.npembed.delete();
            queue.npembed = null;
            queue.delete();
        }
        message.channel.send(`Music stopped into this server, see you next time ✅`);
    },
};