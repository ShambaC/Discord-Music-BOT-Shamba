const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'Core',
    showHelp: false,
    utilisation: '{prefix}help [command name]',
    description: 'Shows help',

    execute(client, message, args) 
    {
        const embed = new EmbedBuilder();

        if(!args[0])
        {
            embed.setColor('Red');
            embed.setAuthor({name: 'HELP PANEL'});

            const core = client.commands.filter(x => x.category == 'Core').map((x) => '`' + x.name + '`').join(', ');
            const music = client.commands.filter(x => x.category == 'Music').map((x) => '`' + x.name + '`').join(', ');

            embed.setDescription(`To use filters, ${process.env.px}filter (the filter). Example : ${process.env.px}filter 8D.`);
            embed.addFields({name: 'Info', value: core});
            embed.addFields({name: 'Music', value: music});

            embed.setTimestamp();
            embed.setFooter({text: 'Made with heart by ShambaC ❤️', iconURL: message.author.avatarURL({ dynamic: true })});

            message.channel.send({ embeds: [embed] });
        }
        else
        {
            const command = client.commands.get(args.join(" ").toLowerCase()) || client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));
            if (!command) return message.channel.send(`❌ - I did not find this command !`);

            embed.setColor('Red');
            embed.setAuthor({name: 'HELP PANEL'});

            embed.setDescription(command.description);

            embed.addFields({name: 'Name', value: command.name, inline: true});
            embed.addFields({name: 'Category', value: command.category, inline: true});
            embed.addFields({name: 'Aliase(s)', value: command.aliases.length < 1 ? 'None' : command.aliases.join(', '), inline: true});
            embed.addFields({name: 'Utilisation', value: command.utilisation.replace('{prefix}', process.env.px), inline: true});

            embed.setTimestamp();
            embed.setFooter({text: 'Made with heart by ShambaC ❤️', iconURL: message.author.avatarURL({ dynamic: true })});

            message.channel.send({ embeds: [embed] });

        }

        
    },
};