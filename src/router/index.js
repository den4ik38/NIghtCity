import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import Catalog from '../views/Catalog.vue'
import ItemPage from '../views/ItemPage.vue'
import AdminPage from '../views/AdminPage.vue'
import ContactUs from '../views/ContactUs.vue'
import UserPage from '../views/UserPage.vue'
import CartView from '../views/CartView.vue'
import CheckOut from '../views/CheckOut.vue'
import ProductPage from '../views/ProductPage.vue'



const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: Catalog
  },
  {
    path: '/contact-us',
    name: 'contactus',
    component: ContactUs
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminPage
  },
  {
    path: '/catalog/:name',
    name: 'page',
    component: ItemPage,
    props: routes => ({ query: routes.query })
  },
  {
    path: '/catalog/:type/:id',
    name: 'product',
    component: ProductPage,
    props: routes => ({ query: routes.query })
  },
  {
    path: '/user/:id',
    name: 'user-page',
    component: UserPage,
    props: routes => ({ query: routes.query })
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckOut
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
