<template>
  <form class="form">
    <div class="form__header">Fill the form</div>
    <div class="form__contaner">
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
    <div class="form__btns">
      <button type="reset" class="form__btn form__reset">Clear form</button>
      <button @click.prevent="registrationFunc" :disabled="checkFrom" type="submit" class="form__btn form__submit">Registration</button>
    </div>
    <div @click="$router.push('/login')" class="forrm__footer">Already have an account</div>
    <my-alert v-model:showAlert="showAlert">
      {{ alertMessage }}
    </my-alert>
  </form>
</template>
<script>
import { useAuth } from '@/hooks/useAuth';

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
      showAlert: false,
      alertMessage: ''
    }
  },
  methods: {
    async registrationFunc() {
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
      this.alertMessage = answer.message
      this.showAlert = true
      setTimeout(()=>{
        this.$router.push('/login')
      }, 1500)
    }
  },
  computed: {
    checkFrom(){
      if (this.confirmPas !== this.password || this.name === '' || this.phone === '' || this.birthday === '' || this.mail === '' || this.password === '' || this.confirmPas === '') {
        return true
      } else {return false}
    },
  },
  setup() {
    const {registration, registrBody} = useAuth()
    return {
      registration, registrBody
    }
  }
}
</script>
<style scoped>
  .form {
    width: 100%;
    max-width: 350px;
    border-radius: 10px;
    box-shadow: 0 0 10px grey;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .form__header {
    background-color: #a3c52d;
    text-align: center;
    padding: 10px 0;
  }
  .form__contaner {
    display: flex;
    flex-direction: column;
    padding: 15px 10px 10px;
  }
  .form__input {
    padding: 5px 10px;
    width: 100%;
  }
  .form__label {
    margin: 10px 0;
  }
  .date__input {
    width:fit-content;
  }
  .incorect:focus {
    outline: red;
    border: 1px solid red;
  }
  .form__btns {
    display: flex;
    justify-content: space-around;
    padding: 10px;
  }
  .form__btn {
    background: none;
    border: 2px solid #a3c52d;
    color:#a3c52d;
    padding: 5px 10px;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
  }

  .form__btn:disabled {
    border: 2px solid grey;
    color:grey;
  }
  .forrm__footer {
    background-color:#a3c52d;
    padding: 10px;
    text-align: center;
    cursor: pointer;
  }
  .star::after {
    content: '*';
    color: red;
  }
</style>