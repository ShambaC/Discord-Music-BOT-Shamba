const { useQueue } = require('discord-player');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, InteractionType } = require('discord.js');
const embed = new EmbedBuilder();

const saveButton = new ButtonBuilder();
saveButton.setLabel('Save this track');
saveButton.setCustomId('saveTrack');
saveButton.setStyle(ButtonStyle.Success);

const nextButton = new ButtonBuilder();
nextButton.setLabel('Skip');
nextButton.setCustomId('skipButton');
nextButton.setStyle(ButtonStyle.Secondary);
nextButton.setEmoji('⏭️');

const pauseButton = new ButtonBuilder();
pauseButton.setLabel('Pause');
pauseButton.setCustomId('pauseint');
pauseButton.setStyle(ButtonStyle.Secondary);
pauseButton.setEmoji('⏸️');

const playButton = new ButtonBuilder();
playButton.setLabel('Resume');
playButton.setCustomId('playint');
playButton.setStyle(ButtonStyle.Secondary);
playButton.setEmoji('▶️');

const stopButton = new ButtonBuilder();
stopButton.setLabel('Stop');
stopButton.setCustomId('stopint');
stopButton.setStyle(ButtonStyle.Danger);
stopButton.setEmoji('⏹️');

const row1 = new ActionRowBuilder().addComponents(saveButton, nextButton, playButton, stopButton);
const row2 = new ActionRowBuilder().addComponents(saveButton, nextButton, pauseButton, stopButton);

module.exports = async (client, int) => {
    if (int.type === InteractionType.ApplicationCommand) {
        
        await int.deferReply({ ephemeral: true });

        const DJ = client.config.opt.DJ;
        const command = client.commands.get(int.commandName);

        const errorEmbed = new EmbedBuilder().setColor('#ff0000');

        if (!command) {
            errorEmbed.setDescription(`❌ | Some error occured !`);
            int.editReply({ embeds: [errorEmbed], ephemeral: true });
            return client.slash.delete(int.commandName);
        }

        if (command.permissions && !int.member.permissions.has(command.permissions)) {
            errorEmbed.setDescription(`❌ | You do not have the proper permissions to execute this command`)
            return int.editReply({ embeds: [errorEmbed], ephemeral: true });
        }

        if (DJ.enabled && DJ.commands.includes(command) && !int.member._roles.includes(int.guild.roles.cache.find(x => x.name === DJ.roleName).id)) {
            errorEmbed.setDescription(`❌ | This command is reserved For members with <\`${DJ.roleName}\`> `);
            return int.editReply({ embeds: [errorEmbed], ephemeral: true });
        }

        if (command.voiceChannel) {
            if (!int.member.voice.channel) {
                errorEmbed.setDescription(`❌ | You are not in a voice channel`);
                return int.editReply({ embeds: [errorEmbed], ephemeral: true });
            }

            if (int.guild.members.me.voice.channel && int.member.voice.channel.id !== int.guild.members.m.voice.channel.id) {
                errorEmbed.setDescription(`❌ | You are not in the same voice channel`);
                return int.editReply({ embeds: [errorEmbed], ephemeral: true });
            }
        }

        command.execute({ int, client });
    }
    else if (int.type === InteractionType.MessageComponent) {

        const customId = int.customId;
        if (!customId) return;

        const queue = useQueue(int.guildId);
        const path = `../../buttons/${customId}.js`;

        delete require.cache[require.resolve(path)];
        const { btnFn } = require(path);
        return btnFn({ int, queue });
    }

    
}; 