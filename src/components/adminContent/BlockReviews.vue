<template>
  <div class="wrapper">
    <div v-if="isVisible === 0" class="section">
      <div v-for="review in notConfirmReviews" :key="review.id" class="order">
        <div class="header">
          <div class="name__user">{{review.senderName}}</div>
          <div class="mail__user">{{review.senderMail}}</div>
          <div class="date__order">{{review.date}}</div>
        </div>
        <div class="order__content">
          <div class="product__list">
            <div class="about">
              <div class="item__name">Review about: {{review.productName}}</div>
              <div class="item__quan"> Review reiting: {{review.reiting}}</div>
            </div>
            <div class="review__text">{{review.reviewMessage}}</div>
          </div>
        </div>
        <div class="footer">
          <button @click.prevent="publishingReview(review.senderId, review.productName, review.date)" class="button">Опубликовать</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {useReview} from '@/hooks/useReview'
export default {
  props: {
    isVisible: {
    type: Number,
    required: true}
  },
  mounted() {
    this.fetchingNotConfirm()
  },
  setup() {
    const {fetchingNotConfirm, notConfirmReviews, publishingReview} = useReview()
    return {
      fetchingNotConfirm, notConfirmReviews, publishingReview
    }
  }
}
</script>
<style scoped>
  .wrapper {
    width: 100%;
  }
  .order {
    display: flex;
    flex-direction: column;
    padding: 15px;
    margin-top: 10px;
    box-shadow: 0 0 5px lightgrey;
  }
  .header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    background-color:#a4c52d83;
    padding: 10px;
  }
  .name__user {
    font-size: 18px;
    padding-left: 20px;
  }
  .date__order {
    font-size: 18px;
    padding-right: 20px;
  }
  .product__list {
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-top: 10px;
  }
  .about {
    display: flex;
    justify-content: space-around;
  }
  .item__name {
    font-size: 18px;
  }
  .item__quan {
    font-size: 18px;
  }
  .review__text {
    width: 90%;
    border: 1px solid rgba(211, 211, 211, 0.652);;
    font-size: 18px;
    margin: 10px auto;
    padding: 15px;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    padding: 15px 15px 0 15px;
    align-items: center;
  }

  .button {
    font-size: 16px;
    font-weight: bold;
    border: 1px solid #a3c52d;
    color:grey;
    box-shadow: 0 0 5px lightgrey;
    padding: 5px 10px;
    cursor: pointer;
  }
  .button:hover {
    color:white;
    background-color:#a3c52d;
  }
</style>