import AppLayout from '@/layout/AppLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import CategoryView from '@/views/components/CategoryView.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/auth/login',
      component: AppLayout,
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/pages/home.vue')
        },
        {
          path: '/category/:categoryName',
          name: 'CategoryView',
          component: CategoryView,
          props: true
        },

        // USER
        {
          path: 'profile',
          name: 'user-profile',
          component: () => import('@/views/pages/user-profile/User-profile.vue')
        }
      ]
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('@/views/pages/auth/Login.vue')
    },
    {
      path: '/auth/influencer-register',
      name: 'influencerRegister',
      component: () => import('@/views/pages/auth/InfluencerRegister.vue')
    },
    {
      path: '/auth/business-register',
      name: 'businessRegister',
      component: () => import('@/views/pages/auth/BusinessRegister.vue')
    },
    {
      path: '/auth/access',
      name: 'accessDenied',
      component: () => import('@/views/pages/error/Access.vue')
    },
    //error
    {
      path: '/error',
      name: 'error',
      component: () => import('@/views/pages/error/Error.vue')
    },
    //404
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/pages/error/NotFound.vue')
    }
  ]
})

export default router
