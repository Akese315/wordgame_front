<template>
  <div id="background">
    <div id="endMenu">
        <h1>Game Ranking</h1>
        <div id="rankinglist">
            <span class="rankPlayer" v-for="(player, index) in this.rankingList" v-bind:key="index" >{{index+1}}. {{player}}</span>
        </div>
        <h2>{{this.message}}</h2>
        <div>
            <button_wordgameVue/><button_wordgameVue/>
        </div>
    </div>
  </div>
</template>

<script>
import { toRef,ref } from '@vue/reactivity' 
import { watch } from '@vue/runtime-core'
import button_wordgameVue from './button_wordgame.vue'
export default {
    name : "wg_end_game_menu",
    components:
    {
        button_wordgameVue
    },
    props:
    {
        WG_rankingList : Array
    },
    setup(props)
    {       
        const rankingList = toRef(props, "WG_rankingList")
        const message = ref("Waiting players to finish...")

        if(rankingList.value.length >0)
        {
            message.value = "";
        }
        const updateRankingList = ()=>
        {
            message.value =""
        }
        watch(rankingList,updateRankingList)

        return{
            rankingList,
            message
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
        background-image: url("https://c10.patreonusercontent.com/4/patreon-media/p/post/48032424/e9d9ab6f1ed84dadbfb1604b3a741116/eyJ3Ijo2MjB9/1.gif?token-time=1669420800&token-hash=hGhh_VyEt4ym75oq6LUvRw0geB-987WTveAxan9QABQ%3D")
    }

    h1
    {
        text-align: center;
    }

    h2
    {
        text-align: center;
    }

    .WG_button
    {
        
    }
    
</style>