const { QueueRepeatMode, useQueue } = require('discord-player');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'loop',
    category: 'Music',
    voiceChannel: true,
    description: ('Loop the queue or current track'),
    options: [
        {
            name: 'action',
            description: ('Type of loop to perform'),
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: 'Queue', value: 'enable_loop_queue'},
                { name: 'Disable', value: 'disable_loop' },
                { name: 'Track', value: 'enable_loop_track' },
                { name: 'Autoplay', value: 'enable_autoplay' }
            ]
        }
    ],

    async execute({ int, client }) {
        const queue = useQueue(int.guild);

        if (!queue) return int.reply({ content: `No music currently playing ${int.member}... try again ? ❌`, ephemeral: true });

        const embed = new EmbedBuilder();
        const errMsg = `Something went wrong ${int.member}... try again ? ❌`

        const choice = int.options.getString('action');

        if (choice.toLowerCase() === 'enable_loop_queue') {
            if (queue.repeatMode === QueueRepeatMode.TRACK) return int.reply({ content: `You must first disable the current music in the loop mode (\`/loop Disable\`) ${int.member}... try again ? ❌`, ephemeral: true });

            const success = queue.setRepeatMode(QueueRepeatMode.QUEUE);

            embed.setColor(!success ? '#68f298' : 'Red');
            embed.setAuthor({ name: !success ? `Repeat mode enabled, the whole queue will be repeated endlessly 🔁` : errMsg });

            return int.reply({ embeds: [embed], ephemeral : false });    
        }
        else if (choice.toLowerCase() === 'disable_loop') {
            if (queue.repeatMode === QueueRepeatMode.OFF) return int.reply({ content: `You must first enable the loop mode <(/loop Queue or /loop Song)> ${int.member}... try again ? ❌`, ephemeral: true });

            const success = queue.setRepeatMode(QueueRepeatMode.OFF);

            embed.setColor(!success ? '#68f298' : 'Red');
            embed.setAuthor({ name: !success ? `Repeat mode disabled, the queue will no longer be repeated 🔁` : errMsg });

            return int.reply({ embeds: [embed], ephemeral : false });
        }
        else if (choice.toLowerCase() === 'enable_loop_track') {
            if (queue.repeatMode === QueueRepeatMode.QUEUE) return int.reply({ content: `You must first disable the current music in the loop mode (\`/loop Disable\`) ${int.member}... try again ? ❌`, ephemeral: true });

            const success = queue.setRepeatMode(QueueRepeatMode.TRACK);

            embed.setColor(!success ? '#68f298' : 'Red');
            embed.setAuthor({ name: !success ? `Repeat mode enabled, the current track will be repeated 🔂` : errMsg });

            return int.reply({ embeds: [embed], ephemeral : false });
        }
        else if (choice.toLowerCase() === 'enable_autoplay') {
            if (queue.repeatMode === QueueRepeatMode.QUEUE) return int.reply({ content: `You must first disable the current music in the loop mode (\`/loop Disable\`) ${int.member}... try again ? ❌`, ephemeral: true });

            const success = queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);

            embed.setColor(!success ? '#68f298' : 'Red');
            embed.setAuthor({ name: !success ? `AutoPlay enabled, will play similar songs 🔁` : errMsg });

            return int.reply({ embeds: [embed], ephemeral : false });
        }
    },
};