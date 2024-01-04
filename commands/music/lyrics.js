const { EmbedBuilder } = require('discord.js');
// const Genius = require("genius-lyrics");
// const Client = new Genius.Client("token or blank");

module.exports = {
    name: 'lyrics',
    aliases: [],
	category: 'Music',
    utilisation: '{prefix}lyrics [song name]',
	description: 'Displays the lyrics of the current track or the track you searched',

    async execute(client, message, args) {
      const queue = player.nodes.get(message.guild.id);

      if (!queue && !args[0]) return message.channel.send(`No track in queue or valid search provided ${message.author}... try again ? ❌`);
	  
	  var argument = true;
	  var tempterm;

      message.channel.sendTyping();

	  if(args[0])
	  {
		tempterm = args.join(' ');
	  }
	  else
	  {
		tempterm = queue.currentTrack.title;
	  }

	 
	  var searches = null;
	  
	  if(tempterm.includes('('))
	  {
		var words = tempterm.split("(");
		words.pop();
		tempterm = words[0];
	  }

		// searches = await Client.songs.search(tempterm);
		
		// const firstSong = searches[0];

		// if(typeof firstSong === "undefined")
		// {
		// 	return message.channel.send(`🚫 | Couldn' find lyrics for this song! Please retry or search for an other track!`);
		// }

		// const lyrics = await firstSong.lyrics();
  
		// const embed = new EmbedBuilder()
		// .setColor('#2beddd')
		// .setTitle(`**LYRICS | ${firstSong.featuredTitle}**`)
		// .setDescription(lyrics.length > 4095 ? lyrics.substring(0, 4093) + '...': lyrics)
		// .setFooter({text: `Made by ShambaC#3440`})
  
		// message.channel.send({embeds:[embed]}) 

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
				
						message.channel.send({embeds:[embed]}) 
					})
			})
			.catch(err => {
				console.log(err)
				return message.channel.send(`🚫 | Couldn' find lyrics for this song! Please retry or search for an other track!`)
			})
	     
	    
	},
};