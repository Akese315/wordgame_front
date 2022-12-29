<script>

export default ({
    name : "WG_button",    
    props:
    {
        wg_value : String
    },
    emits : ['clickWG'],
    setup(props,{emit})
    {
        const clickEvent = ()=>
        {
            emit('clickWG');
        }

        return{
            clickEvent
        }
    }
})
</script>


<template>
    <button @click="clickEvent" > {{wg_value}} </button>
</template>

<style scoped>
    button
    {
        width : 100px;
        min-height: 40px;
        height : min-content;
        font-weight: bold;
        background-color: #60aeee;
        border-radius : 10px;
        margin :10px;
        cursor: pointer;
        outline : none;
    }

    button:hover
    {
        background-color:#3499eb ;
    }
</style>
