<script>
    import WG_player_view from '../components/player_view.vue'
    import { toRef } from '@vue/reactivity';
    import { inject} from 'vue';
    export default ({
        name : "WG_player_list_container",
        components :
        {
            WG_player_view,
        },
        props:
        {
            WG_player_list:
            {
                type: [Array, Object],
                required:true
            }
        },
        setup(props)
        {
            const playerList = toRef(props, "WG_player_list");
            const ringAudio = inject("ringAudio")
            const player = new Audio();
            player.src = ringAudio;
            

            const ring = ()=>
            {
                player.play()
            }


            return{
                player,
                playerList,
                ring
            }
        },
        watch:
        {
            playerList()
            {
               this.ring()
            }
        }
    
    })
</script>

<template>
    <div id="player_list_container">
        <h1>Player List</h1>
        <div id ="container_player">
            <WG_player_view v-for="(player, index) in this.playerList" v-bind:key="index" v-bind:WG_pseudo="player.pseudo" v-bind:WG_point="player.point"/>
        </div>
    </div>
</template>

<style scoped>
#player_list_container
{
    border: solid 2px #3499eb;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    background-color: #81b4dd;  
    width : 30%;
}

h1
{
    color : #eaeaea;
    text-align: center;
}

#container_player
{
    height : 80%;
    box-shadow: rgba(1,1,1,0.5) -100px inset;
    overflow-y:scroll;
}
</style>