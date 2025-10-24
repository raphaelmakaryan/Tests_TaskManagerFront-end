import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/HelloWorld.vue';
import addTask from '../components/addTask.vue';

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/addTasks',
        component: addTask,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router