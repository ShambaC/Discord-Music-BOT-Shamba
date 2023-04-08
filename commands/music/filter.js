module.exports = {
    name: 'filter',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}filter [filter name]',
    voiceChannel: true,
    description: 'Apply filters to the current queue',

    async execute(client, message, args) {
        const queue = player.nodes.get(message.guild.id);

        if (!queue || !queue.node.isPlaying()) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        const actualFilter = queue.getFiltersEnabled()[0];

        if (!args[0]) return message.channel.send(`Please specify a valid filter to enable or disable ${message.author}... try again ? ❌\n${actualFilter ? `Filter currently active ${actualFilter} (${process.env.px}filter ${actualFilter} to disable it).\n` : ''}`);

        const filters = [];

        queue.getFiltersEnabled().map(x => filters.push(x));
        queue.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filter) return message.channel.send(`This filter doesn't exist ${message.author}... try again ? ❌\n${actualFilter ? `Filter currently active ${actualFilter}.\n` : ''}List of available filters ${filters.map(x => `**${x}**`).join(', ')}.`);

        // const filtersUpdated = {};

        // filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

        // await queue.setFilters(filtersUpdated);

        await queue.filters.ffmpeg.toggle(filter)

        message.channel.send(`The filter ${filter} is now **${queue.getFiltersEnabled().includes(filter) ? 'enabled' : 'disabled'}** ✅\n*Reminder the longer the music is, the longer this will take.*`);
    },
};