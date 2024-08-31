const { EmbedBuilder } = require("discord.js")

module.exports = (queue) => {
    (async () => {
        
        const embed = new EmbedBuilder()
            .setAuthor(`I finished reading the whole queue ✅ ${client.config.opt.discordPlayer.leaveOnEmpty ? ` Good Bye 👋` : ''}`)
            .setColor('#c92c0c');

        queue.metadata.send({ embeds: [embed] });
    })()
}