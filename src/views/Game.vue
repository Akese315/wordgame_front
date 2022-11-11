<script>
import WG_player_list_container from '../components/player_list_container.vue'
import wg_game_mod_1 from './GameMod1.vue'
import wg_game_mod_2 from './GameMod2.vue'
import wg_end_game_menu from '../components/endGameMenu.vue'
import { inject,shallowRef} from 'vue';

export default {
    name : "wg_game",
    components :
    {
        WG_player_list_container,
        wg_end_game_menu,
        wg_game_mod_1,
        wg_game_mod_2
    },
    setup()
    {
        const user = inject("user")
        const game = inject("game")
        const backApp = inject("backApp")
        var component = shallowRef("")
        if(game.gameMod == "gameMod1")
        {
            component.value = wg_game_mod_1
        }else
        {
            component.value = wg_game_mod_2
        }

        const endGame =(response)=>
        {
            component.value = wg_end_game_menu;
            game.rankingList = response.rankingList
        }


        backApp.setEndGameCallback(endGame)


        return{
            user,
            backApp,
            component,
            game
        }
    }

  
}
</script>

<template>
    <div id="main">
        <WG_player_list_container v-bind:WG_player_list="game.playerList"/>
        <component v-bind:is="this.component" v-bind:rankingList="game.rankingList"></component>
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