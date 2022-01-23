module.exports = {
    name: 'stop',
    aliases: ['dc'],
    category: 'Music',
    utilisation: '{prefix}stop',
    voiceChannel: true,
    description: 'Stops and disconnects the BOT',

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        if(!queue.destroyed)
        {
            queue.play_embed_send = false;
            if(queue.npembed) queue.npembed.delete();
            queue.npembed = null;
            queue.destroy();
        }

        message.channel.send(`Music stopped into this server, see you next time ✅`);
    },
};