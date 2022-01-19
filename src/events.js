const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const saveButton = new MessageButton();
saveButton.setLabel('Save this track');
saveButton.setCustomId('saveTrack');
saveButton.setStyle('SUCCESS');

const nextButton = new MessageButton();
nextButton.setLabel('Skip');
nextButton.setCustomId('skipButton');
nextButton.setStyle('SECONDARY');
nextButton.setEmoji('⏭️');

const pauseButton = new MessageButton();
pauseButton.setLabel('Pause');
pauseButton.setCustomId('pauseint');
pauseButton.setStyle('SECONDARY');
pauseButton.setEmoji('⏸️');

const playButton = new MessageButton();
playButton.setLabel('Resume');
playButton.setCustomId('playint');
playButton.setStyle('SECONDARY');
playButton.setEmoji('▶️');

const stopButton = new MessageButton();
stopButton.setLabel('Stop');
stopButton.setCustomId('stopint');
stopButton.setStyle('DANGER');
stopButton.setEmoji('⏹️');

const row = new MessageActionRow().addComponents(saveButton, nextButton, pauseButton, playButton, stopButton);

var play_embed_send = 0;
const embed = new MessageEmbed();

player.on('error', (queue, error) => {
    console.log(`Error emitted from the queue ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`Error emitted from the connection ${error.message}`);
});

player.on('trackStart', (queue, track) => {
	if (!client.config.opt.loopMessage && queue.repeatMode == 'TRACK') return;
    const timestamp = queue.getPlayerTimestamp();
    const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

    embed.setColor('RED');
    embed.setThumbnail(track.thumbnail);
    embed.setAuthor(track.title, client.user.displayAvatarURL({ size: 1024, dynamic: true }), track.url);

    if(queue.isPaused)
        {
            embed.setDescription(`Status : Paused\nDuration : ${trackDuration}`);
        }
        else
        {
            embed.setDescription(`Status : Playing\nDuration : ${trackDuration}`);
        }

    embed.setTimestamp();
    embed.setFooter('Made with heart by ShambaC ❤️');

    if(play_embed_send == 0)
    {
        if(queue.npembed) queue.npembed.delete();
        queue.npembed = await queue.metadata.send({ embeds: [embed], components: [row]  });
        play_embed_send = 1;
    }
    else
    {          
        queue.npembed.edit({ embeds: [embed], components: [row]  });
        play_embed_send++;
        if(play_embed_send == 2)    play_embed_send = 0;
    }
});

player.on('trackAdd', (queue, track) => {
    queue.metadata.send(`Track ${track.title} added in the queue ✅`);
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send('I was manually disconnected from the voice channel, clearing queue... ❌');
    play_embed_send = 0;
    if(queue.npembed) queue.npembed.delete();
    queue.destroy();
});

player.on('channelEmpty', (queue) => {
    queue.metadata.send('Nobody is in the voice channel, leaving the voice channel... ❌');
    play_embed_send = 0;
    if(queue.npembed) queue.npembed.delete();
    queue.destroy();
});

player.on('queueEnd', (queue) => {
    queue.metadata.send('I finished reading the whole queue ✅');
    play_embed_send = 0;
    if(queue.npembed) queue.npembed.delete();
    queue.destroy();
});