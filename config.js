module.exports = {
    app: {
        px: '>',
        token: 'your token here',
        playing: 'Game',
        type: 'Status type',
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: 'DJ',
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'seek', 'shuffle', 'skip', 'stop', 'volume']
        },
        maxVol: 100,
	loopMessage: false,
        discordPlayer: {
	    leaveOnEnd: false,
            leaveOnStop: false,
            leaveOnEmpty: false,
            leaveOnEmptyCooldown: 30000,
            autoSelfDeaf: true,
			ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
		}
    }
};
