<script>
import WG_player_list_container from '../components/player_list_container.vue'
import wg_game_mod_1 from './GameMod1.vue'
import wg_game_mod_2 from './GameMod2.vue'
import wg_end_game_menu from '../components/endGameMenu.vue'
import wg_startup from '../components/game_startup_kanjiyarou.vue'
import { inject,shallowRef} from 'vue';
import { ref } from 'vue'

export default {
    name : "wg_game",
    components :
    {
        WG_player_list_container,
        wg_end_game_menu,
        wg_game_mod_1,
        wg_game_mod_2,
        wg_startup
    },
    beforeUnmount()
    {
        this.backApp.closeEvents("ready");
    },
    setup()
    {
        const game = inject("game")
        const backApp = inject("backApp")
        const cards = ref(new Array)
        const assignment = ref("");
        const round = ref(0)
        const startupTitle = ref("Starting...")
        var component = shallowRef("")

        component.value = wg_startup;

        const endGame =()=>
        {
            console.log("game ended")
            component.value = wg_end_game_menu;
        }

        const setGameMod = (gameMod)=>
        {
            if(gameMod == "gameMod1")
            {
                component.value = wg_game_mod_1
            }
            if(gameMod == "gameMod2")
            {
                component.value = wg_game_mod_2
            }
        }        

        const nextRound = (data)=>
        {
            console.log(data)
            cards.value = data.round.cards;
            assignment.value = data.round.assignment;
            round.value = data.round.round;
        }

        const start= (response)=>
        {            
           
            nextRound(response)
            if(response.hasStarted)
            {
                setGameMod(game.gameMod);
                return;
            }
            let time = 3;
            let pid = setInterval(()=>
            {
                time--;
                startupTitle.value = "Starting in "+ time;
                if(time == 0)
                {
                    clearInterval(pid);
                    setGameMod(game.gameMod)
                }
            },1000)
        }

        const setReady = ()=>
        {
            backApp.sendRequest("ready",{isReady : true},start);
        }        
        
        backApp.setRoundCallback(nextRound)
        backApp.setEndGameCallback(endGame);
        setReady();

        return{
            backApp,
            cards,
            assignment,
            startupTitle,
            component,
            game,
            nextRound,
            start
        }
    }
}
</script>

<template>
    <div id="main">
        <WG_player_list_container v-bind:WG_player_list="game.playerList"/>
        <component 
         v-bind:is="component" 
         v-bind:card_array="cards"
         v-bind:assignment_string="assignment" 
         v-bind:WG_rankingList="game.rankingList"
         v-bind:wg_time="startupTitle"
        ></component>
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