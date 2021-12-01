const { MessageEmbed } = require('discord.js');
const Genius = require("genius-lyrics");
const Client = new Genius.Client("token or blank");

module.exports = {
    name: 'lyrics',
    aliases: [],
	category: 'Music',
    utilisation: '{prefix}lyrics [song name]',
	description: 'Displays the lyrics of the current track or the track you searched',

    async execute(client, message, args) {
      const queue = player.getQueue(message.guild.id);

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
		tempterm = queue.current.title;
	  }

	 
	  var searches = null;
	  
	  if(tempterm.includes('('))
	  {
		var words = tempterm.split("(");
		words.pop();
		tempterm = words[0];
	  }

		searches = await Client.songs.search(tempterm);
		
		const firstSong = searches[0];

		if(typeof firstSong === "undefined")
		{
			return message.channel.send(`🚫 | Couldn' find lyrics for this song! Please retry or search for an other track!`);
		}

		const lyrics = await firstSong.lyrics();
  
		
  
		const embed = new MessageEmbed()
		.setColor('#2beddd')
		.setTitle(`**LYRICS | ${firstSong.featuredTitle}**`)
		.setDescription(lyrics)
		.setFooter(`Made by ShambaC#3440`)
  
		message.channel.send({embeds:[embed]}) 
	     
	    
	},
};