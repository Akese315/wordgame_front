<template>
    <div id="background">
        <div id="gameplay">
            <WG_gameCard v-bind:card_value="value1"/>
            <WG_gameCard v-bind:card_value="value2"/>
            <WG_gameCard v-bind:card_value="value3"/>
        </div>
        <WG_panelError v-bind:Info_value="errorCallback" v-bind:Error_value="infoCallback"/>
        <h1>Trouver le kanji : 「きみ」</h1>
    </div>  
</template>

<script>
import WG_gameCard from '@/components/game_card.vue';
import WG_panelError from '@/components/panel_error_wordgame.vue'
import { inject } from '@vue/runtime-core';

export default {
    name : "wg_game_mod_1",
    components:
    {
        WG_gameCard,
        WG_panelError
    },
    setup()
    {   
        var value1 = "君"
        var value2 = "待"
        var value3 = "踏"
        
        const backApp = inject("backApp")
        console.log("This is gamemod1")

        const errorCallback = (error)=>
        {
            return error;
        }

        const infoCallback = (info)=>
        {
            return info;
        }
        
        const setReady = ()=>
        {
            backApp.setErrorCallback(errorCallback)
            backApp.setInfoCallback(infoCallback)
            backApp.sendRequest("ready",{ready : true});
        }

        setReady();

        return{
            value1,
            value2,
            value3,
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