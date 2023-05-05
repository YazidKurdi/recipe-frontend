import { createRouter, createWebHashHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import MyRecipes from '../views/MyRecipes.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import MyAccount from '../views/MyAccount.vue'
import SocialAuth from '../views/SocialAuth.vue'
import RecipesGPT from '../views/RecipesGPT.vue'
import store from '@/store'
import toasts from '@/modules/toasts'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
    meta: { title: 'Home' }
  },
  {
    path: '/my-recipes',
    name: 'MyRecipes',
    component: MyRecipes,
    meta: { title: 'MyRecipes' }
  },
  {
    path: '/register',
    name: 'SignUp',
    component: SignUp,
    meta: { title: 'Register' }
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn,
    meta: { title: 'Login' }
  },
  {
    path: '/my-account',
    name: 'MyAccount',
    component: MyAccount,
    meta: { title: 'My Account' }
  },
  {
    path: '/recipesGPT',
    name: 'recipesGPT',
    component: RecipesGPT,
    meta: { title: 'RecipesGPT' }
  },
  {
    path: '/test',
    name: 'Test',
    component: SocialAuth
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach((to) => {
  const title = to.meta.title + ' | Recipes'
  document.title = title
})

router.beforeEach((to, from, next) => {
  if (['/recipesGPT', '/my-recipes'].includes(to.path) && !store.state.isAuthenticated) {
    toasts.toastError('You must be logged in to view this page')
    next('/login')
  } else {
    next()
  }
})

export default router
