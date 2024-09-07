const { EmbedBuilder } = require("discord.js");

module.exports = (queue) => {
    (async () => {

        const embed = new EmbedBuilder()
            .setAuthor({ name: `I was manually disconnected from the voice channel, clearing queue... ❌` })
            .setColor('#c92c0c');

        queue.play_embed_send = false;
        if(queue.npembed) queue.npembed.delete();
        queue.npembed = null;
        if(!queue.deleted)    queue.delete();

        queue.metadata.send({ embeds: [embed] });
    })()
}