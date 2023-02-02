<template>
  <div ref="cart" class="wrapper">
    <div class="cart__header">
      <div class="cart__title">Shopping Cart</div>
      <div @click="closeCart" class="cart__closebtn">close</div>
    </div>
    <div class="cart__list">
      <div v-if="$store.state.cart.length > 0"  class="cart__item_container">
        <div v-for="item in $store.state.cart" :key="item.name" class="cart__item">
          <img :src="photoPath(item.photo)" class="cart__img">
          <div class="cart__item_description">
              <div class="cart__item__title">{{item.name}}</div>
            
            <div class="cart__item__cost_box">
              <div class="quantity__box">
                <div class="cart__item__quantity">
                  <span class="cart__item__span">Quantity: </span>
                  <div class="quantity__btn minus__btn"><img src="../../public/arrow.png" alt="" @click="setQuantityMinus(item.name)" class="quan__btn_img quan__btn_img_down"></div>
                  {{item.quantity}}
                  <div class="quantity__btn plus__btn"><img src="../../public/arrow.png" alt="" @click="setQuantityPlus(item.name)" class="quan__btn_img quan__btn_img_up"></div>
                </div>
              </div>
              <div class="cart__item__price_block">
                <span class="cart__item__span">Price: </span>
                <div class="cart__item__price">{{item.price}} ฿</div>
              </div>
              <div class="cart__item__subtotal">
                <span class="cart__item__span">Subtotal:</span>
                <div class="cart__item__price">{{item.total}} ฿</div>
              </div>
            </div>
          </div>
          <img @click="delFromCart(item.name)" src="../../public/garbage.png" class="cart__item_del_btn">
        </div>
      </div>
      <div v-else class="cart__empty">
        Your shopping cart is currently empty
      </div>
    </div>
    <div class="cart__footer">
      <div class="cart__total">
        <span class="cart__total_span">TOTAL:</span>
        <span class="total__value">{{allCost}} ฿</span>
      </div>
        <button @click.prevent="$router.push('/cart'), closeCart()" class="cart__btns">Cart View</button>
        <button  @click.prevent="checkOut" class="cart__btns">Checkout</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type:Boolean,
      required: true,
      default() {
        return false
      }
    }
  },
  data(){
    return {
      isVisible: false
    }
  },
  methods: {
    closeCart() {
      this.$emit('closeCart')
    },
    setQuantityPlus(name) {
      this.$store.commit('incrementCartItem', name)
    },
    setQuantityMinus(name) {
      this.$store.commit('decrementCartItem', name)
    }, 
    delFromCart(name) {
      this.$store.commit('deleteCartItem', name)
    },
    checkOut(){
      if (this.$store.state.isAuth) {
        this.$emit('address')
      } else {
        this.closeCart()
        this.$router.push('/checkout')
      }
    },
    photoPath(str){
      return window.location.origin + str
    }
  },
  watch: {
    show(){
      if (this.show === true) {
        this.$refs.cart.classList.remove('closecart')
        this.$refs.cart.classList.add('showcart')
      } else {
        this.$refs.cart.classList.remove('showcart')
        this.$refs.cart.classList.add('closecart')

      }
    }
  },
  computed: {
    allCost() {
      let sum = 0
      this.$store.state.cart.forEach(item => sum += item.total)
      return sum
    }
  },
  mounted() {
    this.$store.dispatch('getCart')
  }
}
</script>
<style scoped>
  .wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 360px;
    height: 100%;
    background-color: white;    
    z-index: 15;
    box-sizing:border-box;
    box-shadow: 0 0 6px lightgrey;
    transform: translateX(105%);
  }
  .showcart {
    animation: showcart 1s forwards;
  }
  .closecart {
    animation: closecart 1s forwards;
  }
  
  .cart__header {
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px 15px 20px;
    border-bottom: 1px solid lightgrey;
  }
  .cart__title {
    font-size: 27px;
    font-weight: bold;
    color:#a3c52d;
  }
  .cart__closebtn {
    padding: 4px;
    cursor: pointer;
    font-weight: 500;
    font-size: 20px;
  }
  .cart__list {
    padding: 0 15px;
    overflow-y: scroll;
    height: calc(100% - 200px);
  }
  .cart__item {
    width: 100%;
    display: flex;
    border-bottom: 1px solid rgba(211, 211, 211, 0.777);
    position: relative;
  }
  .cart__img {
    min-width: 70px;
    width: 70px;
    margin: 10px;
  }
  .cart__item_description {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
  }
  .category__name__block {
    display: flex;
    justify-content: flex-start;
  }
  .cart__item__title {
    font-size: 18px;
    font-weight: 600;
  }
  .cart__item_text {
    padding: 5px 10px;
    display: flex;
    font-size: 14px;
    font-weight: 400;
    color: grey;
  }
  .cart__item__cost_box {
    padding: 5px 10px 0;
    font-size: 15px;
  }

  .quantity__btn {
    color:#a3c52d;
    cursor: pointer;
    font-weight: bold;
    display: flex;
    min-width: 22.5px;
    height: 22.5px;
    width: 100%;
    justify-content: center;
    font-size: 22px;
    align-items: center;
  }
  .quantity__btn:hover {
    color: black;
  }
  .quan__btn_img {
    width: 10px;
  }
  .quan__btn_img_down {
    transform: rotate(-90deg);
  }
  .quan__btn_img_up {
    transform: rotate(90deg);
  }
  .cart__item__quantity {
    display: flex;
    font-weight: bold;
  }
  .cart__X {
    margin: 0 10px;
  }
  .quantity__box {
    display: flex;
    margin-top: 10px;
    padding-left: 15px;
  }

  .cart__item__price_block {
    display: flex;
    margin-top: 10px;
    padding-left: 15px;
  }
  .cart__item__price {
    font-weight: 500;
    font-size: 17px;
  }
  .cart__item__span {
    font-size: 17px;
    font-weight: 500;
  }
  .cart__item__subtotal {
    display: flex;
    margin-top: 10px;
    padding-left: 15px;
  }
  .cart__item__span {
    margin-right: 15px;
  }
  .cart__item_del_btn {
    width: 40px;
    height: 40px;
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 10px;
  }
  .cart__empty {
    font-size: 21px;
    font-weight: bold;
    text-align: center;
    color: grey;
    padding: 0 20px;
  }


  .cart__footer {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 10px;
    box-shadow: 0 0 4px lightgrey;
  }
  .cart__total {
    display: flex;
    justify-content: center;
  }
  .cart__total_span {
    font-size: 21px;
    font-weight: bold;
    color:#a3c52d;
  }
  .total__value {
    padding-left: 20px;
    font-size: 21px;
    font-weight: 500;
  }
  .cart__btns {
    background: none;
    border: none;
    border: 2px solid #a3c52d;
    color:#a3c52d;
    padding: 3px 20px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
  .cart__btns:hover {
    background-color:#a3c52d;
    color:white;
  }


  @media screen and (max-width: 360px) {
    .wrapper {
      width: 280px;
    }
    .cart__item_del_btn {
      width: 20px;
      height: 20px;
      top: 10px;
    }
  }


  @keyframes showcart {
    0% {transform: translateX(105%);}
    100% {transform: translateX(0)} 
  }
  @keyframes closecart {
    0% {transform: translateX(0);}
    100% {transform: translateX(105%)} 
  }
  
</style>