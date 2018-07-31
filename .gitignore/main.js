const Discord = require('discord.js')
const moment = require("moment");

var client = new Discord.Client();
var prefix = ("!");

client.on('ready', () =>{
    client.user.setActivity("💰TeamLobby 💰 | !help",{
        type: "STREAMING",
        url: "https://www.twitch.tv/yestarfr"
    });
    client.user.setStatus('dnd')
    var ready_embed = new Discord.RichEmbed()
    .setTitle("✅ Bot connecté")
    .setColor('0x38DA00')
    .setTimestamp()
    client.channels.find("name", "bot-debug").send(ready_embed)
    console.log('Bot connecté!');
});

client.login('NDY1MjkzODY0MDU2Mzg5NjM5.DiLekA.5akcWCLxQlgdyNXP0ZPsO_GCJBc');

client.on("guildMemberAdd", member => {
    member.guild.channels.find("name", "accueil").send(`:heavy_plus_sign: Bienvenue à **${member.user.username}** sur 💰 TeamLobby 💰 !`)
    member.addRole("name", "Membres")

    var role = member.guild.roles.find('name', 'Membres');
    member.addRole(role)
});

client.on("guildMemberRemove", member => {
    member.guild.channels.find("name", "accueil").send(`:heavy_minus_sign: **${member.user.tag}** à quitté 💰 TeamLobby 💰 !`)
});

client.on('message', message => {

    if (message.content === prefix + "ping"){
        message.channel.send('**Mon Ping:** `' + Math.round(client.ping) + 'ms`');
    }

    if (message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
            .setColor('0x900000')
            .setThumbnail(message.guild.iconURL)
            .setDescription("**📋 Commandes:**")
            .addField("📌 Utiles", "`!help` Pour voir les commandes \n`!ping` Pour voir le ping du bot \n`!serverinfo` Pour voir les stats du serveur \n`!userinfo @mention` Pour voir les stats de la personne mentionné \n`!avatar @mention` Pour voir l'avatar de la personne mentionné \n`!logo` Pour avoir le logo de TeamLobby \n`!invite` Pour avoir l'invite du serveur")
            .addField("⚠️ Staff", "`!botinvite` Pour inviter le bot \n`!lobby-on` Pour activer les lobby \n`!lobby-off` Pour désactiver les lobby")

            .setTimestamp()
            .setFooter("By Yestar#7241")
            message.delete();
            message.author.send(help_embed);
            message.channel.send('✅ ' + `${message.member}` + ', je vous envoie les commandes en privé.');
    }


    if (message.content === prefix + "serverinfo"){
        var serverinfo_embed = new Discord.RichEmbed()
            .setColor('0x900000')
            .setTitle('**📃 Info Serveur:**')
            .setThumbnail(message.guild.iconURL)

            .addField("Nom:", "`" + message.guild.name + "`", true)
            .addField("Propriétaire:", message.guild.owner, true)
            .addField("Membres:", message.guild.memberCount, true)
            .addField("Membres en ligne:", message.guild.presences.size, true)
            .addField("Salons:", message.guild.channels.size, true)
            .addField("Rôles:", message.guild.roles.size, true)
            .addField("Région:", message.guild.region, true)
            .addField("Création:", moment.utc(message.guild.createdAt).format("MMMM Do, YYYY"), true)
            
            .setTimestamp()
            .setFooter("ID: " + message.guild.id)
            message.channel.send(serverinfo_embed);
    }

    if (message.content.startsWith(prefix + "userinfo") || message.content.startsWith(prefix + "ui")){
        let user = message.mentions.users.first() ? message.mentions.users.first() : message.author
  let member = message.guild.member(user);
  let roles = [];
  if (member.roles.size > 0) {
    member.roles.forEach(r => {
        if(
    !r.name.includes("everyone")
  )
    {
        roles.push(r.name);
    }
  })
  } else {
    roles = "no";
  }
  let ttt = (member.roles.size > 0) ? roles.length : "0";
  let wato = (roles.length > 0) ? roles.join(", ") : "None";
  let game = (!!user.presence && user.presence !== null && user.presence.game !== null && user.presence.game.name !== null) ? user.presence.game.name : "Rien"
  let embed = {
    title: "📃 Info " + user.username,

    color: 0x900000,

    thumbnail: {
        url: user.displayAvatarURL,
    },
    fields: [{
        name: "Pseudo Discord:",
        value: user.tag,
        inline: true
    }, {
        name: "ID Discord:",
        value: user.id,
        inline: true
    }, {
        name: "Status:",
        value: (user.presence !== null && user.presence.status !== null) ? user.presence.status : "Offline",
        inline: true
    }, {
        name: "Joue à:",
        value: game,
        inline: true
    }, {
        name: "Rôles (" + ttt + "):",
        value: "`" + wato + ",` ",
        inline: false
    }, {
        name: "Compte créer le:",
        value: moment.utc(user.createdAt).format("MMMM Do, YYYY"),
        inline: true
    }, {
        name: "Sur le serveur depuis:",
        value: moment.utc(member.joinedAt).format("MMMM Do, YYYY"),
        inline: true
    }],

    timestamp: new Date(),
    footer: {
        text: "© TeamLobby"
    }
  }
  message.channel.send("", {
    embed
    });
    }

    if (message.content.startsWith(prefix + "avatar")){
        let user = message.mentions.users.first() ? message.mentions.users.first() : message.author
  let embed = {
    author: {
        name: "Avatar de " + user.username,
        icon_url: user.displayAvatarURL
    },
    color: 0x900000,

    image: {
        url: user.displayAvatarURL,
    },

    timestamp: new Date(),
    footer: {
        text: "© TeamLobby"
    }
  }
  message.channel.send("", {
    embed
    });
    }

    if (message.content === prefix + "invite"){
        var invite_embed = new Discord.RichEmbed()
        .setColor('0x900000')
        .setTitle(message.guild.name)
        .setThumbnail(message.guild.iconURL)

        .addField("Lien d'invitation Discord:", "https://discord.gg/8Fk5HBS")

        .setTimestamp()
        .setFooter("© TeamLobby")
        message.delete();
        message.author.send(invite_embed);
    }

    if (message.content === prefix + "botinvite")
        if (!message.member.roles.some(r => ["Owner 💰TeamLobby💰"].includes(r.name))){
        message.channel.send(`⚠️ ` + `${message.member}` + `, Tu n'es pas propriétaire du BOT TeamLobby !`)
        }else{
        var invite_embed = new Discord.RichEmbed()
        .setColor('0x900000')
        .setTitle("BOT 💰TeamLobby💰")

        .addField("Lien d'invitation du BOT:", "[ici](https://discordapp.com/oauth2/authorize?client_id=465293864056389639&scope=bot&permissions=36702216)")

        .setTimestamp()
        .setFooter("© TeamLobby")
        message.delete();
        message.author.send(invite_embed);
    }

    const bannedInvite = [
        "https://discord.gg/",
        "https://discordapp.com/invite/",
        "https://discord.me/"
    ];

    if(bannedInvite.some(invite => message.content.includes(invite))) {
        if (message.member.roles.some(r => ["Staff"].includes(r.name))) return
        message.delete()
        message.channel.send('⚠️ ' + `${message.member}` + ', les liens Discord ne sont pas autorisés !');

    }

    if (message.content === prefix + "logo"){
        var logo_embed = new Discord.RichEmbed()
        .setColor('0x900000')
        .setTitle("Logo 💰TeamLobby💰")
        .setImage('http://cuffslash.esy.es/logo_teamlobby.png')

        .setTimestamp()
        .setFooter("© TeamLobby")
        message.channel.send(logo_embed);

    }

    if (message.content === prefix + "lobby-on")
    if (!message.member.roles.some(r => ["Owner 💰TeamLobby💰"].includes(r.name))){
    message.channel.send(`⚠️ ` + `${message.member}` + `, Tu doit être responsable de TeamLobby pour exécuter cette commande !`)
    }else{
    var status_on_embed = new Discord.RichEmbed()
    .setColor('0x900000')
    .setTitle("⚠️ Statut Service TeamLobby ⚠️")
    .setDescription("✅ Lobby ON (100% Safe)")

    .setTimestamp()
    .setFooter("© TeamLobby")
    message.delete()
    message.guild.channels.find("name", "statut-service").bulkDelete(2)
    message.guild.channels.find("name", "statut-service").send(status_on_embed)
    message.guild.members.forEach((m) =>{
        m.send(status_on_embed)
    })
    }

    if (message.content === prefix + "lobby-off")
    if (!message.member.roles.some(r => ["Owner 💰TeamLobby💰"].includes(r.name))){
    message.channel.send(`⚠️ ` + `${message.member}` + `, Tu doit être responsable de TeamLobby pour exécuter cette commande !`)
    }else{
    var status_off_embed = new Discord.RichEmbed()
    .setColor('0x900000')
    .setTitle("⚠️ Statut Service TeamLobby ⚠️")
    .setDescription("❌ Lobby OFF (Risqué)")

    .setTimestamp()
    .setFooter("© TeamLobby")
    message.delete()
    message.guild.channels.find("name", "statut-service").bulkDelete(2)
    message.guild.channels.find("name", "statut-service").send(status_off_embed)
    message.guild.members.forEach((m) =>{
        m.send(status_off_embed)
    })
    }
});
