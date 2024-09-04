const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'invite',
    category: 'Core',
    description: ('Invite link for the bot'),

    async execute({ client, int}) {
        const embed = new EmbedBuilder();

        embed.setColor('Blue');
        embed.setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024 })});

        

        embed.setDescription('Invite');
        embed.addFields({name: 'Wanna Invite the bot to your server ?', value: '[Invite the bot here](Invite link here)', inline: false});

        embed.setTimestamp();
        embed.setFooter({text: 'Made with heart by ShambaC ❤️', iconURL: int.user.avatarURL()});

        message.channel.send({ embeds: [embed] });
    },
};