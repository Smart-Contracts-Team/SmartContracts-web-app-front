import AppLayout from '@/layout/AppLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

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
          component: () => import('@/views/components/CategoryView.vue'),
          props: true
        },
        {
          path: 'tasks/service/:serviceId',
          name: 'ServiceView',
          component: () => import('@/views/components/ServiceView.vue'),
          props: true
        },

        // USER
        {
          path: 'profile',
          name: 'user-profile',
          component: () => import('@/views/pages/UserProfile.vue')
        },
        {
          path: 'my-services',
          name: 'user-services',
          component: () => import('@/views/pages/UserServices.vue')
        },
        {
          path: 'my-contracts',
          name: 'user-contracts',
          component: () => import('@/views/pages/UserContracts.vue')
        },
        {
          path: '/user-information/:userId',
          name: 'user-information',
          component: () => import('@/views/components/UserView.vue'),
          props: true
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

// Guard de navegación global
router.beforeEach((to, from, next) => {
  const publicPages = [
    '/auth/login',
    '/auth/influencer-register',
    '/auth/business-register',
    '/auth/access'
  ]

  const authRequired = !publicPages.includes(to.path)
  const token = localStorage.getItem('token')
  const typeOfUser = localStorage.getItem('typeOfUser')

  if (token && publicPages.includes(to.path)) {
    return next('/home')
  }

  if (authRequired && !token) {
    return next('/auth/login')
  }

  if (to.path === '/my-services' && typeOfUser === 'Business') {
    return next('/home')
  }

  next()
})

export default router
