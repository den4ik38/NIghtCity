import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuth: false,
    roles:[],
    cart:[],
    id:'',
    name: '',
    adult: false,
  },
  getters: {
  },
  mutations: {
    setRolesAndAuth(state, arr) {
      state.roles = arr[0]
      state.id = arr[1]
      state.name = arr[2]
      state.isAuth = true
    },
    setCart(state, cart) {
      state.cart = cart
    },
    clearCart(state) {
      state.cart = []
    },
    addInCart(state, itemList) {
      state.cart = itemList
    },
    incrementCartItem(state, itemName) {
      state.cart.map(item=> {
        if (item.name === itemName) {
          item.quantity +=1
          item.total = item.quantity* item.price
        }
      })
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    decrementCartItem(state, itemName) {
      state.cart.map(item=> {
        if (item.name === itemName) {
          item.quantity -=1
          item.total = item.quantity* item.price
        }
      })
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    deleteCartItem(state, itemName) {
      state.cart = state.cart.filter(item=> {
        if (item.name !== itemName) {
          return item
        }
      })
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  },
  actions: {
    getCart(context) {
      if (localStorage.getItem('cart')) {
        const cart = JSON.parse(localStorage.getItem('cart'))
        context.commit('setCart', cart)
      }
    }
  },
  modules: {
  }
})
