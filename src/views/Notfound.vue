<script>
export default {
    name :"NotFound",
    data: function(){
    return{
        counter : 5
    }},
    mounted()
    {
        this.increment();
    },
    methods:
    {
       increment()
        {   
        var timer = setInterval(()=>
            {
                this.counter --;
                if(this.counter ==0)
                {
                    clearInterval(timer);
                    this.$router.push({ path: '/' })
                }
            },1000)
        }
    }
}
</script>

<template>
    <div id="background">
        <h1>Not Found</h1>
        <h2>redirect in {{counter}} secondes</h2>
    </div>
</template>


<style scoped>
    h1
    {   
        margin : 0;
        margin-top : 30px;
        font-size: 5em;
        color :#3499eb;
        text-align: center;
        background-color: rgb(223, 239, 255);
        width: max-content;
        height: max-content;
        padding: 10px;
        border-radius: 10px;
    }

    h2
    {
        background-color: rgb(223, 239, 255);
        padding: 10px;
        color :#3499eb;
        border-radius: 10px;
    }

    #background
    {
        position : absolute;
        background-image: url('https://64.media.tumblr.com/5cf616d4e62824caffb673730d3f2072/tumblr_p8c7g9bWry1x0j068o1_1280.gifv');
        background-size: cover;   
        height: 100%;  
        width : 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
</style>