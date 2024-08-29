const { ButtonBuilder, ButtonStyle } = require('discord.js');

const skipBtn = new ButtonBuilder();
skipBtn.setLabel('Skip');
skipBtn.setCustomId('skip');
skipBtn.setStyle(ButtonStyle.Secondary);
skipBtn.setEmoji('⏭️');

async function btnFn({ int, queue }) {
    if (!queue || !queue.node.isPlaying()) return int.reply({content: `No music currently playing <@${int.user.id}>... try again ? ❌`, components: [] });

    const success = queue.node.skip();

    return int.reply(success ? {content : `Current music ${queue.currentTrack.title} skipped ✅`,ephemeral: true, components: [] } : {content :  `Something went wrong <@${int.user.id}>... try again ? ❌`,ephemeral: true, components: [] });
}

module.exports = { skipBtn, btnFn };