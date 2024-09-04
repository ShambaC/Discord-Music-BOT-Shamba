const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'about',
    category: 'Core',
    description: 'Shows info about the BOT',

    async execute({ int, client }) {
        const embed = new EmbedBuilder();

        embed.setColor('Blue');
        embed.setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024})});

        embed.setDescription('This BOT is open source and is hosted with Digital Ocean');
        embed.addFields({name: 'Source code', value: '[Github](https://github.com/ShambaC/Discord-Music-BOT-Shamba)',inline: true})
        embed.addFields({name: 'Invite', value: '[Invite the bot here](Invite link here)', inline: true});

        embed.setTimestamp();
        embed.setFooter({text: 'Made with heart by ShambaC ❤️', iconURL: message.author.avatarURL()});

        int.editReply({ embeds: [embed] });
    },
};