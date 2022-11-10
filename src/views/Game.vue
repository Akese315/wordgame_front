<script>
import WG_player_list_container from '../components/player_list_container.vue'
import wg_game_mod_1 from './GameMod1.vue'
import wg_game_mod_2 from './GameMod2.vue'
import { inject} from 'vue';

export default {
    name : "wg_game",
    components :
    {
        WG_player_list_container,
        wg_game_mod_1,
        wg_game_mod_2
    },
    setup()
    {
        const user = inject("user")
        const game = inject("game")
        var component;
        if(game.gameMod == "gameMod1")
        {
            component = wg_game_mod_1
        }else
        {
            component = wg_game_mod_2
        }

        return{
            user,
            component,
            game
        }
    }

  
}
</script>

<template>
    <div id="main">
        <WG_player_list_container v-bind:WG_player_list="game.playerList"/>
        <component v-bind:is="component"></component>
   </div>
</template>

<style scoped>
    #main
    {
        display:flex;
        flex-direction: row;
        height : 100%;
        position:relative;
    }
    #background
    {   
        width : 100%;
    }
</style>