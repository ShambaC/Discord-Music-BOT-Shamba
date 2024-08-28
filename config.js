module.exports = {
    opt: {
        DJ: {
            enabled: false,
            roleName: 'DJ',
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'seek', 'shuffle', 'skip', 'stop', 'volume']
        },
        maxVol: 100,
	    loopMessage: false,
        discordPlayer: {
	        leaveOnEnd: true,
            leaveOnStop: true,
            leaveOnEmpty: true,
            leaveOnEmptyCooldown: 30000,
            autoSelfDeaf: true,
			ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
		}
    }
};
