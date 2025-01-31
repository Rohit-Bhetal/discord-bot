const { Events } = require('discord.js');

module.exports={
    name: Events.InteractionCreate,
    async execute(interaction){
        if(!interaction.isChatInputCommand()) return;
        const command =interaction.client.commands.get(interaction.commandName);
        if(!command){
          console.error(`No command matching ${interaction.commandName} was found`)
        }
        try{
          await command.execute(interaction);
        }catch(err){
          if (interaction.replied || interaction.deferred) {
                  await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
              } else {
                  await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
              }
      
        }
      }
}