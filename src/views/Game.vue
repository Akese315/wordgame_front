<script>
import WGinput from '../components/input_wordgame.vue'
import WGbutton from '../components/button_wordgame.vue'

export default {
    name : "wg_game",
    components :
    {
        WGinput,
        WGbutton
    }
  
}
</script>

<template>
    <h1>Game</h1>
    <WGinput wg_placeholder="start"/>
    <WGbutton wg_value="go" />
</template>

<style scoped>

</style>