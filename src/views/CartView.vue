<template>
  <div class="wrapper">
  <div class="line"></div>
  <div class="cart__section">
    <div class="order__container">
      <div v-if="$store.state.cart.length === 0" class="cart__empty">Cart is empty</div>
      <div v-else class="order__list">
        <div class="order_header">
          <div class="order_header_product">Product</div>
          <div class="order_header_price">Price</div>
          <div class="order_header_quantity">Quantity</div>
          <div class="order_header_subtotal">Subtotal</div>
        </div>
        <div v-for="item in $store.state.cart" :key="item.name" class="cart__item">
          <div class="cart__item_product">
            <img @click="delFromCart(item.name)" src="../../public/garbage.png" class="cart__item_del_btn">
            <img :src="photoPath(item.photo)" class="cart__item_img">
            <div class="cart__item_name">{{item.name}}</div>
          </div>
          <div class="cart__item_price"><span>{{item.price}} ฿</span></div>
          <div class="cart__item_quantity">
            <div class="quantity__btn minus__btn"><img src="../../public/arrow.png" alt="" @click="setQuantityMinus(item.name)" class="quan__btn_img quan__btn_img_down"></div>
            <span class="cart__item_quan_span">{{item.quantity}}</span>
            <div class="quantity__btn plus__btn"><img src="../../public/arrow.png" alt="" @click="setQuantityPlus(item.name)" class="quan__btn_img quan__btn_img_up"></div>
          </div>
          <div class="cart__item_subtotal">{{item.total}} ฿</div>
        </div>
      </div>
    </div>
    <div class="total__contaner">
      <div class="total">
        <div class="total__title">Cart Total</div>
        <div class="total__row">
          <span class="total__shipping_inform">shipping is not included in the price of the goods</span>
        </div>
        <div class="total__row">
          <span class="total__span">Total:</span><span class="total__span">{{setCost()}} ฿</span>
        </div>
        <button @click="checkOut" :disabled="checkCart" class="checkout_btn">CHECKOUT</button>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  methods: {
    setQuantityPlus(name) {
      this.$store.commit('incrementCartItem', name)
    },
    setQuantityMinus(name) {
      this.$store.commit('decrementCartItem', name)
    }, 
    delFromCart(name) {
      this.$store.commit('deleteCartItem', name)
    },
    setCost(){
      if (this.$store.state.cart.length>0){
        let costValue = 0
        this.$store.state.cart.forEach(item=> costValue = costValue + item.total)
      return costValue} else { return 0 }
    },
    checkOut(){
      if (this.$store.state.isAuth) {
        this.$emit('address')
      } else {
        this.$router.push('/checkout')
      }
    },
    photoPath(str){
      return window.location.origin + str
    }
  },
  computed:{
    checkCart(){
      if (this.$store.state.cart.length > 0) {
        return false
      } else {return true}
    }
  }
}
</script>
<style scoped>
  .cart__section {
    width: 100%;
    max-width: 1140px;
    margin: 0 auto;
    display: flex;
  }
  .line {
    width: 100%;
    height: 60px;
    background-color:rgb(72, 72, 72);
  }
  .order__container {
    width: 65%;
    padding: 15px;
  }
  .total__contaner {
    width: 35%;
  }
  .order__list {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .order_header {
    width: 100%;
    display: flex;
    font-weight: bold;
    color:#a3c52d;
    font-size: 24px;
    border-bottom: 1px solid lightgrey;
  }
  .order_header_product {
    width: 40%;
    text-align: center;
  }
  .cart__item_product {
    width: 40%;
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content: center;
  }
  .cart__item_del_btn {
    width: 30px;
    height: 30px;
    cursor:pointer;
  }
  .cart__item_img {
    width: 40px;
    margin: 0 20px;
  }
  .order_header_quantity {
    width: 20%;
    text-align: center;
  }
  .cart__item_quantity {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .order_header_price {
    width: 20%;
    text-align: center;
  }
  .cart__item_price {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .order_header_subtotal {
    width: 20%;
    text-align: center;
  }
  .cart__item_subtotal {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
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
  .cart__item {
    width: 100%;
    display: flex;
    border-bottom: 1px solid rgba(211, 211, 211, 0.777);
    position: relative;
    padding: 5px 0;
  }
  .cart__img {
    min-width: 50px;
    width: 50px;
    margin: 10px;
  }
  .total__contaner {
    padding: 20px;
  }
  .total {
    border: 1px solid lightgrey;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    overflow: hidden;
    min-width: 360px;
  }
  .total__title {
    font-size: 24px;
    font-weight: 500;
    text-align: center;
    background-color:#a3c52d;
    padding: 10px;
    color: white;
  }
  .total__row {
    width: 100%;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
  }
  .total__shipping_inform {
    font-size: 16px;
    font-weight: 400;
    color:grey;
  }
  .total__span {
    font-size: 22px;
    font-weight: 400;
  }
  .checkout_btn {
    width: 250px;
    padding: 6px 10px;
    text-align: center;
    border: none;
    background: none;
    font-size: 22px;
    font-weight: bold;
    color: white;
    background-color:#a3c52d;
    margin: 20px auto;
    cursor: pointer;
    box-shadow: 0 0 5px grey;
  }
  .checkout_btn:disabled {
    background-color: grey;
  }
  .checkout_btn:hover {
    box-shadow: none;
  }

  @media screen and (max-width:1100px) {
    .cart__section {
      flex-direction: column;
      justify-content: center;
    }
    .total__contaner {
      width: auto;
      max-width: 550px;
      margin: 0 auto;
    }
    .order__container {
      width: auto;
    }
  }
  @media screen and (max-width:500px) {
    .order_header {
      font-size: 16px;
    }
    .total {
      min-width: 280px;
    }
  }
  @media screen and (max-width:360px) {
    .order_header {
      font-size: 11px;
    }
    .total {
      min-width: 260px;
    }
    .total__contaner {
      padding: 20px 3px;
    }
    .cart__item_img {
      width: 25px;
    }
    .cart__item_del_btn {
      width: 15px;
      height: 15px;
    }
    .cart__item {
      font-size: 12px;
    }
  }
</style>