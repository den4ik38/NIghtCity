<template>
  <div v-if="visible" class="bg">
    <div class="dialog__content">
      <div class="dialog__title">Enter your shipping address:</div>
      <textarea v-model="address" name="address" id="address" cols="30" rows="3" placeholder="Delivery address..." class="dialog__address"></textarea>
      <button :disabled="checkCart" @click="sendOrder" class="dialog__confirm_btn">Confirm Order</button>
      <div @click="closeDialog" class="close__btn"></div>
    </div>
    <my-alert :showAlert="showAlert">
      {{messageAlert}}
    </my-alert>
  </div>
</template>
<script>
import { useOrders } from '@/hooks/useOrders';

export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    }
  },
  data(){
    return {
      address:'',
      messageAlert:'',
      showAlert: false
    }
  },
  methods:{
    closeDialog(){
      this.$emit('update:visible', false)
    },
    clearCart(){
      this.$store.commit('clearCart')
      localStorage.setItem('cart', [])
    },
    async sendOrder(){
      const costValue = this.allCost
      const address = this.address
      const answer = await this.createOrder(this.$store.state.cart, costValue, address)
      this.messageAlert = answer.message;
      this.showAlert =true
      this.clearCart()
      setTimeout(()=>{
        this.showAlert = false
        this.messageAlert = ''
        this.address=''
        this.$router.push(`/user/${this.$store.state.id}`)
        this.$emit('update:visible', false)
      }, 2500)
    }
  },
  computed: {
    checkCart(){
      if (this.$store.state.cart.length > 0 && this.address.length > 0) {
        return false
      } else {return true}
    },
    allCost() {
      let sum = 0
      this.$store.state.cart.forEach(item => sum += item.total)
      return sum
    }
  },
  setup(){
    const {createOrder} = useOrders()
    return {
      createOrder
    }
  }
}
</script>
<style scoped>
  .bg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left:0;
    background-color: rgba(0, 0, 0, 0.75);
    display: flex;
    z-index: 999;
  }
  .dialog__content {
    margin: auto;
    background-color: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 10px;
  }
  .dialog__title {
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    margin: 20px;
    color:#a3c52d;
  }
  .dialog__address {
    width: 100%;
    padding: 10px;
    font-size: 19px;
  }
  .dialog__confirm_btn {
    margin: 20px auto 0;
    padding: 6px 15px;
    background-color: #a3c52d;
    font-weight: bold;
    color:white;
    text-align: center;
    cursor: pointer;
    width: 150px;
  }
  .dialog__confirm_btn:hover {
    box-shadow: 0 0 8px #a3c52d;
    text-decoration: underline;
  }
  .dialog__confirm_btn:disabled {
    background-color: grey;
  }
  .close__btn {
    position: absolute;
    top: -30px;
    right: -30px;
    width: 30px;
    height: 30px;
    cursor:pointer;
  }
  .close__btn:hover::before {
    box-shadow: 0 0 5px white
  }
  .close__btn:hover::after {
    box-shadow: 0 0 5px white
  }
  .close__btn::before {
    content: '';
    box-sizing:border-box;
    width: 30px;
    height: 1px;
    border: 2px solid white;
    position: absolute;
    top: 15px;
    transform: rotate(45deg);
  }
  .close__btn::after {
    content: '';
    box-sizing:border-box;
    width: 30px;
    height: 1px;
    border: 2px solid white;
    position: absolute;
    top: 15px;
    transform: rotate(-45deg);
  }
  @media screen and (max-width:540px) {
    .close__btn {
      right: 0;
      top:-35px;
    }
  }
</style>