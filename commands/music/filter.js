const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { options } = require("../core/help");
const { AudioFilters, useQueue } = require("discord-player");

module.exports = {
    name: 'filter',
    category: 'Music',
    voiceChannel: true,
    description: ('Apply filters to the current queue'),
    options: [
        {
            name: 'filter',
            description: ('The filter you want to apply'),
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [...Object.keys(AudioFilters.filters).map(m => Object({ name: m, value: m })).splice(0, 25)]
        }
    ],


    async execute({ int, client }) {
        const queue = useQueue(int.guild);

        if (!queue) return int.reply({ content: `No music currently playing ${int.member}... try again ? ❌`, ephemeral: true });

        const actualFilter = queue.filters.ffmpeg.getFiltersEnabled()[0];
        const selectedFIlter = int.options.getString('filter');

        const filters = [];
        queue.filters.ffmpeg.getFiltersEnabled().forEach(x => filters.push(x));
        queue.filters.ffmpeg.getFiltersDisabled().forEach(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === selectedFIlter.toLowerCase().toString());

        if (!filter) return int.reply({ content: `This filter doesn't exist ${int.member}... try again ? ❌\n${actualFilter ? `Filter currently active ${actualFilter}.\n` : ''}List of available filters ${filters.map(x => `**${x}**`).join(', ')}.`, ephemeral: true });

        await queue.filters.ffmpeg.toggle(filter)

        const embed = new EmbedBuilder()
            .setAuthor({ name: `The filter ${filter} is now **${queue.filters.ffmpeg.isEnabled(filter) ? 'enabled' : 'disabled'}** ✅\n*Reminder the longer the music is, the longer this will take.*` })
            .setColor('#68f298');
        
        return int.reply({ embeds: [embed], ephemeral: false });
    },
};