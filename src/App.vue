<script>
import { reactive } from '@vue/reactivity';
import { provide} from 'vue';
import {BackApp} from './scripts/connection.js'
import {Game} from './scripts/game.js'
import { useRouter } from 'vue-router';
import panel_error from './components/panel_error.vue';
import { ref } from 'vue';

export default 
{
  name: 'App',
  components:
  {
    panel_error
  },
  setup()
  {
    const user = reactive({pseudo :"none", hash:"none"})
    const game = reactive(new Game())
    const router = useRouter();   
    const backApp = new BackApp(game);
    const error = ref("");
    const info = ref("");
    user.hash = localStorage.getItem("userHash");
    user.pseudo = localStorage.getItem("pseudo");
    
    provide("user", user);
    provide("game",game);
    provide("backApp",backApp)

    const openConnectionCallback = (data)=>
    {      
      if(typeof(data.userInformation) != "undefined")
      {
        if(typeof(data.userInformation.pseudo) !="undefined")
        {
          user.pseudo = data.userInformation.pseudo;
          localStorage.setItem("pseudo", user.pseudo);
        }
        if(typeof(data.userInformation.userHash) !="undefined")
        {
          user.hash = data.userInformation.userHash; 
          localStorage.setItem("userHash", user.hash);
        }      
        if(typeof(data.userInformation.icon) !="undefined")
        {
          user.icon = data.userInformation.icon; 
          localStorage.setItem("icon", user.icon);
        }         
      }        
    }

    

    const errorCallback = (data)=>
    {
      error.value = data;
      console.log(data)
      setTimeout(()=>
      {
        error.value = "";
      },3000)
    }

    const infoCallback = (data)=>
    {
      info.value = data;
      setTimeout(()=>
      {
        info.value = "";
      },3000)
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
      console.error(data.errzor)
    }

    return{
      user,
      error,
      game,
      backApp,
      redirectCallback,
      openConnectionCallback,
      openConnectionErrorCallback,
      errorCallback,
      infoCallback
    }
  },

  mounted()
  { 
    this.backApp.openConnection({userHash: this.user.hash},this.openConnectionCallback,this.openConnectionErrorCallback);
    this.backApp.setRedirectCallback(this.redirectCallback);
    this.backApp.listen("redirect",this.redirectCallback);
    this.backApp.listen("error", this.errorCallback);
    this.backApp.listen("info", this.infoCallback)
  }  
}
</script>


<template>
  <panel_error v-bind:errorProp="error"/>
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
