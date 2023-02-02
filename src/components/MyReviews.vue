<template>
  <div class="reviews__slider">
    <div class="review__item">
      <div class="review__author">{{review.senderName}}</div>
      <div class="rate-and-date">
        <div class="review__rating"> Rating: <label v-for="star in review.reiting" class="label_rating"></label></div>
        <div class="review__date">{{review.date}}</div>
      </div>
      <div class="review__massage">{{review.reviewMessage}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    review: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
  .rate-and-date {
    display: flex;
    justify-content: space-between;
  }
  .review__rating {
    display: flex;
    align-items: center;
    font-size: 18px;
    color: grey;
  }
  .label_rating {
    display: block;
    width: 25px;
    height: 25px;
    background: url('@/../public/rating.png') no-repeat 50% -25px;
    cursor: pointer;
    transform: translateY(-2px);
  }
  
  .reviews__slider {
    display: flex;
    justify-content: space-evenly;
  }
  .review__item {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 10px 0;
    padding-bottom: 10px;
  }

  .review__author {
    font-weight: bold;
    font-size: 21px;
    margin-top: 10px;
    color:#a3c52d
  }

  
  .review__date {
    font-weight: 500;
    color: lightgrey;
    font-size: 18px;
  }
  .review__massage {
    color: grey;
    font-weight: 400;
    margin-top: 10px;
    padding-left: 15px;
  }
</style>