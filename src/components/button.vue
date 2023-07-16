<script>

export default ({
    name : "WG_button",    
    props:
    {
        wg_value : String,
        width : {
            default : "100px",
            type : String
        }
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
    <button :style="{width : width}" @click="clickEvent" > {{wg_value}} </button>
</template>

<style scoped>
    button
    {
        width : 100px;
        min-height: 40px;
        height : min-content;
        font-size: 15px;
        font-weight: bold;
        color : #ffff;
        background-color: #3499eb;
        border-radius : 10px;
        margin :10px;
        cursor: pointer;
        outline : none;
        overflow-wrap: break-word;
        border : 1px solid #3499eb;
    }

    button:hover
    {
        background-color:#278bdd ;
    }

    button:active
    {
        background-color:#278bdd ;
    }
</style>
