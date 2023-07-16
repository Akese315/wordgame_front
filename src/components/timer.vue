<template>
  <div id="clock">
    <div id="timer"></div>
  </div>
</template>

<script>
export default {
name:"timerWG",
setup()
{

}
}
</script>

<style scoped>
    #clock
    {
        width : 50px;
        height : 50px;
        border: 4px grey solid;
        background-color: white;
        border-radius: 50px;
    }

    #timer
    {
        stroke-width: 7px;
        stroke-linecap: round;
        stroke :brown;
        z-index: 4;
    }
</style>