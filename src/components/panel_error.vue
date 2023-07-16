<template>
  <div id="panel" v-bind:style="{'background-color' : this.background, 'display' : this.display}">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import { ref, toRef } from '@vue/reactivity'
export default {
    name: "panel_error",
    props:
    {
        informationProp :String,
        errorProp :String
    },
    setup(props)
    {
        const error = toRef(props, "errorProp");
        const information = toRef(props, "informationProp");

        const message = ref("");
        const background = ref("none");
        const display = ref("none")
        return{
            error,
            information,
            background,
            display,
            message
        }
    },
    watch:
    {
        error()
        {
            if(this.error != "")
            {
                this.background = "rgba(200,10,10,0.5)";
                this.message = this.error;
                this.display = "block";
            }else
            {
                this.display = "none";
                this.message = "";
            }
        },
        information()
        {
            
            if(this.information != "")
            {
                this.background = "rgba(0,0,255,0.5)";
                this.display = "block"; 
                this.message = this.information;          
            }else
            {
                this.display = "none";
                this.message = "";
            }
        }
    }
}
</script>

<style scoped>
#panel
{
    position : absolute;
    width : 100%;
    height : 100%;
    z-index: 3;
}
h1
{
    position:block;
    display : flex;
    height : 100%;
    font-size: 3em;
    justify-content: center;
    align-items: center;
   
    
}
</style>