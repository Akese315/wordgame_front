<script>
import WG_player_list_container from '../components/player_list_container.vue'
import WGbutton from '../components/button_wordgame.vue'
import WGprogressBar from '../components/range_slider_wordgame.vue'
import WGbuttonImage from '@/components/button_image_wordgame.vue'
import WGmultichoice from '@/components/multichoice_wordgame.vue'
import game1 from '@/assets/kanji_game_1.png'
import game2 from '@/assets/kanji_game_2.png'
import { ref } from '@vue/reactivity';
import { inject} from 'vue';
import { useRouter } from 'vue-router'

export default {
    name : "wg_lobby",
    components :
    {
        WG_player_list_container,
        WGbutton,
        WGbuttonImage,
        WGprogressBar,
        WGmultichoice
    },
    setup() //ne peut pas utiliser this dans cette fonction
    {
        const progressBarRound = ref("1");
        const progressBarTime = ref("1");
        const round = ref(1);
        const timeout = ref(1)
        const maxRound = ref(60);
        const maxTimeout = ref(60);
        const isChecked = ref(false);
        const user = inject("user")
        const game = inject("game")
        const backApp = inject("backApp") 
        const router = useRouter();
        const width = ref("50%")
        const url1 = ref(game1)
        const url2 = ref(game2) 
        const choices = ref([1,2,3,4,5])
        const jlptLevel = ref(5)

        const showParameters = ()=>
        {
            width.value = "50%"            
        }

        const showGameMod = ()=>
        {
            width.value = "-50%"
        }

        const errorCallback = (message)=>
        {
            console.log(message)
        }

        const redirectToGame =(gameMod)=>
        {
            game.gameMod = gameMod;
            router.push({ path: '/game'})
        }

        const isStarting = ()=>
        {
            console.log("The game is starting")
        }

        const setGame =(gameMod)=>
        {
            game.gameMod = gameMod;
        }

        const startGame =()=>
        {
            backApp.sendRequest("launch",
            {jlpt : jlptLevel.value, round: round.value, gameMod : game.gameMod, timeout : timeout.value, userHash: user.hash},isStarting,errorCallback)
        }

        backApp.setLaunchCallback(redirectToGame)

        return {
            progressBarRound,
            progressBarTime,
            round,
            timeout,
            maxTimeout,
            maxRound,
            isChecked,
            user,
            game,
            backApp,
            width,
            url1,
            url2,
            choices,
            jlptLevel,
            showParameters,
            showGameMod,
            errorCallback,
            startGame,
            setGame
        }
    }
}
</script>

<template>
    <div id="main">
        <WG_player_list_container v-bind:WG_player_list="this.game.playerList"/>
        <div id="background">
            <div id="menu">
                <span id="parameters_gamemod">
                    <button id="parameter_button" v-on:click="showParameters">Parameters</button>
                    <button id="gamemod_button" v-on:click="showGameMod">Mode de jeu</button>
                </span>
                <div id="sub_menu" v-bind:style="{left : width}">
                    <form id="parameters" @submit.prevent="showGameMod">                
                        <WGmultichoice v-model="this.jlptLevel" v-bind:WG_choices="this.choices" WG_title="jlpt level:"/> 
                        <WGprogressBar v-model="this.progressBarRound"/>
                        <p id="wordsNumber">Nombre de round : {{this.round = Math.round(parseInt(this.progressBarRound)*(this.maxRound)/100)}}</p>
                        <WGprogressBar v-model="this.progressBarTime"/>
                        <p id="wordsNumber">Timeout/round : {{this.timeout = Math.round(parseInt(this.progressBarTime)*(this.maxTimeout)/100)}}</p>
                        <WGbutton wg_value ='Suivant'/>
                    </form>
                    <form id="gamemod" @submit.prevent="startGame">
                        <div id="listGameMod">
                            <WGbuttonImage v-bind:image_url="url1" v-on:click="setGame('gameMod1')" game_name="Choice" background="1d323c" />
                            <WGbuttonImage v-bind:image_url="url2" v-on:click="setGame('gameMod2')" game_name="Assembly" background="B0DAEF" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>       
</template>

<style scoped>

    #wordsNumber
    {
        margin : 0;
        padding : 0 5px;
        text-align: center;
    }
    #main
    {
        display:flex;
        flex-direction: row;
        height : 100%;
        position:relative;
    }
    #menu
    {
        background: #FFFFFF;
        width: 350px;
        height : max-content ;
        display: flex;
        flex-direction: column;
        justify-content: center;  
        border-radius: 10px;
        overflow: hidden;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;     
        align-items: center;   
    }
    #sub_menu
    {
        position : relative;
        width : 200%;
        display: inline-flex;
        height: 300px;
        left : 50%;
        transition: 500ms;
    }
    #gamemod
    {
        width : 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

    }

    #listGameMod
    {
        display: grid;
        align-items: center;
        width : 100%;
        position : relative;
        height : 70%;
        grid-template-columns: 1fr 1fr;
    }

    #parameters_gamemod
    {         
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    #parameters_gamemod button
    {
        background-color: #FFFFFF;
        border: 1px solid  #d4d4d4;
        font-size: 25px ;
        font-weight: bold;
        width: 100%;
        cursor : pointer;
    }
    #parameters_gamemod button:hover
    {
        background-color: #d4d4d4;
    }

    #parameters_gamemod button:focus
    {
        background-color: #d4d4d4;
    }

    #parameters
    {
        height : 100%;
        display : flex;
        width: 100%;
        flex-direction: column;
        justify-content: center;  
        align-items: center;
    }
    #gamemod_button
    {
        border-top-right-radius: 10px;
    }
    #parameter_button
    {
        border-top-left-radius: 10px;
    }

    #background
    {
        background-image: url("https://64.media.tumblr.com/f6395bca7a86e8efa6807271b64fb7f4/tumblr_p4jpsnKZQu1qze3hdo1_500.gifv");
        width:100%;
        background-size: cover; 
        display :flex;
        justify-content: center;         
        align-items: center; 
    }

    
</style>