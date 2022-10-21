<script>
import { ref, computed} from '@vue/reactivity';
export default {
    
    name : "WG_input",
    props:
    {
        wg_placeholder : String,
        modelValue : String      
    },
    emits: ['update:modelValue'],
    setup(props, { emit })
    {
        const focused = ref(false)
        const wg_value = ref(props.modelValue)

        const update_wg_value = computed(
            {
                get()
                {
                    return wg_value.value;
                },
                set(value)
                {
                    wg_value.value = value
                    emit('update:modelValue', wg_value.value); 
                }
            }
        )
        if(wg_value.value != "")
        {
            focused.value = true;
        }

        return{
            focused,
            wg_value,
            update_wg_value
        }
    },
    methods:
    {
        onFocus()
        {
            this.focused = true;
        },
        onBlur()
        {
            if(this.wg_value == "")
            {
                this.focused = false;
            }            
        }
    }
    
}
</script>

<template>
    <div id="input_wg">        
        
        <input id="input" v-model="update_wg_value" type="text" @focus="onFocus" @blur="onBlur" required/>
        <label v-bind:class="{input_selected :focused}" id="placeholder">{{wg_placeholder}}</label>
        
    </div>
</template>



<style scoped>

    input  
    {
        outline: none;        
        border : 3px solid #252525;
        color : #2a2a2a;
        font-weight: bold;
        border-radius: 5px;
        padding : 5px;
        background-color: transparent;
        height: 20px;
        z-index: 2;
    }

    label
    {
        position :absolute; 
        top:0;
        left : 0;      
        padding : 0 3px;
        line-height: 15px;
        margin-left: 7px;
        margin-top: 10px;       
        font-weight: bold;
        border-radius: 6px;
        z-index: 1;
        color: rgba(0, 0, 0, 0.5);
        background-color: #f5f5f5;
        transition : top .3s;

    }

    #input:hover 
    {           
        border-color: #3499eb;        
    }

    #input:focus 
    {           
        border-color: #3499eb;        
    }

    .input_selected
    {
        color : #3499eb;
        top : -17px;
        z-index: 3;
    }
    #input_wg
    {
        display : flex;
        position : relative;
        margin : 10px;
    }




</style>