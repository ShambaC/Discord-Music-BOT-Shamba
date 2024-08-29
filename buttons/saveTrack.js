const { ButtonBuilder, ButtonStyle } = require("discord.js");


const saveBtn = new ButtonBuilder();
saveBtn.setLabel('Save this track');
saveBtn.setCustomId('saveTrack');
saveBtn.setStyle(ButtonStyle.Success);

async function btnFn({ int, queue }) {
    if (!queue || !queue.node.isPlaying()) return int.reply({ content: `No music currently playing <@${int.user.id}>... try again ? ❌`,ephemeral: true, components: [] });

    int.member.send(`You saved the track ${queue.currentTrack.title} | ${queue.currentTrack.author} from the server ${int.member.guild.name} ✅`).then(() => {
            return int.reply({ content: `I have sent you the title of the music by private messages <@${int.user.id}> ✅`,ephemeral: true, components: [] });
        }).catch(error => {
            return int.reply({ content: `Unable to send you a private message <@${int.user.id}>... try again ? ❌`,ephemeral: true, components: [] });
            });
}

module.exports = { saveBtn, btnFn };