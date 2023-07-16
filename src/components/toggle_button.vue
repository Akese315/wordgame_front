<script>
    import { computed , ref} from '@vue/reactivity';
    export default ({
        name : "WG_toggle_button",
        props:
        {
            parameter_label : String,
            modelValue: Boolean
        },
        emits: ['update:modelValue'],
        setup(props, { emit })
        {   
            const checked = ref(false);
            function updateValue()
            {
                emit('update:modelValue', checked.value);  
            }            
            
            const updateChecked =computed(
            {
               get()
               {
                return checked.value;
               },
               set(value)
               {
                checked.value = value;    
                updateValue();
               }
            });

            return{
                checked,
                updateChecked
            }
        }
       
    })
    </script>

<template>
    <div class="toggle_button_WG">
        <label class="parameter_label">{{parameter_label}}</label>
        <label class = "switch">        
            <input type="checkbox" v-model="this.updateChecked"/>
            <span class="slider round"></span>
        </label>
    </div>
</template>

<style scoped>

    .parameter_label
    {
        margin-right : 10px;
    }
    .toggle_button_WG
    {
        display: inline-block;
        margin :10px 0 10px 0;
    }
    .switch
    {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 20px;

    }
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    .slider {
        position: absolute;
        cursor: pointer;
        top: 1px;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }
    .slider:before {
        position: absolute;
        content: "";
        height: 15px;
        width: 15px;
        left: 4px;
        top: 2px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: #81B4DD;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(18px);
        -ms-transform: translateX(18px);
        transform: translateX(18px);
    }
    .slider.round {
    border-radius: 34px;
    }
    .slider.round:before {
    border-radius: 50%;
    }
</style>