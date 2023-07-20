<template>
    <div id="background">
        <div id="gameplay">
            <WG_gameCard @sendAnswer="this.sendAnswer(card)" v-for="(card, index) in this.cards" v-bind:key="index" v-bind:card_value="card" v-bind:String_size="'3em'"/>
        </div>
        <WG_panelError v-bind:informationProp="this.infoValue" v-bind:errorProp="this.errorValue"/>
        <h1>{{this.assignment}}</h1>
    </div>  
</template>

<script>
import { inject} from 'vue';
import {ref} from 'vue';
import { toRef } from '@vue/runtime-core';
import WG_gameCard from '@/components/game_card.vue';
import WG_panelError from '@/components/panel_error.vue'
export default {
    name : "wg_game_mod_2",
    components:
    {
        WG_gameCard,
        WG_panelError
    },
    props:
    {
        card_array: 
        {
            type: [Array, Object],
        },

        assignment_string:
        {
            type: [String]
        }
    },
    setup(props)
    {
        const backApp = inject("backApp"); 
        const cards = toRef(props, "card_array");
        const assignment = toRef(props,"assignment_string");
        const errorValue = ref("");
        const infoValue = ref("");
      
        const sendAnswer = (card)=>
        {
            backApp.sendData(backApp.ANSWER_GAME_EVENT, {answer :card})            
        }
        
        const receiveAnswer = (data)=>
        {
            if(data.answer)
            {
                console.log("true")
            }else
            {
                console.log("false")
            }
        }
      
      
        
        return{
            backApp,
            assignment,
            cards,
            errorValue,
            infoValue,
            sendAnswer,
            receiveAnswer
        }
        
    },

    unmounted()
    {
        this.backApp.closeEvents(this.backApp.ANSWER_GAME_EVENT);
    },
    mounted()
    {
        this.backApp.listen(this.backApp.ANSWER_GAME_EVENT,this.receiveAnswer)
    }
}
</script>

<style scoped>
    #background
    {   
        height : 100%;
        background-color : rgb(146, 209, 91);
        display: flex;
        flex-direction: column;
        padding:  0 10px;
    }

    #gameplay
    {
        height : 70%;   
        max-width: 100%;
        width : 100%;
        /* overflow-x: scroll; */
        margin : 0 auto;
        display: flex;
        
    }

    h1
    {
        background: white ;
        overflow-wrap: normal;
        position :relative;
        font-size : 30px;   
        margin : 0 auto;
        padding : 8px;
        border: 3px solid black;
        text-align: center;
    }

    @media (min-width:1100px)
    {

        #gameplay 
        {
            max-width: 70%;
        }

    }

</style>