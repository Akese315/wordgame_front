
<script>
import { reactive } from '@vue/reactivity';
import { provide} from 'vue';
import {BackApp} from './scripts/connection.js'
import {Game} from './scripts/game.js'

export default 
{
  name: 'App',
  setup()
  {
    const user = reactive({pseudo :"none", hash:"none"})
    const game = reactive(new Game())
    const ringAudio = require("./assets/Water_Drop.mp3");
    const backApp = new BackApp(game);
    user.hash = localStorage.getItem("userID");
    user.pseudo = localStorage.getItem("pseudo");
    provide("user", user);
    provide("game",game);
    provide("ringAudio", ringAudio);
    provide("backApp",backApp)

    const openConnectionCallback = (data)=>
    {
      console.log(data.message);
      user.hash = data.userHash;
      localStorage.setItem("userID",user.hash)
      console.log(localStorage.getItem("userID"))
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
      openConnectionCallback,
      openConnectionErrorCallback
    }
  },

  mounted()
  { 
    this.backApp.openConnection("user="+this.user.hash,this.openConnectionCallback,this.openConnectionErrorCallback);
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
