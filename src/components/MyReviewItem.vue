<template>
  <div class="wrapper">
    <div class="form__write" v-if="send === false">
      <div class="review__title">We'd love to hear from you review</div>
      <label for="name" class="input__label">Write the name under which your review will be published:</label>
      <input name="name" v-model="name" type="text" class="name__input" placeholder="name or nickname">
      <div class="raiting__box">
        <div class="raiting__label">Your rating:</div>
        <div class="rating_block">
          <input name="rating" value="5" id="rating_5" type="radio" />
          <label for="rating_5" @click="changeRait(5)" class="label_rating"></label>
        
          <input name="rating" value="4" id="rating_4" type="radio" />
          <label for="rating_4" @click="changeRait(4)" class="label_rating"></label>
        
          <input name="rating" value="3" id="rating_3" type="radio" />
          <label for="rating_3" @click="changeRait(3)" class="label_rating"></label>
        
          <input name="rating" value="2" id="rating_2" type="radio" />
          <label for="rating_2" @click="changeRait(2)" class="label_rating"></label>
        
          <input name="rating" value="1" id="rating_1" type="radio" />
          <label for="rating_1" @click="changeRait(1)" class="label_rating"></label>
        </div>
      </div>
      <div class="input__label">Your review:</div>
      <textarea name="review__text" v-model="message" id="review__text" cols="45" rows="8" class="review__textarea" placeholder="your review text"></textarea>
      <button @click.prevent="publishedReview" class="send__btn">Send</button>
    </div>
    <div v-else class="complete">
      <div class="complete__text">Thank you. Your review has been sent and will be published soon</div>
      <img src="../../public/logo.webp" alt="" class="complete__img">
    </div>
  </div>
</template>
<script>
import { useReview } from '@/hooks/useReview'

export default {
  props: {
    prodName: {
      type: String,
      required: true,
      default(){
        return ''
      }
    }
  },
  data() {
    return {
      name: '',
      rait: '',
      message: '',
      send: false
    }
  },
  methods: {
    changeRait(value) {
      this.rait = value
    },
    
    publishedReview() {
      if (this.name === '') {
        alert('Field "name" cannot be empty ')
      } else if (this.rait === '') {
        alert('Field "raiting" cannot be empty ')
      } else if (this.message === '') {
        alert('Field "text review" cannot be empty ')
      } else {
        if (this.$store.state.isAuth === false) {
          alert('Only registered users can send reviews')
        } else {
          const body = {}
          body.senderName = this.name
          body.reiting = this.rait
          body.reviewMessage = this.message
          body.productName = this.prodName
          this.reviewBody = body
          this.sendReview
        }
      }
    }
  },
  watch: {
    clearForm() {
      this.name = ''
      this.rait = ''
      this.message = ''
      this.send = true
    }
  },
  setup() {
    const {reviewBody, sendReview, clearForm} = useReview()
    return {
      reviewBody, sendReview, clearForm
    }
  }
}
</script>
<style scoped>

.review__title {
  font-size: 26px;
  font-weight: bold;
  color:#a3c52d;
  margin-bottom: 20px;
  padding-left: 20px;
}
.input__label {
  font-size: 18px;
  color: grey;
  padding-left: 10px;
}
.name__input {
  border: 1px solid grey;
  padding: 5px 20px;
  margin-left: 10px;
  margin-top: 10px;
  width: 300px;
  font-size: 18px;
}
.raiting__box {
  display: flex;
  margin-top: 10px;
}
.raiting__label {
  margin: 10px 0;
  font-size: 18px;
  color: grey;
  padding-left: 10px;
  display: flex;
}
.rating_block {
  width: 125px;
  height: 25px;
  margin: 10px 0;
  }
  .rating_block input[type="radio"] {
    display: none;
  }
  .label_rating {
    float: right;
    display: block;
    width: 25px;
    height: 25px;
    background: url('@/../public/rating.png') no-repeat 50% 0;
    cursor: pointer;
  }
  .rating_block .label_rating:hover, .rating_block .label_rating:hover ~ .label_rating, .rating_block input[type="radio"]:checked ~ .label_rating 
  {
    background-position: 50% -25px;
  }
  .review__textarea {
    border: 1px solid grey;
    padding: 5px 20px;
    margin-left: 10px;
    margin-top: 10px;
    font-size: 18px;
    width: 100%;
  }
  .send__btn {
    padding: 10px 20px;
    color:white;
    background-color:#a3c52d;
    font-size: 20px;
    font-weight: bold;
    border:none;
    margin-left: 10px;
    margin-top:20px;
  }
  .complete__text {
    font-size: 21px;
    text-align: center;
    font-weight: bold;
    color: #a3c52d;
  }
  .complete__img {
    width: 100%
  }
  @media screen and (max-width:350px) {
    .name__input {
      width: 100%;
      margin-left: 0;
    }
    .review__textarea {
      margin-left: 0;
      padding: 5px;
    }
  }
</style>