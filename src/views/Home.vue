<script>
import WGinput from '../components/input_wordgame.vue'
import WGbutton from '../components/button_wordgame.vue'
import WGerror from '../components/error_wordgame.vue'
import { API_URL } from '../constants';
import axios from 'axios';

export default {
    name: "wg_home",

    components :
    {
        WGinput,
        WGbutton,
        WGerror
    },

    inject:["pseudo","userHash"],

    data: function(){
    return{
        secondStep : false,
        pseudo_value : "",
        error : "",
        bounce : false,
        
    }},
    created() {
        console.log(this.userHash) // injected value
    },

    methods:
    {
        async createGame()
        {   
            alert(this.$userHash)
            var object = await axios.post(`${API_URL}/users`, {
                name: this.pseudo, 
                userHash: this.userHash           
            });

            this.$userHash =  object.data.userHash;
            alert(this.$userHash)
            alert(object.data.userHash)
            this.$router.push({ path: '/lobby' })
            /* var self = this;
            axios.post(`${API_URL}/users`, {
                name: self.pseudo, 
                userHash: self.userHash           
            }).then((response) => {
                
                if(response.status == 200)
                {              
                    self.error = response.data.message;
                    self.userHashbis  = response.data.userHash;
                        
                    self.bounce = true;
                    setTimeout(() => {self.bounce = false;}, 1000);
                    self.$router.push({ path: '/lobby' })
                }                
            }).catch(function(error)
            {            
                self.error ="";
                if(typeof error.response.data != 'undefined')
                {   
                    for(var i =0; i<error.response.data.error.length;i++)
                    {
                        self.error += error.response.data.error[i]+" ";
                    }                    
                    self.bounce = true;
                    setTimeout(() => {self.bounce = false;}, 1000);
                }
                else
                {
                    self.error = error.message;
                    self.bounce = true;
                    setTimeout(() => {self.bounce = false;}, 1000);
                }                           
            })*/
        }
    }
}
</script>

<template>
    <div id ="background">
        <div id="main_card">
            <h1>Welcome to the WordGame</h1>
            <h2>ワードゲームへようこそう</h2>     
               <form @submit.prevent="createGame" >
                <WGinput v-model="this.pseudo" wg_placeholder="Pseudo"/>                
                <WGbutton wg_value ='Create'/>  
                <WGerror v-bind:WG_value="this.error" v-bind:Bounce="this.bounce"/>
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