const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'help',
    category: 'Core',
    description: ('Shows help'),
    options: [
        {
            name: 'command',
            description: ('The command you want help with'),
            type: ApplicationCommandOptionType.String,
            required: false,
        }
    ],

    async execute({ int, client }) {

        const embed = new EmbedBuilder();

        if (int.options.getString('command')) {
            const arg = int.options.getString('command');
            const command = client.commands.get(arg.join(" ").toLowerCase()) || client.commands.find(x => x.aliases && x.aliases.includes(arg.join(" ").toLowerCase()));
            if (!command) {
                embed.setColor('red');
                embed.setDescription(`❌ | I did not find this command !`);
                return int.editReply({ embeds: [embed] });
            }

            embed.setColor('Red');
            embed.setAuthor({name: 'HELP PANEL'});

            embed.setDescription(command.description);

            embed.addFields({name: 'Name', value: command.name, inline: true});
            embed.addFields({name: 'Category', value: command.category, inline: true});            
            embed.addFields({name: "Options", value: command.options.map((option) => option.name).join(', '), inline: true});

            embed.setTimestamp();
            embed.setFooter({text: 'Made with heart by ShambaC ❤️', iconURL: message.author.avatarURL({ dynamic: true })});

            int.editReply({ embeds: [embed] });
        }
        else {
            embed.setColor('Red');
            embed.setAuthor({name: 'HELP PANEL'});

            const core = client.commands.filter(x => x.category == 'Core').map((x) => '`' + x.name + '`').join(', ');
            const music = client.commands.filter(x => x.category == 'Music').map((x) => '`' + x.name + '`').join(', ');

            embed.addFields({name: 'Info', value: core});
            embed.addFields({name: 'Music', value: music});

            embed.setTimestamp();
            embed.setFooter({text: 'Made with ❤️ by ShambaC', iconURL: message.author.avatarURL()});

            int.editReply({ embeds: [embed] });
        }
    }
};