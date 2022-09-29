
<script>
import { reactive } from '@vue/reactivity';
import { provide} from 'vue';


export default 
{
  name: 'App',
  setup()
  {
    const user = reactive({pseudo :"none", hash:"none"})

    provide("user", user);
    return    {
      user : user
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
