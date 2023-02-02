<template>
  <div class="wrapper">
  <div class="line"></div>
  <div class="checkout__title">Checkout</div>
    <div class="checkout__container">
      <div class="signup_section">
        <div class="form__contaner">
          <div v-if="!$store.state.isAuth" class="question">If you already have an account: <span @click="$router.push('/login')" class="login_link">Login</span></div>
          <label for="name" class="form__label star">Enter your name:</label>
          <input type="text" v-model="name" name="name" class="form__input" required placeholder="Your name">
          <label for="birthday" class="form__label star">Date of Birth</label>
          <input v-model="birthday" name="birthday" required type="date" class="date__input">
          <label for="mail" class="form__label star">Your email</label>
          <input type="mail" v-model="mail" name="mail" class="form__input" required placeholder="example@mail.ru">
          <label for="phone" class="form__label star">Phone number for contact. If you don't have a Thai number, please enter the phone number of your country, but be sure to include the telegram or line below</label>
          <input v-model="phone" type="phone" required name="phone" class="form__input" placeholder="+66 99 999 9999">
          <label for="messenger" class="form__label">Line Id or Telegram</label>
          <input v-model="messenger" type="text" required name="messenger" class="form__input" placeholder="LineId or Telegram">
          <label for="password" class="form__label star">Pick a password</label>
          <input type="password" v-model="password" minlength="6" required name="password" class="form__input" placeholder="Minimal length 6 symbol">
          <label for="confirm" class="form__label star">Duplicate your password</label>
          <input type="password" :class="{incorect: (confirmPas.length >0 && confirmPas !== password)}" v-model="confirmPas" required name="confirm" class="form__input">
        </div>
      </div>
      <div class="order_section">
        <div class="order_box">
          <div class="order__title">Order List</div>
          <div v-for="item in $store.state.cart" :key="item.name" class="order__item">
            <div class="order__row">
              <span>{{item.name}}</span>
              <span>{{item.quantity}}</span>
              <span>{{item.price}}฿</span>
              <span>{{item.total}}฿</span>
            </div>
          </div>
          <div class="order__footer">
            <span>Total order:</span><span>{{allCost}} ฿</span>
          </div>
        </div>
        <div class="address__box">
          <div class="address__title">Enter your shipping address:</div>
          <textarea type="text" v-model="address" class="address__input" placeholder="Pattaya, Phra Tamnak, soi 4, Night City Freedom Club"></textarea>
          <button :disabled="checkForm" @click="registrationFuncAndSendOrder" class="checkout__btn">Confirm order</button>
        </div>
      </div>
    </div>
    <my-alert :showAlert="showAlert">
      {{messageAlert}}
    </my-alert>
  </div>
</template>
<script>
import { useAuth } from '@/hooks/useAuth';
import { useOrders } from '@/hooks/useOrders';

export default {
  data() {
    return {
      name: '',
      phone: '',
      birthday: '',
      mail: '',
      messenger: '',
      password: '',
      confirmPas: '',
      address: '',
      messageAlert:'',
      showAlert: false
    }
  },
  methods:{
    async registrationFuncAndSendOrder() {
      const body = {}
      body.username=this.name
      body.birthday=this.birthday
      body.phone=this.phone
      body.usermail=this.mail
      body.password=this.password
      if (this.messenger.length >0){
        body.telegram=this.messenger
      }
      this.registrBody = body
      const answer = await this.registration()
      if (answer.status === 200) {
        this.loginBody = {'usermail':this.mail,'password':this.password}
        const response = await this.loginFunction()
        if (response){
          this.$store.commit('setRolesAndAuth', response)
          const costValue = this.allCost
          const address = this.address
          const answer = await this.createOrder(this.$store.state.cart, costValue, address)
          this.messageAlert = answer.message;
          this.showAlert =true
          this.clearCart()
          setTimeout(()=>{
            this.$router.push(`/user/${response.id}`)
          }, 2500)
        }
      }
    },
    clearCart(){
      this.$store.commit('clearCart')
      localStorage.setItem('cart', [])
    }
  },
  computed: {
    allCost() {
      let sum = 0
      this.$store.state.cart.forEach(item => sum += item.total)
      return sum
    },
    checkForm(){
      if (this.confirmPas !== this.password || this.name === '' || this.phone === '' || this.birthday === '' || this.mail === '' || this.password === '' || this.confirmPas === '', this.address === '') {
        return true
      } else {return false}
    }
  },
  setup() {
    const {registration, registrBody, loginFunction, result, loginBody} = useAuth()
    const {createOrder} = useOrders()
    return {
      registration, registrBody, loginFunction, result, loginBody, createOrder
    }
  }
  
}
</script>
<style scoped>
  .line {
    width: 100%;
    height: 60px;
    background-color:rgb(72, 72, 72);
  }
  .checkout__title {
    width: 100%;
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    color: #a3c52d;
    margin-bottom: 30px;
    margin-top: 30px;
  }
  .question {
    text-align: end;
    font-size: 18px;
    font-weight: 500;
  }
  .login_link {
    color: green;
    cursor: pointer;
  }
  .checkout__container {
    display: flex;
    width: 100%;
    margin: 0 auto;
    max-width: 1140px;
  }
  .signup_section {
    width: 60%;
    padding: 15px;
  }
  .form__contaner {
    display: flex;
    flex-direction: column;
  }
  .form__label {
    font-size: 18px;
    padding: 10px;
  }
  .form__input {
    font-size: 18px;
    padding: 5px 10px;
  }
  .date__input {
    font-size: 18px;
    padding: 5px 10px;
    max-width: 150px;
  }
  .star::after {
    content: '*';
    color: red;
  }



  .order_section {
    width: 40%;
    padding: 15px;
    min-width: 360px;
  }
  .order_box {
    border-radius: 10px;
    box-shadow: 0 0 5px lightgrey;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin-top: 20px;
  }
  .order__title {
    text-align: center;
    background-color:#a3c52d;
    color: white;
    padding: 6px 10px;
    font-weight: bold;
    font-size: 24px;
  }
  .order__item {
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
  .order__row {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid lightgrey;
  }
  .order__footer {
    text-align: center;
    background-color:#a3c52d;
    color: white;
    padding: 6px 10px;
    font-weight: bold;
    font-size: 24px;
    display: flex;
    justify-content: space-around;
  }
  .address__box {
    margin-top: 20px;
    display: flex;
    width: 100%;
    padding: 10px;
    flex-direction: column;
  }
  .address__title {
    text-align: center;
    font-size: 19px;
    font-weight: bold;
  }
  .address__input {
    font-size: 18px;
    padding: 5px 10px;
    margin-top: 20px ;
  }
  .checkout__btn {
    margin-top: 20px;
    padding: 6px 15px;
    color: white;
    background-color:#a3c52d;
    box-shadow: 0 0 6px lightgrey;
    font-size: 18px;
    font-weight: bold;
    border:none;
    cursor: pointer;
  }
  .checkout__btn:hover {
    box-shadow: none;
  }
  .checkout__btn:disabled {
    border: 2px solid grey;
    color:grey;
    background-color:lightgrey;
  }

  @media screen and (max-width:725px) {
    .checkout__container {
      flex-wrap: wrap;
    }
    .signup_section {
      width: 100%;
    }
    .order_section {
      width: 100%;
    }
  }
  @media screen and (max-width:360px) {
    .order_section {
      min-width: 280px;
    }
    .address__input {
      min-height: 150px;
    }
  }
</style>