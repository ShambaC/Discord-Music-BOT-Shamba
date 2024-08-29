const { ButtonBuilder, ButtonStyle } = require("discord.js");


const stopBtn = new ButtonBuilder();
stopBtn.setLabel("Stop");
stopBtn.setCustomId("stop");
stopBtn.setStyle(ButtonStyle.Secondary);
stopBtn.setEmoji(`⏹️`);

async function btnFn({ int, queue }) {
    if (!queue || !queue.node.isPlaying()) return int.reply({ content: `No music currently playing <@${int.user.id}>... try again ? ❌`, components: [] });

    if(queue.npembed) queue.npembed.delete();
    queue.npembed = null;
    queue.delete();

    return int.reply({ content: `Music stopped into this server, see you next time ✅`, components: [] });
}

module.exports = { stopBtn, btnFn };