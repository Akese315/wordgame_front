<script>
import WG_player_list_container from '../components/player_list_container.vue'
import WGbutton from '../components/button_wordgame.vue'
import WGtoggleButton from '../components/toggle_button_wordgame.vue'
import WGprogressBar from '../components/range_slider_wordgame.vue'
import { ref } from '@vue/reactivity';
import { inject} from 'vue';

export default {
    name : "wg_lobby",
    components :
    {
        WG_player_list_container,
        WGbutton,
        WGtoggleButton,
        WGprogressBar
    },
    setup() //ne peut pas utiliser this dans cette fonction
    {
        const progressBar = ref("");
        const wordsNumber = ref(0);
        const totalWordsNumber = ref(50);
        const isChecked = ref(false);
        //const playerList = ref([{'pseudo' : 'noob', 'point': -20},{'pseudo' : 'bonjour', 'point': 0},{'pseudo' : 'boss', 'point': 1000}]);
        const user = inject("user")
        const game = inject("game")
        const backApp = inject("backApp") 

        const errorCallback = (message)=>
        {
            console.log(message)
        }

        return {
            progressBar,
            wordsNumber,
            totalWordsNumber,
            isChecked,
            user,
            game,
            backApp,
            errorCallback
        }
    }
}
</script>

<template>
    <div id="main">
        <WG_player_list_container v-bind:WG_player_list="this.game.playerList"/>
        <div id="menu">
            <form id="startup">
                <h1>Parameters</h1>
                <WGtoggleButton parameter_label="French" v-model="this.isChecked"/> 
                <WGprogressBar v-model="this.progressBar"/>
                <p id="wordsNumber">Nombre de mot : {{Math.round(this.progressBar*totalWordsNumber/100)}}</p>

                <WGbutton wg_value ='Commencer'/>
            </form>
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
    #startup
    {
        background: #FFFFFF;
        width: 30%;
        height : max-content;
        display: flex;
        flex-direction: column;
        justify-content: center;    
        border-radius: 10px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;     
        align-items: center;   
    }
    #menu
    {
        background-image: url("../assets/artist-japanese-paint.jpg");
        width:100%;
        background-size: cover; 
        display :flex;
        justify-content: center;         
        align-items: center; 
    }
</style>