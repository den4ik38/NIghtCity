<template>
  <div class="container">
    <div v-if="letters.length > 0" class="wrapper">
    <my-letter v-for="item in letters" :key="item.id" :item="item"/>
    </div>
    <div v-if="letters.length === 0" class="loader">
      <div class="loader__text">Loading...</div>
      <div class="preloader-7"> 
        <div>
            <div>
                <div>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  
</template>
<script>
import {useLetter} from '@/hooks/useLetter'
import MyLetter from '@/components/adminContent/MyLetter.vue'

export default {
  components: {
    MyLetter
  },
  mounted(){
    this.fetchLetters()
  },
  setup() {
    const {letters, fetchLetters} = useLetter()
    return {
      letters, fetchLetters
    }
  }
}
</script>
<style scoped>
.container {
  display: flex;
}
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
  }
  .loader {
    margin: 20px auto;
  }
  .loader__text {
    font-size: 32px;
    text-align: center;
    color: grey;
  }
  .preloader-7 div {
    border: 14px inset #FFF;
    border-radius: 100%;
    padding: 4px;
    animation: preloader-7-spin 15s linear infinite;
  }
  @keyframes preloader-7-spin {
      from { transform: rotate(0deg) }
      to { transform: rotate(360deg) }
  }
  
</style>