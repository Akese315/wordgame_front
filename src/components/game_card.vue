<template>
    <span @click="this.clickEvent" class="cardDesign" v-bind:style="{fontSize : String_size }">
        {{card_value}}
    </span>  
</template>

<script>
export default {
    name: "WG_gameCard",
    props:
    {
        Info_value :String,
        Error_value : String,
        card_value : String,
        String_size : {
            default : "10em",
            type : String
        }
        },
    emits : ['sendAnswer'],
    setup(props, {emit})
    {
        console.log(props.String_size)
        const clickEvent = ()=>
        {
            emit('sendAnswer');
        }

        return{
            clickEvent
        }
    }
}
</script>

<style scoped>
    .cardDesign
    {
        background-color : white;
        border-radius: 15px;
        margin : auto;
        user-select:none;
        padding: 10px;
        cursor : pointer;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
        transition : 0.5s;
    }

    .cardDesign:hover
    {
        transform : scale(1.1)
    }
</style>