const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'invite',
    aliases: [],
    category: 'Core',
    utilisation: '{prefix}invite',
    description: 'Invite link for the bot',

    execute(client, message, args) {
        const embed = new EmbedBuilder();

        embed.setColor('Blue');
        embed.setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })});

        

        embed.setDescription('Invite');
        embed.addFields({name: 'Wanna Invite the bot to your server ?', value: '[Invite the bot here](Invite link here)', inline: false});

        embed.setTimestamp();
        embed.setFooter({text: 'Made with heart by ShambaC ❤️', iconURL: message.author.avatarURL({ dynamic: true })});

        message.channel.send({ embeds: [embed] });
    },
};