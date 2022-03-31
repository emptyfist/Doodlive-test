import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import type { CurrentUserData } from '@/@types'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () =>
      import(/* webpackChunkName: "signup" */ '../views/auth/SignupView.vue'),
    meta: {
      requiresNoAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/LoginView.vue'),
    meta: {
      requiresNoAuth: true
    }
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import(/* webpackChunkName: "forgot-password" */ '../views/auth/ForgotPasswordView.vue'),
    meta: {
      requiresNoAuth: true
    }
  },
  {
    path: '/verify',
    name: 'verify',
    component: () => import(/* webpackChunkName: "verify" */ '../views/auth/VerifyView.vue'),
    meta: {
      requiresVerify: true
    }
  }
]

const getCurrentUser = (): Promise<CurrentUserData> =>
  new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user as CurrentUserData);
      },
      reject
    );
  });

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (user && !user.emailVerified) {
      next("/verify")
    } else if (user) {
      next() // go to wherever I'm going
    } else {
      next({ name: 'login' })
    }
  } else if (to.matched.some((record) => record.meta.requiresNoAuth)) {
    if (!user) {
      next()
    } else {
      next("/")
    }
  } else if (to.matched.some((record) => record.meta.requiresVerify)) {
    if (user && !user.emailVerified) {
      next()
    } else {
      next("/")
    }
  } else {
    console.log("else");
    if (user && !user.emailVerified) {
      next("/verify")
    } else {
      next()
    }
  }
})

export default router
