<script>
import WG_player_list_container from '../components/player_list_container.vue'
import wg_game_mod_1 from './GameMod1.vue'
import wg_game_mod_2 from './GameMod2.vue'
import wg_end_game_menu from '../components/endGameMenu.vue'
import wg_startup from '../components/game_startup.vue'
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
        var timerPID = null;
        const started = ref(false)
        const timer = ref({seconds : 0, milliseconds : 0})

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

        const gameEventHandler = (data)=>
        {
            console.log(data)
            if(typeof(data.event)!="undefined" && data.event == "start")
            {               
                start();
            }
            if(typeof(data.event)!="undefined" && data.event == "end")
            {
                endGame();
            }
        }

        const updatePlayerList = (data)=>
        {
            game.playerList = data.playerList;
        }

        const timeReached = ()=>
        {
            console.log("time reached");
            backApp.sendData(backApp.GAME_EVENT,{event : "timeout"})
        }
        const stopTimer =()=>
        {
            if(timerPID != null) clearInterval(timerPID);
        }

        const startTimer = ()=>
        {
            timer.value.seconds = game.timeout;
            timerPID = setInterval(()=>
            {
                                 
                timer.value.seconds -=1;
                if(timer.value.seconds == 0)
                {
                    timeReached();
                    stopTimer();
                    return;
                }
            },1000)
        }
        
        const nextRound = (data)=>
        {
            cards.value = data.round.cards;
            assignment.value = data.round.assignment;
            round.value = data.round.round;
            if(started.value)
            {
                stopTimer();
                startTimer();
            }           
        }

       

        const start= ()=>
        {         
            let time = 4;
            let pid = setInterval(()=>
            {
                time--;
                startupTitle.value = "Starting in "+ time;
                if(time == 0)
                {
                    clearInterval(pid);
                    console.log(game.gameMod)
                    setGameMod(game.gameMod)
                    startTimer(); 
                    started.value = true;
                    console.log("start")
                }
            },1000)
        }          

        return{
            backApp,
            cards,
            assignment,
            startupTitle,
            component,
            game,
            nextRound,
            start,
            endGame,
            round,
            gameEventHandler,
            updatePlayerList,
            timer
        }
    },
    mounted()
    {
        this.backApp.listen(this.backApp.ROUND_GAME_EVENT,this.nextRound);       
        this.backApp.listen(this.backApp.PLAYER_LIST_EVENT, this.updatePlayerList);
        this.backApp.listen(this.backApp.GAME_EVENT, this.gameEventHandler);
        this.backApp.sendData(this.backApp.GAME_EVENT,{event : "ready"});
    },
    unmounted()
    {
        this.backApp.closeEvents(this.backApp.ROUND_GAME_EVENT);
        this.backApp.closeEvents(this.backApp.PLAYER_LIST_EVENT);
        this.backApp.closeEvents(this.backApp.GAME_EVENT);
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
        <div id="game_info">
            <span id="seconds">{{ timer.seconds }} : 0</span>
            <span id="round">#{{ round }}</span>
        </div>
        
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
        width: 100%;
    }
    #round
    {
        font-size: 60px;
        color : #ffffff
    }

    #seconds
    {
        font-size: 60px;
        color : #ffffff;
        margin-right: 20px;
        -webkit-text-size-adjust:none;
    }

    #milliseconds
    {
        font-size: 60px;
        color : #ffffff;
        margin-right: 20px;
        -webkit-text-size-adjust:none;
    }

    

    #game_info
    {
        position :absolute;
        width : max-content;
        z-index: 3;
        padding : 5px;
        margin : 5px;
        right : 0px;
        top : 0px
    }
</style>