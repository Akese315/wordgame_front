

<script>
export default {
  name:"gameStartup",
  props:
  {
    wg_time : String
  },
  startup()
  {
    
  }
}
</script>

<template>
  <h1>{{wg_time}}</h1>
</template>

<style>
h1
{
  text-align: center;
  margin : 0 auto;
}
</style>