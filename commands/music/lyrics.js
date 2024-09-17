const { useQueue } = require('discord-player');
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'lyrics',
	category: 'Music',
	description: ('Displays the lyrics of the current track or the track you searched'),
	options: [
		{
			name: 'title',
			description: 'Song name you want to see the lyrics for',
			type: ApplicationCommandOptionType.String,
			required: false
		}
	],

    async execute({ int, client }) {
		int.deferReply({ ephemeral : false });

		const queue = useQueue(int.guild);

		const songArg = int.options.getString('title');

		if (!queue && !songArg) return int.reply({ content: `No track in queue or valid search provided ${int.member}... try again ? ❌`, ephemeral: true });
		
		var tempterm;

		if(songArg)
		{
			tempterm = songArg.toString();
		}
		else
		{
			tempterm = queue.currentTrack.title;
		}
		
		if(tempterm.includes('('))
		{
			var words = tempterm.split("(");
			words.pop();
			tempterm = words[0];
		}

		fetch(`https://weeb-api.vercel.app/genius?query=${encodeURIComponent(tempterm)}`)
			.then(res => res.json())
			.then(searches => {
				const firstSongUrl = searches[0].url
				fetch(`https://weeb-api.vercel.app/lyrics?url=${firstSongUrl}`)
					.then(res => res.json())
					.then(lyrics => {
						const embed = new EmbedBuilder()
						.setColor('#2beddd')
						.setTitle(`**LYRICS | ${searches[0].title}**`)
						.setDescription(lyrics.length > 4095 ? lyrics.substring(0, 4093) + '...': lyrics)
						.setFooter({text: `Made by ShambaC#3440`})
					
						int.editReply({ embeds : [embed] }) 
					})
			})
			.catch(err => {
				console.log(err)
				return int.reply({ content: `🚫 | Couldn' find lyrics for this song! Please retry or search for an other track!`, ephemeral: true });
			})
	},
};