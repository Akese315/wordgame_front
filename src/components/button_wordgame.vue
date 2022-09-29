<script>

export default ({
    name : "WG_button",
    props:
    {
        wg_value : String
    }
})
</script>


<template>
    <button > {{wg_value}} </button>
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
