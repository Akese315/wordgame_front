<script>

    export default ({
        name : "WG_progress_bar",
        props:
        {
            modelValue : String
        },
        data: function(){
        return{
            wg_value :"0"
        }},
        watch:
        {
            wg_value: function()
            {
                this.$emit('update:modelValue', this.wg_value);
            }
        },
        emits: ['update:modelValue']
    })
    

    </script>

<template>
    <label class="progress-bar">
        <input type="range" min="1" max="100" v-model="this.wg_value" class="slider"/>
    </label>
</template>

<style scoped>
    .progress-bar
    {
        height: auto;
        position : relative;
        width: 60%;
        margin : 10px 0;
        display : flex;
        flex-direction: column;
        align-content: center;
    }
    .slider
    { 
        width : 100%;
        height: 8px;
        -webkit-appearance:none !important;
        border-radius: 15px;
        border: none;
        outline: none;
        display : block;
        background: linear-gradient(90deg, #d7f7ff,#3499eb);
    }

    .slider::-webkit-slider-thumb {
        -webkit-appearance: none !important;
        width: 20px;
        height:20px;
        background-color: #ffffff;
        border: #000000 solid 2px;
        border-radius: 50%;
        cursor: pointer;
    }

    .slider:hover, hr:hover
    {
        cursor :pointer;
    }
    
</style>
