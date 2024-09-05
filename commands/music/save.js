const { useQueue } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'save',
    category: 'Music',
    voiceChannel: true,
    description: ('Saves the name of the track to user\'s DMs'),

    async execute({ int, client }) {
        const queue = useQueue(int.guild);

        if (!queue || !queue.node.isPlaying()) return int.reply({ content: `No music currently playing ${int.member}... try again ? ❌`, ephemeral: true });

        const embed = new EmbedBuilder()
            .setColor('#68f298')
            .setTitle(`➡️ | ${queue.currentTrack.title}`)
            .setURL(queue.currentTrack.url)
            .addFields(
                { name: `Duration ⏳`, value: `${queue.currentTrack.duration}`, inline: true },
                { name: 'Song by:', value: `${queue.currentTrack.author}`, inline: true },
                { name: 'Song URL:', value: `${queue.currentTrack.url}` }
            )
            .setThumbnail(queue.currentTrack.thumbnail)
            .setFooter({ text: `From the server ${int.member.guild.name}`, iconURL: int.member.guild.iconURL() });

        int.member.send({ embeds: [embed] })
        .then(() => {
            int.reply({ content: `I have sent you the title of the music by private messages ✅`, ephemeral: true });
        }).catch(error => {
            int.reply({ content: `Unable to send you a private message ... try again ? ❌`, ephemeral: true });
        });
    },
};