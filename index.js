//Require the necessary discord,js classes
const {Client,Events,GatewayIntentsBits, GatewayIntentBits, Collection, ClientApplication} = require('discord.js');
require('dotenv').config;
const fs = require('fs')
const path = require('path');
const { CLIENT_RENEG_WINDOW } = require('tls');
// Create a new Client instance
const client = new Client({
  intents:[
    GatewayIntentBits.Guilds
  ]
});
client.commands = new Collection();
const foldersPath = path.join(__dirname,'commands');
const commandFolders = fs.readdirSync(foldersPath);
for(const folder of commandFolders){
  const commandsPath = path.join(foldersPath,folder);
  const commonFiles = fs.readdirSync(commandsPath).filter(file=>file.endsWith('.js'));
  for (const file of commonFiles){
    const filePath = path.join(commandsPath,file);
    const command = require(filePath);
    if('data' in command && 'execute' in command){
      client.commands.set(command.data.name,command);
    }else{
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
    }
  }
}

const eventsPath = path.join(__dirname,'events');
const eventFiles = fs.readdirSync(eventsPath).filter(files=>files.endsWith('.js'));

for(const file of eventFiles){
  const filePath =path.join(eventsPath,file);
  const event = require(filePath);
  if(event.once){
    client.once(event.name,(...args)=>event.execute(...args));
  }else{
    client.on(event.name,(...args)=> event.execute(...args))
  }
}



client.login(process.env.TOKEN);
