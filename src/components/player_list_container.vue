<script>
    import WG_player_view from '../components/player_view.vue'
    import { toRef,ref } from '@vue/reactivity';
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
            const ringAudio = require("../assets/Water_Drop.mp3");
            const position = ref("100%");
            const AudioPlayer = new Audio();

            var isClicked = false;
            
            AudioPlayer.src = ringAudio;
            
            const ring = ()=>
            {
                AudioPlayer.play()
            }

            const showContainer = ()=>
            {                
                if(isClicked)
                {
                    position.value = "translateY(-100%)";
                    isClicked = false;
                }else
                {
                    position.value = "translateY(0%)";
                    isClicked = true;
                }
            }

            return{
                playerList,
                ring,
                position,
                showContainer
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
    <div id="container" v-bind:style="{transform : this.position}">
        <div id="player_list_container">
            <h1>Player List</h1>
            <div id ="container_player">
                <WG_player_view v-for="(player, index) in this.playerList" 
                v-bind:key="index" 
                v-bind:WG_pseudo="player.pseudo" 
                v-bind:WG_point="player.point"
                v-bind:WG_hasFinished="player.hasFinished"
                v-bind:WG_icon="player.icon"/>
            </div>            
        </div>  
        <span id="tag" @click="showContainer()">
            <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"/></svg>
        </span>  
    </div>   
    
</template>

<style scoped>
#container
{
    width : 300px;
    display: flex;
    flex-direction: row;
    background-color: #11222A;  
    transition: 1s;
    transition-property: none;
    align-items: center;
    z-index: 5;
    transform: translateY(0%);
}

#player_list_container
{
   
    /* width : 250px; */
    width: 100%;
    min-width: 200px;
    height : 100%;
    
}

#tag
{
    background-color: rgb(255, 255, 255);
    padding: 0 20px;
    border: 1px solid black;
    border-radius: 70px;
    height : 20px;
    position : relative;    
    top : 20px;
    cursor: pointer;
    align-self:auto;
    align-items: center;
    display: none;
}

#tag svg
{
    transform : rotate(90deg);
}


@media (max-width:688px), screen and (orientation: portait)
{
    #container
    {
        position : absolute;
        flex-direction: column;
        width : 100%;
        transform: translateY(-100%);
        transition-property: transform;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
    }
    #tag
    {
        display:  flex;
    }

    #player_list_container
    {
        height : auto;
    }
}

@media (min-width:688px), screen and (orientation: landscape)
{
    #container
    {
        transform: translateY(0%) !important;
    }


}

h1
{
    
    color : #eaeaea;
    text-align: center;
}

#container_player
{
    height : auto;
    width : 90%;    
    margin :auto;
    box-shadow: rgba(1,1,1,0.5) -100px inset;
    overflow-y:scroll;
    
}

::-webkit-scrollbar {
  background: #11222A;
}

</style>