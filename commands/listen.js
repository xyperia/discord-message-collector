const DiscordJS = require('discord.js')
const pg = require('pg')
require('dotenv').config()

const connection = new pg.Pool({
    host: process.env.DBSERVER,
    database: process.env.DBNAME,
    port: process.env.DBPORT,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    ssl: { rejectUnauthorized: false, }
  })
  
  connection.connect()

module.exports = {
  callback: (message) => {
    const filter = (m) => {
      return true;
    }

    const collector = new DiscordJS.MessageCollector(message.channel, filter)
    collector.on('collect', (m) => {

        // console.log("#############");
        // console.log("Message ID: ", m.id);
        // console.log("Message Content: ", m.content);
        // console.log("Message Timestamp: ", m.createdTimestamp);
        // console.log("Sender ID: ", m.author.id);
        // console.log("Sender Username: ", m.author.username);
        // console.log("https://cdn.discordapp.com/avatars/" + m.author.id + "/" + m.author.avatar + ".png");

        rowvalue = '(\'' + m.id + '\', ' +
        '\'' + m.content + '\', ' +
        '\'' + m.createdTimestamp + '\', '
        + '\'' + m.author.id + '\', ' +
        '\'' + m.author.username + '\', ' +
        '\'https://cdn.discordapp.com/avatars/' + m.author.id + '/' + m.author.avatar + '.png\')';

        insertData(rowvalue);
    })

    function insertData(value){

        var sql = 'INSERT INTO m_message VALUES' + value
        console.log(sql)
        connection.query(sql)
    }
  },
}

