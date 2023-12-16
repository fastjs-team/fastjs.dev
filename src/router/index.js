import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/home/index.vue'
import Sponsor from '../views/sponsor/index.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: "/sponsor",
    component: Sponsor,
    children: [
      {
        path: "",
        component: () => import('../views/sponsor/github.vue')
      },
      {
        path: "github",
        component: () => import('../views/sponsor/github.vue')
      },
      {
        path: "afdian",
        component: () => import('../views/sponsor/afdian.vue')
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/"
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router