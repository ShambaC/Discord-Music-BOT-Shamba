const { EmbedBuilder } = require("discord.js")

module.exports = (queue, track) => {

    (async () => {
        const embed = new EmbedBuilder()
            .setAuthor({ name: `Track ${track.title} added in the queue ✅`, iconURL: track.thumbnail })
            .setColor('#11bf85');

        queue.metadata.send({ embeds: [embed] });
    })()
}