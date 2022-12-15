<template>
  <div id="information" v-bind:style="{'background-color' : this.background, 'display' : this.display}">
    <h1></h1>
  </div>
</template>

<script>
import { ref, toRef } from '@vue/reactivity'
export default {
    name: "panel_error_wordgame",
    props:
    {
        informationProp :String,
        errorProp :String
    },
    setup(props)
    {
        const error = toRef(props, "errorProp");
        const information = toRef(props, "informationProp");
        const background = ref("none");
        const display = ref("none")
        return{
            error,
            information,
            background,
            display
        }
    },
    watch:
    {
        error()
        {
            this.information.value = "rgba(255,0,0,0.5)";
            this.display = "block";
            console.log(this.error);
            setTimeout(()=>
            {
                this.display = "none";
            },3000)
        },
        information()
        {
            this.information.value = "rgba(0,0,0,0.5)";
            this.display = "block";           
            console.log(this.information);
            setTimeout(()=>
            {
                this.display = "none";
            },3000)
        }
    }
}
</script>

<style>
#information
{
    position : absolute;
    width : 83%;
    height : 100%;
    z-index: 3;
}
#h1
{
    display : flex;
    margin : auto;
    font-size: 6em;
}
</style>