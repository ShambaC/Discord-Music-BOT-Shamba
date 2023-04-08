const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'about',
    aliases: [],
    category: 'Core',
    utilisation: '{prefix}about',
    description: 'Shows info about the BOT',

    execute(client, message, args) {
        const embed = new EmbedBuilder();

        embed.setColor('Blue');
        embed.setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true})});

        

        embed.setDescription('This BOT is open source and is hosted with Digital Ocean');
        embed.addFields({name: 'Source code', value: '[Github](https://github.com/ShambaC/Discord-Music-BOT-Shamba)',inline: true})
        embed.addFields({name: 'Invite', value: '[Invite the bot here](Invite link here)', inline: true});

        embed.setTimestamp();
        embed.setFooter({text: 'Made with heart by ShambaC ❤️', iconURL: message.author.avatarURL({ dynamic: true })});

        message.channel.send({ embeds: [embed] });
    },
};