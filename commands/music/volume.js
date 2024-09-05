const { useQueue } = require("discord-player");
const { ApplicationCommandOptionType } = require("discord.js");

const maxVol = client.config.opt.maxVol;

module.exports = {
    name: 'volume',
    category: 'Music',
    voiceChannel: true,
    description: ('Set internal volume of the BOT'),
    options: [
        {
            name: 'volume',
            description: ('New volume to set'),
            type: ApplicationCommandOptionType.Number,
            required: true,
            min_value: 1,
            max_value: maxVol
        }
    ],

    async execute({ int, client }) {
        const queue = useQueue(int.guild);

        if (!queue || !queue.playing) return int.reply({ content: `No music currently playing ${int.member}... try again ? ❌`, ephemeral: true });

        const vol = int.options.getNumber('volume');

        if (queue.volume === vol) return int.reply({ content: `The volume you want to change is already the current one ${int.member}... try again ? ❌`, ephemeral: true });

        const success = queue.setVolume(vol);

        const embed = new EmbedBuilder()
            .setColor('#68f298')
            .setAuthor({ name: success ? `The volume has been modified to **${vol}**/**${maxVol}**% 🔊` : `Something went wrong ${int.member}... try again ? ❌` });

        return int.reply({ embeds: [embed], ephemeral: false });
    },
};