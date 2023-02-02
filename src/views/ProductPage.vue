<template>
  <div class="wrapper">
    <div class="line"></div>
    <div v-if="product" class="container">
      <my-preview-photo :photos="product.productPhoto" />
      <div class="description">
        <div class="decription__title">{{product.name}}</div>
        <div v-if="middleReiting" class="description__raiting">Owners raiting: {{middleReiting}}<label class="label_rating"></label></div>
        <div class="description__cost">{{product.price}} ฿</div>
        <div class="description__textbox">
          <p v-for=" descrip in product.description" class="decription__text">
            {{descrip}}
          </p>
          <p v-for=" detail in product.details" class="decription__text">
            {{detail}}
          </p>
        </div>
        <div class="description__weightcontainer">
          <div>
            <i class="weigth__icon"></i> 
            <select v-model="itemsValue" name="weight" id="weight" class="description__weightinut">
              <option v-for="(item, index) in product.inStock" :key="item" :selected="index===1" :value="index + 1" class="weight_option">{{ index + 1 }} gram</option>
            </select>
          </div>
          <div class="availbale">Available: {{ product.inStock }} units</div>
        </div>
        <div class="description__total">
          <span class="description__totalspan">Product total:</span>
          <span class="description__totalcost"> <span class="total">{{itemsValue*product.price}}</span> ฿</span>
        </div>
        <button v-if="product.inStock" class="description__btn_addtocart" @click.prevent="addToCart()">ADD TO CART</button>
        <div v-else class="span__available">Not Available</div>
      </div>
    </div>
    <div class="review__section">
      <div class="review__title">Review Section</div>
      <div class="review__half">
        <div v-if="reviews.length > 0">
        <my-reviews v-for="review in reviews" :review="review" class="my-review-item"/>
        </div>
        <div v-else class="no-reviews">
          There are no reviews for this product yet.
        </div>
      </div>
      <hr class="separator">
      <div v-if="product" class="review__half">
        <my-review-item :prodName="product.name"/>
      </div>
    </div>
    <my-alert v-model:showAlert="showAlert">
      {{alertMessage}}
    </my-alert>
  </div>
</template>
<script>
import MyPreviewPhoto from '@/components/MyPreviewPhoto.vue'
import MyReviews from '@/components/MyReviews.vue'
import MyReviewItem from '@/components/MyReviewItem.vue'
import {useProduct} from '@/hooks/useProduct'
import {useReview} from '@/hooks/useReview'
import { useRoute } from 'vue-router'

export default {
  components: {MyPreviewPhoto, MyReviews, MyReviewItem},
  data(){
    return {
      itemsValue: 1,
      showAlert: false,
      alertMessage: ''
    }
  },
  methods: {
    addToCart() {
      const cartItem = {}
      cartItem.name = this.product.name
      cartItem.price = this.product.price
      cartItem.quantity = this.itemsValue
      cartItem.photo = this.product.catalogPhoto
      cartItem.total = this.product.price * this.itemsValue

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
  },
  watch:{
    bud(){
      if (this.bud) {
        this.makeImages(this.bud.tasteTegs)
      }
    }
  },
  mounted() {
    this.getProduct()
    this.fetchingReviews()
  },
  setup(props) {
    const route = useRoute()
    const {getProduct, product} = useProduct(route.params, route.meta)
    const {reviews, middleReiting, fetchingReviews} = useReview((route.params))
    return {
      reviews, middleReiting, fetchingReviews, getProduct, product
    }
  }
}
</script>
<style scoped>
  .wrapper {
    width: 100%;
  }
  .line {
    width: 100%;
    height: 60px;
    background-color:rgb(72, 72, 72);
  }
  .container {
    width: 100%;
    max-width: 1140px;
    margin: 0 auto;
    display: flex;
  }
  .description {
    width: 100%;
    padding: 10px;
  }
  .decription__title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .description__raiting {
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

  }
  .description__cost {
    font-size: 24px;
    font-weight: bold;
    color: #a3c52d;
    margin-bottom: 10px;
  }
  .decription__textsubtitle {
    font-size: 20px;
    font-weight:600;
    color: grey;
    margin-bottom: 10px;
  }
  .decription__text {
    font-size: 17px;
    font-weight: 400;
    color: grey;
    margin-bottom: 10px;
  }
  .description__weightcontainer {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
  }
  .dedscription__tastelist {
    list-style: none;
    width: 100%;
    display: flex;
  }
  .description__taste {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    background-color: grey;
    display: flex;
    flex-direction: column;
    align-items: top;
    padding-top: 10px;
    margin: 0  10px;
  }
  .description__tasteimg {
    width: 80%;
    height: 80%;
    margin: 0 auto;
  }
  .decription__tasteimgspan {
    text-align: center;
    color:white;
  }

  .description__helps {
    width: 100%;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .description__helpstitle {
    font-size: 24px;
    font-weight: 600;
  }
  .description__helpscontainer {
    display: flex;
    flex-wrap: wrap;
  }
  .description__help {
    max-width: 150px;
    margin: 10px;
  }
  .description__helptitle {
    font-size: 19px;
    margin-bottom: 10px;
    font-weight: 500;
  }
  .description__helptext {
    font-size: 16px;
    line-height: 1.2;
    color:grey;
  }

  .description__itemlist {
    padding-left: 0;
    list-style: none;
    margin-bottom: 10px;
    margin-top: 20px;
  }
  .description__itemlistitem {
    display: block;
    width: 100%;
    margin-bottom: 6px;
  }
  .description__itemtitle {
    overflow: hidden;
    margin-top: 10px;
  }
  .description__iconcontainer {
    display: block;
    text-align: center;
    float: left;
    width: 35px;
    margin-right: 10px;
  }
  .description__icon {
    display: block;
    position: relative;
    height: 25px;
    width: 35px;
    transform: translateY(-6px);
  }
  .description__iconvalue {
    font-weight: 500;
  }
  .description__icon_dnk {
    background: url('../../public/icons.png') no-repeat -36px -138px;
  }
  .description__icon_effect{
    background: url('../../public/icons.png') no-repeat -4px -105px;
  }
  .description__icon_hybrid {
    background: url('../../public/icons.png') no-repeat -68px -208px;
  }
  .description__icon_tgk {
    background: url('../../public/icons.png') no-repeat -5px -235px;
  }
  .description__icon_cbd {
    background: url('../../public/icons.png') no-repeat -70px -236px;
  }
  .weigth__icon {
    display: inline-block;
    height: 35px;
    width: 35px;
    background: url('../../public/icons.png') no-repeat -36px -72px;
    transform: translateY(16px) translateX(10px);
  }
  .description__weighttitle {
    font-size: 24px;
    color: grey;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .description__weighttext {
    font-size: 19px;
    color: grey;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .description__weightinut {
    padding: 3px 0 3px 3px;
    margin-left: 20px;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 500;
  }
  .description__total {
    display: flex;
    margin-bottom: 20px;
  }
  .description__totalspan {
    font-size: 24px;
    font-weight: bold;
  }
  .description__totalcost {
    font-size: 24px;
    font-weight: bold;
    color:#a3c52d;
    margin-left: 20px;
  }
  .description__btn_addtocart {
    padding: 10px 20px;
    color:white;
    background-color:#a3c52d;
    font-size: 20px;
    font-weight: bold;
    border:none;
  }
  .span__available {
    font-size: 24px;
    font-weight: bold;
    color: blue;
  }
  .review__section {
    max-width: 1140px;
    margin: 20px auto;
    border-top: 1px solid lightgrey;
    padding: 40px 20px 20px;
    display: flex;
    position: relative;
  }

  .review__title {
    position: absolute;
    left: calc(50% - 123px);
    top: 0;
    font-size: 32px;
    font-weight: bold;
  }
  .review__half {
    width: 49%;
    padding: 15px;
  }
  .separator {
    width: 1px;
    border: 1px solid lightgrey;
    background-color: lightgrey;
  }
  .no-reviews {
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
    color:#a3c52d;
  }
  .my-review-item {
    border-bottom: 1px solid lightgrey;
  }
  .my-review-item:last-child {
    border-bottom: none;
  }


  @media screen and (max-width:800px) {
    .description {
      padding: 10px 0;
    }
  }
  @media screen and (max-width:725px) {
    .review__section {
      flex-direction: column;
    }
    .review__half {
      width: 100%;
    }
    .no-reviews {
      border-bottom: 1px solid lightgrey;
      text-align: center;
    }
    .container {
      flex-direction: column-reverse;
    }

    .description {
      padding: 10px 20px;
    }
    .decription__text {
      font-size: 18px;
    }

  }
  @media screen and (max-width:360px) {

    .review__section {
      padding: 40px 5px 20px;
    }
    .review__half {
      padding: 15px 5px;
    }
    
  }
</style>