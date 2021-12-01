const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'about',
    aliases: [],
    category: 'Core',
    utilisation: '{prefix}about',
    description: 'Shows info about the BOT',

    execute(client, message, args) {
        const embed = new MessageEmbed();

        embed.setColor('BLUE');
        embed.setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        

        embed.setDescription('This BOT is open source');
        embed.addField('Source code', '[Github](https://github.com/ShambaC/Discord-Music-BOT-Shamba)', true)
        embed.addField('Invite', '[Invite the bot here](Invite link here)', true);

        embed.setTimestamp();
        embed.setFooter('Made with heart by ShambaC ❤️', message.author.avatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] });
    },
};