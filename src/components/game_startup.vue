

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
  <div id="background">
    <h1>{{wg_time}}</h1>
  </div>
</template>

<style scoped>
#background
{
  background-image: url('https://64.media.tumblr.com/7e2640054d506699873234becee9ab9c/tumblr_pkffwiVXOu1qze3hdo1_500.gifv');
  background-size:cover;         
  display :flex;
}
h1
{
  text-align: center;
  color : white;
  font-size: 70px;
  margin : auto;
}
</style>