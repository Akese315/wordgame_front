<script>
    import { toRef,ref } from '@vue/reactivity';
    export default ({
        name : "WG_player_view",
        props :
        {
            WG_pseudo : String,
            WG_point : Number,
            WG_hasFinished : Boolean,
            WG_icon : String
        },
        setup(props)
        {
            const pseudo = toRef(props, "WG_pseudo");
            const point = toRef(props, "WG_point");
            const iconName = toRef(props,"WG_icon");
            const hasFinished = toRef(props, "WG_hasFinished");

            const icon  = ref("");

            const setIcon = ()=>
            {
                icon.value = require("../assets/img/"+iconName.value+".png")                
            }

            return{
                pseudo,
                icon,
                point,
                hasFinished,
                setIcon
            }            
        },
        mounted()
        {
            this.setIcon();
        }
        
    })
</script>

<template>
    <div id="player_view" class="defaultStyle" v-bind:class="{hasFinishedStyle : this.hasFinished}">
        <img :src="this.icon"/>
        <p>{{this.pseudo}}</p>
        <p>{{this.point}}</p>
    </div>
</template>

<style scoped>
    .defaultStyle{
        background: #FFFFFF;
    }
    .hasFinishedStyle{
        background: #339108;
    }
    #player_view
    {
        display: flex;
        flex-direction: row;
        height : 70px;
        margin : 10px;        
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        border-radius: 20px;
    }
    img
    {
        height: 100%;
        border-radius: 30%;
    }
    p
    {
        margin : auto;
    }
</style>