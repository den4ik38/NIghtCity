<template>
  <div v-if="item.type === 'bud'" class="route__link" :class="{route__link_full:full}">
  <div class="slider__item" :class="{slider__item_full:full}">
    <router-link :to="{ name: 'page',params: {name: item.name}}" :style="bgiMake()" class="slider__img">
      <div v-if="!item.inStock" class="slider__available">Not Available</div>
    </router-link>
    <div class="descrip__container">
      <div class="slider__title" :class="{short__style:!full}">
          <router-link :to="{ name: 'page',params: {name: item.name}}" class="title">{{item.name}}</router-link> 
          <div class="slider__tgk">THC: {{item.tgk}}</div>
          <div class="slider__cost">{{item.price}}฿</div>
      </div>
      <div v-if="full" class="slider__description">
        <h2 class="taste__title">Taste: {{item.tasteTitle}}</h2>
        <p class="taste__text">{{item.tasteDescription}}</p>
      </div>
      <div class="weight_and_cart" :class="{price__and__thc:full}">
        <div class="cart_section" :class="{short__style:!full}">
            <select v-model="itemsValue" name="weight" id="weight" class="description__weightinut">
              <option value="1" selected class="weight_option">1 gram</option>
              <option value="2" class="weight_option">2 gram</option>
              <option value="3" class="weight_option">3 gram</option>
              <option value="4" class="weight_option">4 gram</option>
              <option value="5" class="weight_option">5 gram</option>
              <option value="6" class="weight_option">6 gram</option>
              <option value="7" class="weight_option">7 gram</option>
              <option value="8" class="weight_option">8 gram</option>
              <option value="9" class="weight_option">9 gram</option>
              <option value="10" class="weight_option">10 gram</option>
              <option value="11" class="weight_option">11 gram</option>
              <option value="12" class="weight_option">12 gram</option>
              <option value="13" class="weight_option">13 gram</option>
              <option value="14" class="weight_option">14 gram</option>
              <option value="15" class="weight_option">15 gram</option>
              <option value="16" class="weight_option">16 gram</option>
              <option value="17" class="weight_option">17 gram</option>
              <option value="18" class="weight_option">18 gram</option>
              <option value="19" class="weight_option">19 gram</option>
              <option value="20" class="weight_option">20 gram</option>
            </select>
          <button v-if="item.inStock" class="description__btn_addtocart" @click.prevent="addToCart()">ADD TO CART</button>
          <div class="available">Available: {{item.inStock}} units</div>
        </div>
        <router-link :to="{ name: 'page',params: {name: item.name}}" class="more_info">More info >></router-link>
      </div>
    </div>
  </div>
</div>
<div v-else class="route__link" :class="{route__link_full:full}">
  <div class="slider__item" :class="{slider__item_full:full}">
    <router-link :to="{ name: 'product', params: {type:item.type, id: item._id}}" :style="bgiMake()" class="slider__img">
      <div v-if="!item.inStock" class="slider__available">Not Available</div>
    </router-link>
    <div class="descrip__container">
      <div class="slider__title" :class="{short__style:!full}"> 
        <span class="title">{{item.name}}</span>
        <div v-if="!full" class="slider__details slider__details_short">{{item.details[0]}}</div>
        <div :class="{price__and__thc:full}">
          <div class="slider__cost">{{item.price}}฿</div>
        </div>
      </div>
      <div v-if="full" class="slider__description">
        <p class="taste__text">{{item.description[2]}}</p>
        <div class="slider__details">{{item.details[0]}}</div>
      </div>
      <div class="weight_and_cart" :class="{price__and__thc:full}">
        <div class="cart_section" :class="{short__style:!full}">
            <select v-model="itemsValue" name="weight" id="weight" class="description__weightinut">
              <option value="1" selected class="weight_option">1 gram</option>
              <option value="2" class="weight_option">2 gram</option>
              <option value="3" class="weight_option">3 gram</option>
              <option value="4" class="weight_option">4 gram</option>
              <option value="5" class="weight_option">5 gram</option>
              <option value="6" class="weight_option">6 gram</option>
              <option value="7" class="weight_option">7 gram</option>
              <option value="8" class="weight_option">8 gram</option>
              <option value="9" class="weight_option">9 gram</option>
              <option value="10" class="weight_option">10 gram</option>
              <option value="11" class="weight_option">11 gram</option>
              <option value="12" class="weight_option">12 gram</option>
              <option value="13" class="weight_option">13 gram</option>
              <option value="14" class="weight_option">14 gram</option>
              <option value="15" class="weight_option">15 gram</option>
              <option value="16" class="weight_option">16 gram</option>
              <option value="17" class="weight_option">17 gram</option>
              <option value="18" class="weight_option">18 gram</option>
              <option value="19" class="weight_option">19 gram</option>
              <option value="20" class="weight_option">20 gram</option>
            </select>
          <button v-if="item.inStock" class="description__btn_addtocart" @click.prevent="addToCart()">ADD TO CART</button>
          <div class="available">Available: {{item.inStock}} units</div>
        </div>
        <router-link :to="{ name: 'product', params: {type:item.type, id: item._id}}" class="more_info">More info >></router-link>
      </div>
    </div>
  </div>
</div>
<my-alert v-model:showAlert="showAlert">
  {{ alertMessage }}
</my-alert>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    full: {
      type: Boolean,
      required: false
    }
  },
  data(){
    return {
      itemsValue: 1,
      showAlert: false,
      alertMessage: ''
    }
  },
  methods: {
    bgiMake() {
      return {backgroundImage: `url(${this.item.catalogPhoto})`}
    },
    addToCart() {
      const cartItem = {}
      cartItem.name = this.item.name
      cartItem.price = this.item.price
      cartItem.quantity = this.itemsValue
      cartItem.photo = this.item.catalogPhoto
      cartItem.total = this.item.price * this.itemsValue

      if (!localStorage.getItem('cart')){
        localStorage.setItem('cart', JSON.stringify([]))
      }
      const cartList = JSON.parse(localStorage.getItem('cart'))
      let check = false
      cartList.forEach(item => {
        if (item.name === cartItem.name) {
          item.quantity = +item.quantity + (+cartItem.quantity)
          item.total = item.total + (cartItem.quantity*cartItem.price)
          check = true
        }
      })
      if (!check) {
        cartList.push(cartItem) 
      }
      localStorage.setItem('cart', JSON.stringify(cartList))
      this.$store.commit('addInCart', cartList)
      this.alertMessage = 'This product was added to the cart'
      this.showAlert = true
    }
  }
}
</script>
<style scoped>
  .route__link {
    text-decoration: none;
    color:black;
    width: auto;
  }
  .route__link_full {
    width: 100%;
  }
  .slider__item {
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-sizing:border-box;
    border: 1px solid white;
    align-items: center;
  }
  .short__style {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .slider__item_full {
    flex-direction: row;
  }
  .slider__item:hover {
    border: 1px solid lightgrey;
  }
  .slider__img {
    min-width: 165px;
    height: 265px;
    background-size:contain;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
  }
  .slider__available {
    position: absolute;
    top: 20px;
    left: calc(50% - 67.5px);
    background-color: blue;
    color: white;
    font-size: 18px;
    font-weight: 600;
    padding: 5px 10px;
  }
  .description__btn_addtocart {
    background: none;
    padding: 5px 10px;
    font-size: 12px;
    border: 1px solid #a3c52d;
    color:#a3c52d;
    box-shadow: 0 0 4px grey;
    font-weight: bold;
    cursor: pointer;
  }
  .description__btn_addtocart:hover {
    box-shadow:none;
  }
  .descrip__container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
  }
  .slider__title {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .title {
    text-decoration: none;
    color: goldenrod;
    font-size: 21px;
    text-align: center;
    font-weight: bold;
  }
  .taste__title {
    padding-left: 20px;
    margin: 10px auto;
    font-size: 19px;
  }
  .taste__text {
    margin-bottom: 10px;
    padding-left: 10px;
    font-size: 17px;
    color: grey;
    max-height: 200px;
    overflow: scroll;
  }
  .cart_section {
    display: flex;
    gap: 20px;
  }
  .weight_and_cart {
    display: flex;
    flex-direction: column;
  }
  .price__and__thc {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .slider__tgk {
    text-align: center;
    font-weight: 500;
    font-size: 18px;
    color: black;
  }
  .slider__details {
    text-align: center;
    font-weight: 500;
    font-size: 18px;
    color: black;
    margin-bottom: 10px;
  }
  .slider__details_short {
    margin-bottom: 0;
  }
  .slider__cost {
    text-align: center;
    font-weight: bold;
    color:#a3c52d;
  }
  .description__weightinut {
    border: none;
    border-bottom: 2px solid #a3c52d;
    font-weight: bold;
    outline:  none;
  }
  .description__weightinut:focus {
    border: 2px solid #a3c52d;
  }
  .more_info {
    cursor: pointer;
    color:#a3c52d;
    font-weight: bold;
    margin: 0 auto;
  }
  @media screen and (max-width:600px) {
    .taste__text {
      font-size: 15px;
    }
  }
  @media screen and (max-width:500px) {
    .slider__item{
      flex-direction: column;
    }
  }
  @media screen and (max-width:360px) {
    .slider__item {
      padding: 0;
    }
  }
  
</style>
