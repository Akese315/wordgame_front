<script>
import WG_player_list_container from '../components/player_list_container.vue'
import WGbutton from '../components/button.vue'
import WGprogressBar from '../components/range_slider.vue'
import WGbuttonImage from '@/components/button_image.vue'
import WGmultichoice from '@/components/multichoice.vue'
import game1 from '@/assets/kanji_game_1.png'
import game2 from '@/assets/kanji_game_2.png'
import { ref} from '@vue/reactivity';
import { inject, watch} from 'vue';
import { reactive } from 'vue'

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
        const user = inject("user")
        const game = inject("game")
        const progressBarRound = ref("1");
        const progressBarTime = ref("1");
        
        const rules = reactive({rounds : 1, gameMod :"none", timeout :1, jlptLevel : 5})

        const maxRound = ref(60);
        const maxTimeout = ref(60);
        const isChecked = ref(false);        
        const backApp = inject("backApp") 
        const width = ref("50%")
        const url1 = ref(game1)
        const url2 = ref(game2) 
        const choices = ref([1,2,3,4,5])
        const clickToCopy = ref("Invite Link")

        var canSendNewRules = true;
        
        const showParameters = ()=>
        {
            width.value = "50%"            
        }

        const showGameMod = ()=>
        {
            width.value = "-50%"
        }

        const copyGameHash = ()=>
        {
            console.log("copybutton");
            var clipboardCopy = "https://www.kanjiyarou.com?game="+game.gameHash;            
            navigator.clipboard.writeText(clipboardCopy)
            clickToCopy.value = "Copied !"
            setTimeout(() => {
                clickToCopy.value = "Invite Link"
            }, 2000);
        }

        const errorCallback = (message)=>
        {
            console.log(message)
        }

        const starting = (gameMod)=>
        {
            console.log(gameMod)
            console.log("The game is starting")
            game.gameMod = gameMod;
        }

        const gameEventCallback = (data)=>
        {
            console.log(data)
            if(typeof(data.start) != "undefined")
            {
                starting(data.start)
            }
        }

        const updatePlayerList = (data)=>
        {
            console.log(data.playerList)
            game.playerList = data.playerList;
        }
        
        const setGame = (gameMod)=>
        {
            game.gameMod = gameMod;
            rules.gameMod = gameMod;
        }

        const sendNewRules = async (newRules)=>
        {
            if(!game.isOwner)return;

            if(canSendNewRules)
            {
                canSendNewRules = false;
                setTimeout(()=>
                {
                    console.log("send")
                    backApp.sendData(backApp.UPDATE_RULES_EVENT,newRules);
                    canSendNewRules = true;
                },250);                
            }         
        }

        const launchGame = ()=>
        {
            backApp.sendData(backApp.GAME_EVENT,{event: "launch"})
            console.log("launch")
        }

        const gameRulesUpdate = (data)=>
        {
            console.log(data)
            if(typeof(data.JLPT_level) != "undefined")
            {
                game.jlpt_level = data.JLPT_level;              
                rules.jlptLevel =  data.JLPT_level
            }
            if(typeof(data.gameMod) != "undefined")
            {
                rules.gameMod = data.gameMod;
                game.gameMod = data.gameMod
            }
            if(typeof(data.timeout) != "undefined")
            {
                game.timeout = data.timeout;
                rules.timeout =  data.timeout
            }
            if(typeof(data.rounds) != "undefined")
            {
                rules.rounds = data.rounds;
                game.rounds = data.rounds
            }
        }

        return {
            progressBarRound,
            progressBarTime,
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
            clickToCopy,
            showParameters,
            showGameMod,
            errorCallback,
            launchGame,
            copyGameHash,
            setGame,
            gameRulesUpdate,
            gameEventCallback,
            updatePlayerList,
            rules,
            sendNewRules
        }       
    },
    mounted()
    {
        this.backApp.listen(this.backApp.UPDATE_RULES_EVENT, this.gameRulesUpdate);      
        this.backApp.listen(this.backApp.PLAYER_LIST_EVENT, this.updatePlayerList);

        watch(this.rules,(newRules)=>
        {
            this.sendNewRules(newRules)
        });
    },
    unmounted()
    {
        this.backApp.closeEvents(this.backApp.UPDATE_RULES_EVENT);
        this.backApp.closeEvents(this.backApp.PLAYER_LIST_EVENT);
    }
}
</script>

<template>
    <div id="main">
        <WG_player_list_container v-bind:WG_player_list="this.game.playerList"/>
        <div id="background">
            <div v-if="!game.isOwner" id="rules">
                <h1>Rules :</h1>
                <ul>
                    <li>JLPT level : {{ rules.jlptLevel }}</li>
                    <li>timeout : {{ rules.timeout }}</li>
                    <li>rounds : {{ rules.rounds }}</li>
                    <li>gameMod : {{ rules.gameMod }}</li>
                </ul>
                <h2> Wait the leader to start the game !</h2>
            </div>
            <div v-if="game.isOwner" id="menu">
                <span id="parameters_gamemod">
                    <button id="parameter_button" v-on:click="showParameters">Settings</button>
                    <button id="gamemod_button" v-on:click="showGameMod">Game mode</button>
                </span>
                <div id="sub_menu" v-bind:style="{left : width}">
                    <form id="parameters" @submit.prevent="showGameMod">                
                        <WGmultichoice v-model="this.rules.jlptLevel" v-bind:WG_choices="this.choices" WG_title="jlpt level:"/> 
                        <WGprogressBar v-model="this.progressBarRound"/>
                        <p id="wordsNumber">Round number : {{this.rules.rounds = Math.round(parseInt(this.progressBarRound)*(this.maxRound)/100)}}</p>
                        <WGprogressBar v-model="this.progressBarTime"/>
                        <p id="wordsNumber">Timeout/round : {{this.rules.timeout = Math.round(parseInt(this.progressBarTime)*(this.maxTimeout)/100)}}</p>
                        <WGbutton wg_value ='next'/>
                        <WGbutton type="button" @clickWG="copyGameHash" :wg_value ="clickToCopy "/>
                    </form>
                    <form id="gamemod" @submit.prevent="launchGame">
                        <div id="listGameMod">
                            <WGbuttonImage  v-bind:image_url="url1" v-on:click="setGame('gameMod1')" game_name="Choice" background="1d323c" />
                            <WGbuttonImage  v-bind:image_url="url2" v-on:click="setGame('gameMod2')" game_name="Assembly" background="B0DAEF" />
                        </div>
                        <WGbutton wg_value ='Start'/>
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

    #rules
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
        align-content: center;
    }

    #menu
    {
        background: #FFFFFF;
        max-width: 350px;
        width: 70%;
        height : max-content ;
        max-height: 80%;
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