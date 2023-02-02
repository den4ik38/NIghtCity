<template>
  <div class="wrapper">
    <div class="meet__img">
      <div class="title">Grown with Love</div>
      <div class="subtitle">Pattaya best seller</div>
      <div class="description">High quality and large assortment</div>
    </div>
    <div class="main__container">
      <section class="benefits">
        <div class="benefits__title">Feel all the benefits of buying cannabis online</div>
        <div class="benefits__item_block">
          <div class="benefits__text">
            <div class="benefits__item_header">Large assortment</div>
            <div class="benefits__item_descrip">
              We are constantly expanding and updating our range. you can always find something new
            </div>
          </div>
          <div alt="" class="benefits__img assort"></div>
        </div>
        <div class="benefits__item_block benefits__item_block_reverse">
          <div class="benefits__text">
            <div class="benefits__item_header">Choose your mood</div>
            <div class="benefits__item_descrip">
              Choose a product according to your tasks or mood. All flowers have taste descriptions and effects of application on their page.
            </div>
          </div>
          <div alt="" class="benefits__img mood"></div>
        </div>
        <div class="benefits__item_block">
          <div class="benefits__text">
            <div class="benefits__item_header">Fast delivery</div>
            <div class="benefits__item_descrip">
              We track your requests promptly so that your order reaches you as soon as possible
            </div>
          </div>
          <div alt="" class="benefits__img fastdelivery"></div>
        </div>
        <div class="benefits__item_block benefits__item_block_reverse">
          <div class="benefits__text">
            <div class="benefits__item_header">Cash on delivery</div>
            <div class="benefits__item_descrip">
              Pay for purchases only after receiving the order
            </div>
          </div>
          <div alt="" class="benefits__img cash-on-delivery"></div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>

export default {
}
</script>
<style scoped>
.wrapper {
  box-sizing:border-box;
}
.meet__img {
  width: 100%;
  min-height: 600px;
  background-image: url('../../public/header.jpg');
  position:relative;
}
.title {
  font-size: 65px;
  font-weight: bold;
  color: white;
  position: absolute;
  top: 50%;
  left: 10%;
}
.subtitle {
  font-size: 45px;
  font-weight: bold;
  color: white;
  position: absolute;
  top: 65%;
  left: 10%;
}
.description {
  font-size: 32px;
  font-weight: bold;
  color: white;
  position: absolute;
  top: 77%;
  left: 10%;
  padding: 0;
  margin: 0;
}
.main__container {
  width: 100%;
  display: flex;
  background-color:green;
}

.benefits {
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 30px 0;
  color: white;
}
.benefits__title {
  width: 100%;
  text-align: center;
  font-size: 42px;
  font-weight: bold;
}
.benefits__item_block {
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-top: 30px;
  align-items: center;
  padding: 10px;
}
.benefits__item_block_reverse {
  flex-direction: row-reverse;
}
.benefits__text {
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 0 10px;
}
.benefits__item_header {
  font-size: 32px;
  font-weight: bold;
}
.benefits__item_descrip {
  padding-top: 15px;
  font-size: 22px;
  font-weight: 400;
}
.benefits__img {
  width: 400px;
  height: 200px;
}
.assort {
  background-image: url('@/../public/assort.jpeg');
  background-size: cover;
}
.mood {
  background-image:url('@/../public/fun.png');
  background-size: cover;
}
.fastdelivery {
  background-image:url('@/../public/delivery.jpg');
  background-size: cover;
}
.cash-on-delivery {
  background-image:url('@/../public/cash-on-delivery.jpg');
  background-size: cover;
}

@media screen and (max-width: 640px) {
  .meet__img {
    width: 100%;
    min-height: 400px;
    background-image: url('../../public/header.jpg');
    position:relative;
  }
  .benefits__text {
    max-width: 310px;
    margin: 0 auto;
  }
  .title {
    font-size: 40px;
  }
  .subtitle {
    font-size: 32px;
  }
  .description {
    font-size: 26px;
  }
  .benefits__title {
    font-size: 40px;
  }
  .benefits__item_block {
    flex-direction: column;
  }
  .benefits__item_header {
    text-align: center;
  }
  .benefits__item_descrip {
    text-align: center;
    margin-bottom: 10px;
  }
}
@media screen and (max-width: 420px) {
  .benefits__img {
    width: 340px;
  }
  .benefits__item_header {
    font-size: 24px;
  }
  .title {
    top: 75%;
    left: calc(50% - 160px);
  }
  .subtitle {
    display: none;
  }
  .description {
    display: none;
  }
  .benefits__title {
    font-size: 34px;
    padding: 0 15px;
  }
}
@media screen and (max-width: 360px) {
  .benefits__img {
    width: 260px;
  }
  .benefits__item_header {
    font-size: 24px;
  }
  .title {
    font-size: 28px;
    top: 75%;
    left: calc(50% - 111.5px);
  }
  .subtitle {
    display: none;
  }
  .description {
    display: none;
  }
  .benefits__title {
    font-size: 28px;
    padding: 0 15px;
  }
  .benefits__item_block {
    width: 260px;
    margin: 30px auto 0;
    padding: 0;
  }
  .benefits__text {
    width: 260px;
  }
  .benefits__item_descrip {
    width: 240px;
    font-size: 20px;
  }
}
</style>