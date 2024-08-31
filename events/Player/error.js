const { EmbedBuilder } = require("discord.js")

module.exports = (queue, error) => {

    (async () => {
        const embed = new EmbedBuilder()
            .setAuthor({ name: `Error emitted from the queue ${error.message} Try again ❌` })
            .setColor('#c92c0c');

        queue.metadata.send({ embeds: [embed] });
    })()
}