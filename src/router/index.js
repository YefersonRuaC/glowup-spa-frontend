import { createRouter, createWebHistory } from 'vue-router'
import AppointmentsLayout from '@/views/appointments/AppointmentsLayout.vue'
import AuthAPI from '@/api/AuthAPI'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: () => import('@/views/auth/AuthLayout.vue'),
      children: [
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/auth/RegisterView.vue')
        },
        {
          path: 'verify/:token',
          name: 'verify',
          component: () => import('@/views/auth/ConfirmAccountView.vue')
        },
        {
          path: '',
          name: 'login',
          component: () => import('@/views/auth/LoginView.vue')
        },
        {
          path: 'forgot-password',
          name: 'forgot-password',
          component: () => import('@/views/auth/ForgotPasswordView.vue')
        },
        {
          path: 'forgot-password/:token',
          name: 'new-password',
          component: () => import('@/views/auth/NewPasswordView.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      meta: { requiresAdmin: true },
      children: [
        {
          path: '',
          name: 'admin-appointments',
          component: () => import('@/views/admin/AppointmentsView.vue'),
        }
      ]
    },
    {
      path: '/appointments',
      name: 'appointments',
      component: AppointmentsLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'my-appointments',
          component: () => import('@/views/appointments/MyAppointmentsView.vue')
        },
        {
          path: 'new',
          component: () => import('@/views/appointments/NewAppointmentLayout.vue'),
          children: [
            {
              path: '',
              name: 'new-appointment',
              component: () => import('@/views/appointments/ServicesView.vue')
            },
            {
              path: 'details',
              name: 'appointment-details',
              component: () => import('@/views/appointments/AppointmentView.vue')
            },
          ]
        },
        {
          path: ':id/edit',
          component: () => import('@/views/appointments/EditAppointmentLayout.vue'),
          children: [
            {
              path: '',
              name: 'edit-appointment',
              component: () => import('@/views/appointments/ServicesView.vue')
            },
            {
              path: 'details',
              name: 'edit-appointment-details',
              component: () => import('@/views/appointments/AppointmentView.vue')
            },
          ]
        }
      ]
    }
  ]
})

//----Auth Navigation Guard----
router.beforeEach( async (to, from, next) => {
  //Accessing to our navigation guard
  const requiresAuth = to.matched.some( url => url.meta.requiresAuth)
  
  if(requiresAuth) {
    //Check the token validity
    try {
      const { data } = await AuthAPI.auth()
      // console.log(data)
      if(data.admin) {
        next({name: 'admin'})
      } else {
        //Token is valid, next to the other middleware
        next()
      }
      
    } catch (error) {
      //If user does not has valid token, redirect the user from login page
      next({name: 'login'})
    }

  } else {
    next()//next, show the view
  }
})

//----Admin Navigation Guard----
router.beforeEach( async (to, from, next) => {
  //Accessing to our navigation guard
  const requiresAdmin = to.matched.some( url => url.meta.requiresAdmin)

  if(requiresAdmin) {
    try {
      await AuthAPI.admin()
      next()
    } catch (error) {
      next({name: 'login'})
    }
  } else {
    next()
  }
})

export default router