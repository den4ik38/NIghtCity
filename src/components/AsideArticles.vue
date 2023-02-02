<template>
  <div class="aside__articles">
    <div class="articles__title">Статьи</div>
    <div class="article__container">
      <div class="article__title">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
      <div class="article__date">20 November 2022</div>
    </div>
    <div class="article__container">
      <div class="article__title">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
      <div class="article__date">20 November 2022</div>
    </div>
    <div class="articles__btn">Все статьи</div>
    
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
  .aside__articles {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
  }
  .articles__title {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 900;
  }
  .article__container {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
  }
  .article__title {
    font-size: 15px;
    color: goldenrod;
    margin-bottom: 10px;
  }
  .article__date {
    font-size: 13px;
    color: rgba(128, 128, 128, 0.559);
  }
  .articles__btn {
    font-size: 20px;
    font-weight: bold;
    color: #a3c52d;
  }
  .articles__btn:hover {
    color: #9c744a;
  }
  
</style>