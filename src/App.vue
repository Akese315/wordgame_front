
<script>
import { reactive } from '@vue/reactivity';
import { provide} from 'vue';
import {Socket} from './scripts/request.js'

export default 
{
  name: 'App',
  setup()
  {
    const user = reactive({pseudo :"none", hash:"none"})
    const game = reactive({gameHash : "none", owner : "none", points : 0})
    const ringAudio = require("./assets/Water_Drop.mp3");
    const socket = new Socket();
    provide("user", user);
    provide("game",game);
    provide("ringAudio", ringAudio);
    provide("WebSocket",socket)
    return    {
      user : user,
      game : game,
      ringAudio : ringAudio,
      WebSocket : socket
    }
  },


  
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
