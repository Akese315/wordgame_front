<script>
import WGinput from '../components/input.vue'
import WGbutton from '../components/button.vue'
import WGerror from '../components/error.vue'
import { inject} from 'vue'
import { ref } from '@vue/reactivity';
import { useRoute } from 'vue-router';

export default {

    name: "wg_home",

    components :
    {
        WGinput,
        WGbutton,
        WGerror
    },
    setup()
    {
        //variables
        const pseudoInput = ref("");
        const errorInput = ref("");
        const bounce = ref(false);
        const user = inject("user");
        const game = inject("game");
        const backApp = inject("backApp"); 
        const route = useRoute();  
        game.gameHash = route.query.game;

        const ErrorBounceAnimation = ()=>
        {
            bounce.value = true;
            setTimeout(() => {bounce.value = false;}, 1000); 
        }

        const createGameCallback =(response)=>
        {
            game.playerList = response.playerList;    
            game.gameHash = response.gameHash;
            game.isOwner = response.isOwner;
        }

        const joinGameCallback = (response)=>
        {
            game.isOwner = response.isOwner;
            game.playerList = response.playerList;
        }

        const setGame = (response)=>
        {
            //create game
            user.pseudo = response.pseudo; //set the pseudo got by the server
            localStorage.setItem("pseudo", user.pseudo) //save the data in the localStorage
            if(typeof(game.gameHash) != "undefined" )
            {                
                console.log("joining...")                
                backApp.sendRequest("game:join",{userHash : user.hash, gameHash : game.gameHash},joinGameCallback);         
            }
            else
            {
                console.log("creating game...")                
                backApp.sendRequest("game:create",{userHash : user.hash}, createGameCallback);   
            }
        }        

        const setPseudo = ()=>
        {   
            console.log("setting pseudo...")
            backApp.sendRequest("player:pseudo",{pseudo : pseudoInput.value, userHash : user.hash},setGame)                   
        }        

        // -> les fonctions sont rangés par ordres d'utilisations
    
        return{
            pseudoInput,
            errorInput,
            backApp,
            bounce,
            user,
            ErrorBounceAnimation,
            setPseudo
        }
    }
}
</script>

<template>
    <div id ="background">
        <div id="main_card">
            <h1>Welcome to the KanjiYarou!</h1>
            <h2>ワードゲームへようこそ  </h2>     
               <form @submit.prevent="setPseudo" >
                    <WGinput v-model="this.pseudoInput" wg_placeholder="Pseudo"/>                
                    <WGbutton wg_value ='Play'/>  
                    <WGerror v-bind:WG_value="this.errorInput" v-bind:Bounce="this.bounce"/>
                </form>            
        </div>
        <span id="author"><a href="https://www.patreon.com/1041uuu" target="_blank"> wallpaper : <br>1041uuu</a></span>
    </div>
</template>

<style scoped>

    #main_card
    {     
        background-color: #f5f5f5;        
        width: 70%;
        max-width: 500px;
        height : min-content;
        padding : 20px;
        border-radius:30px; 
        z-index: 2;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    }

    

    h1
    {
        margin-top: 0;
        padding-top : 20px;
        text-align: center;
        color: #3499eb;
        margin-bottom: 0;
    }

    h2
    {
        font-size: 20px;
        margin-top: 0;
        text-align: center;
        color: #3499eb;
    }

    h3
    {
        font-size: 20px;
        margin-top: 0;
        text-align: center;
        color: #3499eb;
    }

    #background
    {
        position : absolute;
        width: 100%;
        height: 100%;
        background-image: url('https://64.media.tumblr.com/4e0e28821627a1e566134edef9b0b20b/tumblr_inline_p46bls2tji1qzc0ri_500.gifv');
        background-size:cover;         
        display :flex;
        justify-content: center;         
        align-items: center;        
    }

    form
    {
            
        display: flex;
        flex-direction: column;
        align-items: center;
        
    }

    #author
    {
        position : absolute;
        z-index: 2;
        font-size: 16px;
        left : 14%;
        top : 65%;
        max-height : 50px;
        max-width: 100px;
        padding : 5px;
        text-align: center;
        border-radius: 10px;
        background: rgb(68,66,62);
        background: linear-gradient(87deg, rgba(68,66,62,1) 0%, rgba(89,78,53,1) 100%);
        border : solid 2px rgb(64, 55, 31);
        box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
    }

    #author a {
        font-weight: bold;
        color : #1c1c1c;
        text-decoration: underline;
    }

    #author a{

    }
    
    

    
</style>
