<template>
  <div id="background">
    <div id="endMenu">
        <h1>Game Ranking</h1>
        <div id="rankinglist">
            <span class="rankPlayer" v-for="(player, index) in this.rankingList" v-bind:key="index" >{{index+1}}. {{player}}</span>
        </div>
        <h2>{{this.message}}</h2>
        <div id="menu_button">
            <button_wordgame @click="redirectLobby" wg_value="Lobby" />
            <button_wordgame v-if="!game.isOwner" @click="restart" wg_value="restart"/>
        </div>
    </div>
  </div>
</template>

<script>
import { toRef,ref } from '@vue/reactivity' 
import { watch } from '@vue/runtime-core'
import { inject } from 'vue'
import button_wordgame from './button.vue'
export default {
    name : "wg_end_game_menu",
    components:
    {
        button_wordgame
    },
    props:
    {
        WG_rankingList : Array
    },
    setup(props)
    {       
        const rankingList = toRef(props, "WG_rankingList")
        const backApp = inject("backApp")
        const game = inject("game")
        const message = ref("Waiting players to finish...")

        if(rankingList.value.length >0)
        {
            message.value = "";
        }
        const updateRankingList = ()=>
        {
            message.value =""
        }

        const redirectLobby = ()=>
        {
            console.log("lobby")
            backApp.goTo("lobby")
        }

        const restart = ()=>
        {
            console.log("restart");
            backApp.sendRequest("restart");
        }

        watch(rankingList,updateRankingList)

        return{
            rankingList,
            message,
            redirectLobby,
            restart,
            game
        }
    }
    
}
</script>

<style scoped>

    .rankPlayer
    {
        display: flex;
        flex-direction: row;
        justify-content: center;
        font-size: 30px;
        margin : 5px 5px;
        background-color: rgb(185, 185, 185) ;
    }

    #endMenu
    {
        background-color: #f5f5f5;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
        width: 500px;
        height : 500px;
        margin : auto auto;
        border:2px solid #f5f5f5 ;
        border-radius: 30px;
    }

    #rankinglist
    {
        margin : 0 auto;
        width : 60%;
        height : 50%;
        overflow-y: auto;
    }
    #background
    {
        display :flex;
        background-size: cover;
        background-image: url("https://i.pinimg.com/originals/50/37/69/50376902464168bd55be942323b9f3c7.gif")
    }

    h1
    {
        text-align: center;
    }

    h2
    {
        text-align: center;
    }

    #menu_button
    {
        display : flex;
        justify-content: center;
    }
    
</style>