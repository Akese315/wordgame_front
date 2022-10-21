<script>
import WGinput from '../components/input_wordgame.vue'
import WGbutton from '../components/button_wordgame.vue'
import WGerror from '../components/error_wordgame.vue'
import { inject} from 'vue'
import { ref } from '@vue/reactivity';
import { useRouter, useRoute } from 'vue-router'

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
        const game = inject("game")
        const WebSocket = inject("WebSocket")
        const router = useRouter();
        const route = useRoute();        
        game.gameHash = route.query.game;
        //functions
        const ErrorBounceAnimation = ()=>
        {
            bounce.value = true;
            setTimeout(() => {bounce.value = false;}, 1000); 
        }

        const RejectError = (error)=>
        {   
            errorInput.value = error;
            ErrorBounceAnimation();
        }

        const redirectToLobby = ()=>
        {   
            navigator.clipboard.writeText("http://localhost:8080?game="+game.gameHash);
            console.log("joined")            
            router.push({ path: '/lobby'})
        }

        const setGameHash =(response)=>
        {
            errorInput.value = response.message;
            game.gameHash = response.data.gameHash
            console.log(response)
            ErrorBounceAnimation();
            redirectToLobby();
        }

        const joinGame = ()=>
        {
            WebSocket.sendRequest("join",{userHash : user.hash, gameHash : game.gameHash},redirectToLobby,RejectError)
        }

        const createConnection = ()=>
        {
            WebSocket.open(null,RejectError);
        }

        const createGame = (response)=>
        {
            user.pseudo = response.data.pseudo;
            user.hash = response.data.userHash;
            errorInput.value = response.message;
            console.log(response)
            ErrorBounceAnimation();
            if(typeof(game.gameHash) === "undefined" )
            {
                console.log("creating game...")
                WebSocket.sendRequest("game",{userHash : user.hash}, setGameHash, RejectError);            
            }
            else
            {
                console.log("joining...")
                joinGame()
            }
           
        }        

        const createUser = ()=>
        {   
            WebSocket.sendRequest("user",{name : pseudoInput.value, userHash : user.hash},
            createGame, RejectError)                   
        }
        
        createConnection();

        // -> les fonctions sont rangés par ordres d'utilisations
        
    
        return{
            pseudoInput,
            errorInput,
            bounce,
            user,
            router,
            route,
            ErrorBounceAnimation,
            createUser,
            createGame,
            redirectToLobby,
            createConnection,
            setGameHash
        }
    }
}
</script>

<template>
    <div id ="background">
        <div id="main_card">
            <h1>Welcome to the WordGame</h1>
            <h2>ワードゲームへようこそ  </h2>     
               <form @submit.prevent="createUser" >
                <WGinput v-model="this.pseudoInput" wg_placeholder="Pseudo"/>                
                <WGbutton wg_value ='Create'/>  
                <WGerror v-bind:WG_value="this.errorInput" v-bind:Bounce="this.bounce"/>
                </form>
            
        </div>
    </div>
</template>

<style scoped>

    #main_card
    {
        
        background-color: #f5f5f5;        
        width: 500px;
        height : min-content;
        padding : 20px;
        border-radius:30px; 
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
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
        background-image: url('../assets/japan-pixel.gif');
        background-size: cover;         
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
</style>
