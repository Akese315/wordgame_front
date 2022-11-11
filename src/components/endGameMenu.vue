<template>
  <div id="background">
    
  </div>
</template>

<script>
import { toRef } from '@vue/reactivity'
export default {
    name : "wg_end_game_menu",
    props:
    {
        WG_rankingList : Array
    },
    setup(props)
    {
        const rankingList = toRef(props, "WG_rankingList")
        console.log(rankingList)
        return{
            rankingList
        }
    }
}
</script>

<style scoped>
    #background
    {
        background-size: cover;
        background-image: url("https://c10.patreonusercontent.com/4/patreon-media/p/post/48032424/e9d9ab6f1ed84dadbfb1604b3a741116/eyJ3Ijo2MjB9/1.gif?token-time=1669420800&token-hash=hGhh_VyEt4ym75oq6LUvRw0geB-987WTveAxan9QABQ%3D")
    }
</style>