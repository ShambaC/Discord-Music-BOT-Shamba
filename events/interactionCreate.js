module.exports = (client, int) => {
    if (!int.isButton()) return;

    const queue = player.getQueue(int.guildId);

    switch (int.customId) {
        case 'saveTrack': {
            if (!queue || !queue.playing) return int.reply({ content: `No music currently playing <@${int.user.id}>... try again ? ❌`,ephemeral: true, components: [] });

            int.member.send(`You saved the track ${queue.current.title} | ${queue.current.author} from the server ${int.member.guild.name} ✅`).then(() => {
                return int.reply({ content: `I have sent you the title of the music by private messages <@${int.user.id}> ✅`,ephemeral: true, components: [] });
            }).catch(error => {
                return int.reply({ content: `Unable to send you a private message <@${int.user.id}>... try again ? ❌`,ephemeral: true, components: [] });
            });
            break;
        }
        case 'skipButton': {
            if (!queue || !queue.playing) return int.reply({content: `No music currently playing <@${int.user.id}>... try again ? ❌`, components: [] });

            const success = queue.skip();

            return int.reply(success ? {content : `Current music ${queue.current.title} skipped ✅`, components: [] } : {content :  `Something went wrong <@${int.user.id}>... try again ? ❌`, components: [] });
            break;
        }
        case 'pauseint': {
            if (!queue || !queue.playing) return int.reply({ content: `No music currently playing <@${int.user.id}>... try again ? ❌`, components: [] });
                   
            const success = queue.setPaused(true);
            
            return int.reply(success ? {content : `Current music ${queue.current.title} paused ✅`, components: [] } : {content : `Something went wrong <@${int.user.id}>... try again ? ❌`, components: [] });
            
            break;
        }
        case 'playint': {
            if (!queue || !queue.playing) return int.reply({ content: `No music currently playing <@${int.user.id}>... try again ? ❌`, components: [] });
                   
            const success = queue.setPaused(false);

            return int.reply(success ? {content : `Current music ${queue.current.title} resumed ✅`, components: [] } : {content : `Something went wrong <@${int.user.id}>... try again ? ❌`, components: [] });
            
            break;
        }
        case 'stopint': {
            if (!queue || !queue.playing) return int.reply({ content: `No music currently playing <@${int.user.id}>... try again ? ❌`, components: [] });

            queue.destroy();

            return int.reply({ content: `Music stopped into this server, see you next time ✅`, components: [] });
            
            break;
        }
    }
}; 