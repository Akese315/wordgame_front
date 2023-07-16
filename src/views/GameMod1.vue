<template>
    <div id="background">
        <div id="gameplay">
            <WG_gameCard  @sendAnswer="sendAnswer(card)" v-for="(card, index) in this.cards" v-bind:key="index" v-bind:card_value="card"/>
        </div>
        <h1>{{this.assignment}}</h1>
    </div>  
</template>

<script>
import WG_gameCard from '@/components/game_card.vue';
import { toRef } from '@vue/runtime-core';
import { inject} from 'vue';
export default {
    name : "wg_game_mod_1",
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
    components:
    {
        WG_gameCard
    },
    unmounted()
    {
        this.backApp.closeEvents(this.backApp.ANSWER_GAME_EVENT);
    },
    mounted()
    {
        this.backApp.listen(this.backApp.ANSWER_GAME_EVENT,this.receiveAnswer)
    },
    setup(props)
    {         
        const cards = toRef(props, "card_array");
        const assignment = toRef(props,"assignment_string");
        const backApp = inject("backApp")
        console.log(assignment)
        console.log("This is gamemod1")

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

        const sendAnswer = (card)=>
        {
            console.log(card)
            backApp.sendData(backApp.ANSWER_GAME_EVENT, {answer :card})            
        }
        
     
        return{
            cards,
            backApp,
            assignment, 
            sendAnswer,
            receiveAnswer   
        }
    }

}
</script>

<style scoped>

    #background
    {   
        height : 100%;
        background-color : rgb(91, 91, 209);
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

    @media (min-width:1100px)
    {

        #gameplay 
        {
            max-width: 80%;
        }

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
</style>