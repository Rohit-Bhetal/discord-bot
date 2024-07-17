//Require the necessary discord,js classes
const {Client,Events,GatewayIntentsBits} = require('discord.js');
const {token} = require('./config.json');

// Create a new Client instance
const client = new Client({
  intents:[
    GatewayIntentsBits.Guilds
  ]
});

client.once(
  Events.ClientReady,readyClient =>{
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  }
)