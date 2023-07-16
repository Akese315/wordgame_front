<script>
import { toRef,ref } from 'vue';
import { watch } from '@vue/runtime-core';

export default {
    name : "WG_multichoice",
    props:
    {
        WG_title : String,
        WG_choices : Array
    },
    setup(props, {emit})
    {
        const choices = toRef(props,"WG_choices")
        const title = toRef(props, "WG_title")
        const value = ref(5);

        const emitValue = ()=>
        {
            emit('update:modelValue', value.value);
        }

        watch(value,emitValue)
        
        return{
            choices,
            title,
            value
        }
    }  
    
}
</script>


<template>
    <div id="multichoice">
        <label>{{this.title}}</label>
        <select id="multichoice" v-model="this.value">
            <option v-for="(choice, index) in this.choices" v-bind:value="choice" v-bind:key="index">{{choice}}</option>
        </select>
    </div>
    
</template>

<style scoped>
    #multichoice
    {
        display: inline-block;
        padding : 5px;
        vertical-align: middle;
        
    }

    label
    {
       height : max-content;
       padding : 0 5px;
    }
</style>
