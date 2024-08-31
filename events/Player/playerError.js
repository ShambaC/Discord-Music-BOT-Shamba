const { EmbedBuilder } = require("discord.js")

module.exports = (queue, error) => {
    (async () => {
        const embed = new EmbedBuilder()
            .setAuthor({ name: `Error emitted from the player ${error.message} Try again ❌` })
            .setColor('#c92c0c');

        queue.metadata.send({ embeds: [embed] });
    })()
}