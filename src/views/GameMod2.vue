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
import WG_gameCard from '@/components/game_card.vue';
import WG_panelError from '@/components/panel_error.vue'
export default {
    name : "wg_game_mod_2",
    components:
    {
        WG_gameCard,
        WG_panelError
    },
    setup()
    {
        const backApp = inject("backApp"); 
        const cards = ref(new Array);
        const errorValue = ref("");
        const infoValue = ref("");
        const assignment = ref("");
      

        
      
      
        
        return{
            backApp,
            assignment,
            cards,
            errorValue,
            infoValue
        }
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
    }

    #gameplay
    {
        height : 70%;
        width : 60%;
        margin : 0 auto;
        display: grid;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr;
        
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