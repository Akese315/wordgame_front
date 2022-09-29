<script>
import WGinput from '../components/input_wordgame.vue'
import WGbutton from '../components/button_wordgame.vue'
import WGerror from '../components/error_wordgame.vue'
import {request} from '../scripts/request.js'
import { inject} from 'vue'
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router'

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
        const router = useRouter();

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

        const redirectToLobby = (response)=>
        {   
            ErrorBounceAnimation();
            router.push({ path: '/lobby/'+response.token})
        }

        const createGame = (response)=>
        {
            user.pseudo = response.pseudo;
            user.hash = response.userHash;
            errorInput.value = response.message;
            ErrorBounceAnimation();
            request('/games', {userHash : user.hash}, redirectToLobby, RejectError)    
        }        

        const createUser = ()=>
        {   
            request('/users', {name : pseudoInput.value, userHash : user.hash}, createGame, RejectError);            
        }
        

        // -> les fonctions sont rangés par ordres d'utilisations
        
    
        return{
            pseudoInput,
            errorInput,
            bounce,
            user,
            router,
            ErrorBounceAnimation,
            createUser,
            createGame,
            redirectToLobby
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
        background-image: url('https://francejapon.fr/wp-content/uploads/2015/12/insolite-japon-des-gifs-animes-representant-le-quotidien-des-japonais-2-1.gif');
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
