
<script>
export default {
    name : "WG_button_image",
        props:
        {
           image_url : String,
           game_name : String,
           background: String,
           modelValue : String
        },
        setup(props)
        {   
           var cssProps = {'background-image' : `url(${props.image_url})`,'background-color' : `#${props.background}`}
           
           return{
            cssProps
          }
        },
        emits: ['update:modelValue']
}
</script>

<template>
    <div>
        <button type="button" :style="cssProps"></button>
        <label>{{game_name}}</label>
    </div>
</template>


<style scoped>

div
{
    display: flex;
    flex-direction: column;
}

button
{
    border: solid 2px #11222A;
    border-radius: 10px;
    width : 90px;
    height : 90px;
    align-self: center;
    background-size: cover;
    background-color: #4e859e;
    cursor: pointer;
    transition : 0.5s;
}

label
{

    align-self: center;
}
button:hover
{
    transform: scale(0.9);
}

button:active
{
    border: #00cffe solid 4px;
}

</style>