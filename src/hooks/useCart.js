import {ref, onBeforeMount} from 'vue'

export function useCart() {
  const cartInside = ref([])
  const cartItems = ()=>{
    if (localStorage.getItem('cart')){
      cartInside.value = JSON.parse(localStorage.getItem('cart'))
      return JSON.parse(localStorage.getItem('cart'))
    }
  }


  onBeforeMount(()=>{
    cartItems()
  })
  return {
    cartItems, cartInside
  }
}