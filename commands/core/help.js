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
        const commandArg = int.options.getString('command');

        if (commandArg) {
            const command = client.commands.get(commandArg.toLowerCase());
            if (!command) {
                embed.setColor('Red');
                embed.setDescription(`❌ | I did not find this command !`);
                return int.reply({ embeds: [embed], ephemeral: true });
            }

            embed.setColor('Red');
            embed.setAuthor({name: 'HELP PANEL'});

            embed.setDescription(command.description);

            embed.addFields({name: 'Name', value: command.name, inline: true});
            embed.addFields({name: 'Category', value: command.category, inline: true});
            // embed.addFields({name: "Options", value: command.options.map((option) => option.name).join(', '), inline: true});

            embed.setTimestamp();
            embed.setFooter({text: 'Made with heart by ShambaC ❤️', iconURL: int.user.avatarURL({ dynamic: true })});

            int.reply({ embeds: [embed], ephemeral: true });
        }
        else {
            embed.setColor('Red');
            embed.setAuthor({name: 'HELP PANEL'});

            const core = client.commands.filter(x => x.category == 'Core').map((x) => '`' + x.name + '`').join(', ');
            const music = client.commands.filter(x => x.category == 'Music').map((x) => '`' + x.name + '`').join(', ');

            embed.addFields({name: 'Info', value: core});
            embed.addFields({name: 'Music', value: music});

            embed.setTimestamp();
            embed.setFooter({text: 'Made with ❤️ by ShambaC', iconURL: int.user.avatarURL()});

            int.reply({ embeds: [embed], ephemeral: false });
        }
    }
};