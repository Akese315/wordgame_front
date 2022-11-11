<template>
    <div id="background">
        <div id="gameplay">
            <WG_gameCard @sendAnswer="this.sendAnswer(card)" v-for="(card, index) in this.cards" v-bind:key="index" v-bind:card_value="card"/>
        </div>
        <WG_panelError v-bind:informationProp="this.infoValue" v-bind:errorProp="this.errorValue"/>
        <h1>{{this.assignment}}</h1>
    </div>  
</template>

<script>
import WG_gameCard from '@/components/game_card.vue';
import WG_panelError from '@/components/panel_error_wordgame.vue'
import { inject } from '@vue/runtime-core';
import {ref} from 'vue';

export default {
    name : "wg_game_mod_1",
    components:
    {
        WG_gameCard,
        WG_panelError
    },
    setup()
    {         
        const backApp = inject("backApp")
        const cards = ref(new Array)
        const errorValue = ref("")
        const infoValue = ref("")
        const assignment = ref("");
        console.log("This is gamemod1")
        const errorCallback = (error)=>
        {
            errorValue.value = error;
        }

        const infoCallback = (info)=>
        {
            infoValue.value = info;
        }

        const nextRound = (data)=>
        {
            cards.value = data.round.cards;
            assignment.value = data.round.assignment;
        }



        const sendAnswer = (answer)=>
        {
            backApp.sendRequest("answer",{answer : answer });
        }
        
        const setReady = ()=>
        {
            backApp.setErrorCallback(errorCallback);
            backApp.setInfoCallback(infoCallback);
            backApp.setRoundCallback(nextRound);
            backApp.sendRequest("ready",{isReady : true});
        }

        setReady();

        return{
            cards,
            assignment,
            infoValue,
            errorValue,
            nextRound,
            infoCallback,
            errorCallback,
            setReady,
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