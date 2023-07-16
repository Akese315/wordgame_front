<script>
export default {
    name : "WG_error",
    props:
    {
        WG_value : String,
        Bounce : Boolean
    },
    data: function(){
    return{
    }}
}
</script>

<template>
    <label :class="{actived : Bounce}">{{WG_value}}</label>
</template>

<style scoped>
label
{   
    color : #a83232;
    font-weight: bold;
    text-align: center;
}

.actived
{
 animation-name :error-bound;
 animation-duration: 0.8s;
 animation-iteration-count: 1;
}

@keyframes error-bound
{
    0%
    {
        transform: translateX(-10px);
    }
    10%
    {
        transform : translateX(9px)
    }
    20%
    {
        transform : translateX(-8px)
    }
    30%
    {
        transform : translateX(7px)
    }
    40%
    {
        transform : translateX(-6px)
    }
    50%
    {
        transform : translateX(5px)
    }
    60%
    {
        transform : translateX(-4px)
    }
    70%
    {
        transform : translateX(3px)
    }
    80%
    {
        transform : translateX(-2px)
    }
    90%
    {
        transform : translateX(1px)
    }
    100%
    {
        transform : translateX(0px)
    }
   
}
   

</style>