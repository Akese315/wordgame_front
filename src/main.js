import { createApp } from 'vue'
import App from './App.vue'
import {createRouter,createWebHistory} from 'vue-router';
import Home from './views/Home.vue'
import Game from './views/Game.vue'
import Lobby from './views/Lobby.vue'
import Notfound from './views/Notfound.vue'




const routes = [
    { path: '/', component: Home },
    { path: '/:pathMatch(.*)*', component: Notfound },
    { path: '/game/:id', component: Game },
    { path: '/lobby/:id', component: Lobby }
    
  ];

const router = createRouter(
    {
        history : createWebHistory(),
        routes,
    });

const app = createApp(App);
app.config.unwrapInjectedRef = true;

app.use(router);
app.mount('#app')
