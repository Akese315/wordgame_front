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
        <input type="range" min="0" max="100" v-model="this.wg_value" class="slider"/>
    </label>
</template>

<style scoped>
    .progress-bar
    {
        margin :10px 0 10px 0;
        position : relative;
        width: 60%;
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
        background: linear-gradient(90deg,#81B4DD, #f86d6d);
    }

    .slider::-webkit-slider-thumb {
        -webkit-appearance: none !important;
        width: 30px;
        height:30px;
        background-image: url("https://e7.pngegg.com/pngimages/728/584/png-clipart-logo-japan-computer-icons-graphics-idea-japan-heart-logo.png");
        background-size: cover; 
        border-radius: 50%;
        cursor: pointer;
    }

    .slider:hover, hr:hover
    {
        cursor :pointer;
    }
    
</style>
