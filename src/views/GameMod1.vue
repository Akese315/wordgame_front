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
        this.backApp.closeEvents("answer");
    },
    setup(props)
    {         
        const cards = toRef(props, "card_array");
        const assignment = toRef(props,"assignment_string");
        const backApp = inject("backApp")
        console.log(assignment)
        console.log("This is gamemod1")

        const succeed = ()=>
        {

        }

        const sendAnswer = (card)=>
        {
            console.log(card)
            backApp.sendRequest("answer", {answer :card},succeed)            
        }
        
     
        return{
            cards,
            backApp,
            assignment, 
            sendAnswer      
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
    }

    #gameplay
    {
        height : 70%;
        width : 60%;
        margin : 0 auto;
        display: flex;
    }

    h1
    {
        background: white ;
        width : max-content;
        position :relative;
        margin : 0 auto;
        padding : 8px;
        border: 3px solid black;
        text-align: center;
    }
</style>