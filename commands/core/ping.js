const ms = require('ms');

module.exports = {
    name: 'ping',
    category: 'Core',
    description: (`Check the ping of the bot`),

    async execute({ int, client }) {
        await int.reply("Pong?");
        int.reply(`Last heartbeat calculated ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} ago **${client.ws.ping}ms** 🛰️`);
    }
};