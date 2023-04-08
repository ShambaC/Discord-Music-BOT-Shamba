const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const saveButton = new ButtonBuilder();
saveButton.setLabel('Save this track');
saveButton.setCustomId('saveTrack');
saveButton.setStyle(ButtonStyle.Success);

const nextButton = new ButtonBuilder();
nextButton.setLabel('Skip');
nextButton.setCustomId('skipButton');
nextButton.setStyle(ButtonStyle.Secondary);
nextButton.setEmoji('⏭️');

const pauseButton = new ButtonBuilder();
pauseButton.setLabel('Pause');
pauseButton.setCustomId('pauseint');
pauseButton.setStyle(ButtonStyle.Secondary);
pauseButton.setEmoji('⏸️');

const playButton = new ButtonBuilder();
playButton.setLabel('Resume');
playButton.setCustomId('playint');
playButton.setStyle(ButtonStyle.Secondary);
playButton.setEmoji('▶️');

const stopButton = new ButtonBuilder();
stopButton.setLabel('Stop');
stopButton.setCustomId('stopint');
stopButton.setStyle(ButtonStyle.Danger);
stopButton.setEmoji('⏹️');

const row = new ActionRowBuilder().addComponents(saveButton, nextButton, pauseButton, playButton, stopButton);

const embed = new EmbedBuilder();

process.on("uncaughtException", function (err) {
    if (!err.stack?.includes("ERR_STREAM_PREMATURE_CLOSE")) {
      console.error(err.stack);
      exitHandler.bind(null, { exit: true, signal: "uncaughtException" });
    }
  });

player.events.on('error', (queue, error) => {
    queue.metadata.send(`Error emitted from the queue ${error.message} Try again ❌`);
});

player.events.on('playerError', (queue, error) => {
    queue.metadata.send(`Error emitted from the player ${error.message} Try again ❌`);
});

player.events.on('playerStart', async (queue, track) => {
	if (!client.config.opt.loopMessage && queue.repeatMode == 'TRACK') return;

    const timestamp = queue.node.getTimestamp();
    const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

    embed.setColor('Red');
    embed.setThumbnail(track.thumbnail);
    embed.setAuthor({name: track.title, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }), url: track.url})

    if(queue.isPaused)
        {
            embed.setDescription(`Status : Paused\nDuration : ${trackDuration}`);
        }
        else
        {
            embed.setDescription(`Status : Playing\nDuration : ${trackDuration}`);
        }

    embed.setTimestamp();
    embed.setFooter({text: 'Made with heart by ShambaC ❤️'});

    if(!queue.play_embed_send)
    {
        if(queue.npembed) queue.npembed.delete();
        queue.npembed = await queue.metadata.send({ embeds: [embed], components: [row]  });
        queue.play_embed_send = true;
    }
    else
    {          
        queue.npembed.edit({ embeds: [embed], components: [row]  });
        queue.play_embed_send = false;
    }
});

player.events.on('audioTrackAdd', (queue, track) => {
    queue.metadata.send(`Track ${track.title} added in the queue ✅`);
});

player.events.on('disconnect', (queue) => {
    queue.metadata.send('I was manually disconnected from the voice channel, clearing queue... ❌');
    queue.play_embed_send = false;
    if(queue.npembed) queue.npembed.delete();
    queue.npembed = null;
    if(!queue.deleted)    queue.delete();
});

player.events.on('emptyChannel', (queue) => {
    queue.metadata.send('Nobody is in the voice channel, leaving the voice channel... ❌');
    queue.play_embed_send = false;
    if(queue.npembed) queue.npembed.delete();
    queue.npembed = null;
    if(!queue.deleted)    queue.delete();
});

player.events.on('emptyQueue', (queue) => {
    queue.metadata.send('I finished reading the whole queue ✅');
    queue.play_embed_send = false;
    if(queue.npembed) queue.npembed.delete();
    queue.npembed = null;
    if(!queue.deleted)    queue.delete();
});