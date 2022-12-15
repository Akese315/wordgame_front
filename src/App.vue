<script>
import { reactive } from '@vue/reactivity';
import { provide} from 'vue';
import {BackApp} from './scripts/connection.js'
import {Game} from './scripts/game.js'
import { useRouter, useRoute } from 'vue-router';

export default 
{
  name: 'App',
  setup()
  {
    const user = reactive({pseudo :"none", hash:"none"})
    const game = reactive(new Game())
    const ringAudio = require("./assets/Water_Drop.mp3");
    const router = useRouter(); 
    const route = useRoute();
    const backApp = new BackApp(game);
    
    user.hash = localStorage.getItem("userHash");
    user.pseudo = localStorage.getItem("pseudo");
    game.gameHash = route.query.game;
    provide("user", user);
    provide("game",game);
    provide("ringAudio", ringAudio);
    provide("backApp",backApp)

    const openConnectionCallback = (data)=>
    {
      console.log(data)
      if(typeof(data.userHash) !="undefined")
      {
        user.hash = data.userHash; 
        localStorage.setItem("userHash", user.hash);
      }  
      if(typeof(data.userInformation) != "undefined")
      {
        if(typeof(data.userInformation.pseudo) !="undefined")
        {
          user.pseudo = data.userInformation.pseudo;
          localStorage.setItem("pseudo", user.pseudo);
        }
        
      }        
    }

    const redirectCallback = (redirect)=>
    {
      switch(redirect)
      {
        case "game" :
          console.log("joined the game")
          router.push({ path: "/game"});
          break;
        case "home" :
          console.log("welcome :)")  
          router.push({ path: '/'});
          break;
        case "lobby" :
          console.log("joined the lobby")  
          router.push({ path: "/lobby"});
          break;
      }
    }

    const openConnectionErrorCallback = (data)=>
    {
      console.error(data.error)
    }

    return{
      user,
      game,
      ringAudio,
      backApp,
      redirectCallback,
      openConnectionCallback,
      openConnectionErrorCallback
    }
  },

  mounted()
  { 
    this.backApp.setRedirectCallback(this.redirectCallback)
    this.backApp.openConnection({userHash: this.user.hash},this.openConnectionCallback,this.openConnectionErrorCallback);
  }  
}
</script>


<template>
  <router-view/> 
</template>


<style>

@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500&display=swap');
#app {
height: 100%;
font-family: 'Chakra Petch', sans-serif;
}
body{
 margin : 0;
 height : 100%;
}
html
{
  height : 100%;
}

</style>
