<script>
    import WG_player_view from '../components/player_view.vue'
    import { toRef,ref } from '@vue/reactivity';
    import { inject, watch } from 'vue'
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
            const backApp = inject("backApp")
            const position = ref("100%");
            const AudioPlayer = new Audio();

            var isClicked = false;
            
            AudioPlayer.src = ringAudio;
            
            const ring = ()=>
            {
                AudioPlayer.play()
            }

            const leaveRequest = ()=>
            {
                console.log("leave")
                backApp.sendRequest('game:event', {"event" : "leave"})
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

            watch( 
                playerList,
                (newValue, oldValue )=>{
                    for(var i = 0; i<newValue.length; i++)
                    {
                        if(newValue[i].point != oldValue[i].point)
                        {
                            ring()
                            break;
                        }
                    }
                },
                { deep: true }
            )

           

            return{
                playerList,
                ring,
                position,
                showContainer,
                leaveRequest
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
            <button id="leave-btn" @click="leaveRequest">Leave <img src="../assets/exit.svg"></button>
            
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
    flex-direction: column;
    background-color: #11222A;  
    transition: 1s;
    transition-property: none;
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
    margin : 0 auto;
    width: min-content;
    align-self:auto;
    align-items: center;
    display: none;
}

#tag svg
{
    transform : rotate(90deg);
}

#leave-btn
{
    align-self: flex-end;
    background-color: rgb(200,10,10);
    width : max-content;
    min-height: 40px;
    height : min-content;
    max-height: 1em;
    font-size: 25px;
    font-weight: bold;
    color : #ffff;
    border-radius : 10px;
    margin :  20px auto;
    position: relative;
    cursor: pointer;
    outline : none;
    overflow-wrap: break-word;
    border : 1px solid rgb(200,10,10);
    display : block;
}

#leave-btn img
{
    position : relative;
    vertical-align: middle;
    margin : 3px;
    height: 1em;
    width: 1em;
    filter: invert(87%) sepia(96%) saturate(16%) hue-rotate(238deg) brightness(105%) contrast(105%);
}

#leave-btn:hover
{
        background-color:#d23838 ;
}

#leave-btn:active
{
    background-color:#d23838 ;
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
        display: flex;
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