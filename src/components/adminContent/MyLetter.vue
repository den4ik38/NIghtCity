<template>
  <div class="wrapper">
    <div class="letter">
      <div class="header">
        <div class="name">Name sender: {{item.senderName}}</div>
        <div class="mail"> mail: {{item.senderMail}}</div>
        <div class="date"> Date: {{item.date}}</div>
      </div>
      <div class="topic__body">
        <div class="topic__title">Subject: {{item.senderTopic}}</div>
      </div>
      <div class="message">{{item.senderMessage}}</div>
      <div class="answer">
        <button @click.prevent="openAnswer" class="open__button">Write Answer</button>
        <div v-if="writeAnswer" class="answer__container">
          <textarea name="answer" id="answer" cols="30" rows="10" class="answer__message"></textarea>
          <button class="send__button">Send</button>  
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      writeAnswer: false
    }
  },
  methods: {
    openAnswer() {
      this.writeAnswer = !this.writeAnswer
    }
  }
}
</script>
<style scoped>
  .wrapper {
    width: 100%;
  }
  .letter {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-shadow: 0 0 5px lightgrey;
    margin: 10px;
  }
  .header {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    padding: 15px;
    background-color:#a4c52d83;
  }
  .name {
    font-size: 17px;
    font-weight: 500;
  }
  .mail {
    font-size: 17px;
    font-weight: 500;
  }
  .date {
    font-size: 17px;
    font-weight: 500;
  }
  .topic__body {
    padding: 15px;
  }
  .topic__title {
    font-size: 18px;
    font-weight: 500;
  }
  .message {
    padding: 15px;
    font-size: 17px;
    border: 0.5px solid lightgrey;
    margin-bottom: 10px ;
  }
  .open__button {
    width: 100%;
    padding: 5px;
    font-size: 17px;
  }
  .answer {
    width: 100%;
    padding: 10px;
  }
  .open__button {
    padding: 5px 10px;
    width: fit-content;
  }
  .answer__container {
    display: flex;
    flex-direction: column;
  }
  .send__button {
    width: fit-content;
    padding: 5px 10px;
  }
  .answer__message {
    margin: 10px;
    padding: 15px;
    font-size: 16px;
  }
</style>