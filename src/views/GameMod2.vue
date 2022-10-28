<template>
    <div id="background">
        <div id="gameplay">
            <WG_gameCard v-bind:card_value="value1"/>
            <WG_gameCard v-bind:card_value="value2"/>
            <WG_gameCard v-bind:card_value="value3"/>
        </div>
        <h1>Assembler pour trouver le kanji : 「kimi」</h1>
    </div>  
</template>

<script>
import { inject} from 'vue';
export default {
    name : "wg_game_mod_2",
    setup()
    {
        const backApp = inject("backApp") 
        var value1 = "君"
        var value2 = "待"
        var value3 = "踏"
        console.log("This is gamemod2")

        const errorCallback = (error)=>
        {
            return error;
        }
        
        const setReady = ()=>
        {
            backApp.setErrorCallback(errorCallback)
            backApp.sendRequest("ready",{ready : true});
        }
        setReady();
        
        return{
            backApp,
            value1,
            value2,
            value3
        }
    }

}
</script>

<style scoped>
    #background
    {   
        width : 100%;
        background-color : rgb(146, 209, 91);
        display: flex;
        flex-direction: column;
    }

    #gameplay
    {
        height : 70%;
        width : 100%;
    }

    h1
    {
        background: white ;
        width : max-content;
        position :relative;
        margin : 0 auto;
        padding : 4px;
        border: 3px solid black;


    }

</style>