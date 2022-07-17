import { createApp } from 'vue'
import App from './App.vue'
import {createRouter,createWebHistory} from 'vue-router';
import Home from './views/Home.vue'
import Game from './views/Game.vue'
import Notfound from './views/Notfound.vue'




const routes = [
    { path: '/', component: Home },
    { path: '/:pathMatch(.*)*', component: Notfound },
    { path: '/game', component: Game }
  ];

const router = createRouter(
    {
        history : createWebHistory(),
        routes,
    });

const app = createApp(App);

app.use(router);
app.mount('#app')
