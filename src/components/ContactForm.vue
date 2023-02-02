<template>
  <div class="wrapper">
    <div class="cotact__title">CONTACT US FOR ANY QUESTIONS</div>
    <input type="text" v-model="name" class="contact__input" placeholder="Name:">
    <input type="text" v-model="mail" class="contact__input" placeholder="Mail:">
    <input type="text" v-model="subject" class="contact__input" placeholder="Subject:">
    <textarea name="message" v-model="message" id="message" cols="30" rows="10" class="contact__textarea" placeholder="Message:"></textarea>
    <button @click.prevent="sendLetter" class="contact__btn">SEND</button>
  </div>
</template>
<script>
import {useLetter} from '@/hooks/useLetter'
export default {
  data() {
    return {
      name: '',
      mail: '',
      subject: '',
      message: ''
    }
  },
  methods: {
    sendLetter(){
      const body = {}
      body.senderName = this.name
      body.senderMail = this.mail
      body.senderTopic = this.subject
      body.senderMessage = this.message
      this.letterBoddy = body
      this.send
    }
  },
  watch: {
    clearForm(){
      this.name = '',
      this.mail = '',
      this.subject = '',
      this.message = ''
    }
  },
  setup(){
    const {letterBoddy, send, clearForm} = useLetter()
    return {
      letterBoddy, send, clearForm
    }
  }
}
</script>
<style scoped>
  .wrapper {
    padding: 15px;
    color: black;
    display: flex;
    flex-direction: column;
  }
  .cotact__title {
    font-size: 28px;
    font-weight: 500;
    margin: 20px 0;
  }
  .contact__input {
    margin: 10px 0;
    padding: 5px 10px;
    font-size: 16px;
  }
  .contact__input:focus {
    outline: 2px solid #a3c52d;
    border: none;
    box-sizing:border-box;
  }
  .contact__textarea {
    margin: 10px 0;
    padding: 5px 10px;
  }
  .contact__textarea:focus {
    outline: 2px solid #a3c52d;
    border: none;
    box-sizing:border-box;
    font-size: 16px;
  }
  .contact__btn {
    border: none;
    background: none;
    border: 2px solid #a3c52d;
    color:#a3c52d;
    font-weight: bold;
    padding: 5px 10px;
    box-shadow: 0 0 5px lightgrey;
    max-width: 120px;
  }
  @media screen and (max-width: 560px) {
    .cotact__title {
      font-size: 20px;
    }
  }
</style>