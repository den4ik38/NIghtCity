<template>
  <div>
    <form class="form">
      <div class="form__header">Заполните форму</div>
      <div class="form__contaner">
        <label for="mail" class="form__label">Введите адрес электронной потчы</label>
        <input type="mail" v-model="mail" name="mail" class="form__input" required placeholder="example@mail.ru">
        <label for="password" class="form__label">Введите пароль</label>
        <input type="password" v-model="password" minlength="6" required name="password" class="form__input" placeholder="Пароль аккаунта">
      </div>
      <div class="form__btns">
        <button type="submit" @click.prevent="login" class="form__btn form__submit">Войти</button>
      </div>
      <div @click="$router.push('/signup')" class="forrm__footer">Регистрация</div>
    </form>
    <my-alert :showAlert="showAlert">
      {{allertMessage}}
    </my-alert>
  </div>
</template>
<script>
import { useAuth } from '@/hooks/useAuth'
export default {
  data(){
    return {
      mail: '',
      password: '',
      allertMessage:'',
      showAlert: false
    }
  },
  methods: {
    login(){
      const body = {}
      body.usermail = this.mail
      body.password = this.password
      this.loginBody = body
      this.loginFunction()
    }
  },
  watch:{
    result(){
      if (this.result){
      this.$store.commit('setRolesAndAuth', this.result)
      this.$router.push('/catalog')
    } else {
      this.allertMessage = 'incorrect password or nickname'
      this.showAlert = true
    }
    }
  },
  setup(){
    const {loginBody, loginFunction, result} = useAuth()
    return {
      loginBody, loginFunction, result
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
  }
  .forrm__footer {
    background-color:#a3c52d;
    padding: 10px;
    text-align: center;
    cursor: pointer;
  }
</style>