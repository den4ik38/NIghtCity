<template>
  <div class="wrapper">
    <div class="line"></div>
    <div class="container">
      <my-preview-photo :photos="bud.budsPhoto" />
      <div class="description">
        <div class="decription__title">{{bud.name}}</div>
        <div v-if="middleReiting" class="description__raiting">Owners raiting: {{middleReiting}}<label class="label_rating"></label></div>
        <div class="description__cost">{{bud.price}} ฿</div>
        <div class="description__textbox">
          <div class="decription__textsubtitle">{{bud.tasteTitle}}</div> 
          <p class="decription__text">
            {{bud.tasteDescription}}
          </p>
          <div class="description__tasteblock">
            <ul class="dedscription__tastelist">
              <li v-for="image in images" class="description__taste"><img :src="itemImage(image.img)" alt="" class="description__tasteimg"><span class="decription__tasteimgspan">{{image.title}}</span></li>
            </ul>
          </div>
          <div class="description__helps">
            <div class="description__helpstitle">{{bud.name}} helps:</div>
            <div class="description__helpscontainer">
              <div v-for="help in bud.helps" class="description__help">
                <div class="description__helptitle">{{help.title}}</div>
                <p class="description__helptext">{{help.description}}</p>
              </div>
            </div>
          </div>
          <ul class="description__itemlist">
            <li class="description__itemlistitem">
              <span title="Гены полученные от сортов" class="description__itemtitle">
                <span class="description__item">
                  <span class="description__iconcontainer">
                    <i class="description__icon description__icon_dnk"></i>
                  </span>
                  <span class="description__iconvalue">{{bud.dnk}}</span>
                </span>
              </span>
            </li>
            <li class="description__itemlistitem">
              <span title="Эффект от применения" class="description__itemtitle">
                <span class="description__item">
                  <span class="description__iconcontainer">
                    <i class="description__icon description__icon_effect"></i>
                  </span>
                  <span class="description__iconvalue">{{bud.effect}}</span>
                </span>
              </span>
            </li>
            <li class="description__itemlistitem">
              <span title="Гены происхождения" class="description__itemtitle">
                <span class="description__item">
                  <span class="description__iconcontainer">
                    <i class="description__icon description__icon_hybrid"></i>
                  </span>
                  <span class="description__iconvalue">{{bud.hybrid}}</span>
                </span>
              </span>
            </li>
            <li class="description__itemlistitem">
              <span title="Содержание Тетрагидроканнабинола" class="description__itemtitle">
                <span class="description__item">
                  <span class="description__iconcontainer">
                    <i class="description__icon description__icon_tgk"></i>
                  </span>
                  <span class="description__iconvalue">{{bud.tgk}}</span>
                </span>
              </span>
            </li>
            <li class="description__itemlistitem">
              <span title="Содержание Каннабидиола" class="description__itemtitle">
                <span class="description__item">
                  <span class="description__iconcontainer description__icon_cbd">
                    <i class="description__icon"></i>
                  </span>
                  <span class="description__iconvalue">{{bud.cbd}}</span>
                </span>
              </span>
            </li>
          </ul> 
        </div>
        <div class="description__weightcontainer">
          <div class="description__weighttitle">Insert your quantity by weight</div>
          <div class="description__weighttext">All our flowers are sold in units of grams. For orders larger than 20 grams, contact us for a discount.</div>
          <div class="weight-sec">
            <div>
              <i class="weigth__icon"></i> 
              <select v-model="itemsValue" name="weight" id="weight" class="description__weightinut">
                <option v-for="(item, index) in bud.inStock" :key="item" :selected="index===0" :value="index + 1" class="weight_option">{{ index + 1 }} gram</option>
              </select>
            </div>
            <div class="availbale">Available: {{ bud.inStock }} units</div>
          </div>
        </div>
        <div class="description__total">
          <span class="description__totalspan">Product total:</span>
          <span class="description__totalcost"> <span class="total">{{itemsValue*bud.price}}</span> ฿</span>
        </div>
        <button v-if="bud.inStock" class="description__btn_addtocart" @click.prevent="addToCart()">ADD TO CART</button>
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
      <div class="review__half">
        <my-review-item :prodName="bud.name"/>
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
import {useBuds} from '@/hooks/useBuds'
import {useTegs} from '@/hooks/useTegs'
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
    itemImage(str) {
      return '../../' + str
    },
    addToCart() {
      const cartItem = {}
      cartItem.name = this.bud.name
      cartItem.price = this.bud.price
      cartItem.quantity = this.itemsValue
      cartItem.photo = this.bud.catalogPhoto
      cartItem.total = this.bud.price * this.itemsValue

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
    this.fetchingBud()
    this.fetchingReviews()
  },
  setup(props) {
    const route = useRoute()
    const {bud, fetchingBud} = useBuds(route.params)
    const {reviews, middleReiting, fetchingReviews} = useReview((route.params))
    const {images, makeImages} = useTegs()
    return {
      bud, reviews, middleReiting, fetchingReviews, images, makeImages, fetchingBud
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
  .weight-sec {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
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

  @media screen and (max-width:990px) {
    .description__taste {
      width: 120px;
      height: 120px;
    }
  }
  @media screen and (max-width:800px) {
    .description__taste {
      width: 100px;
      height: 110px;
    }
    .description__tasteimg {
      width: 70%;
      height: 70%;
    }
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
    .description__taste {
      width: 150px;
      height: 150px;
      margin: 0 5px;
    }
    .description {
      padding: 20px 5px;
    }
    .decription__text {
      font-size: 18px;
    }
    .description__helptext {
      font-size: 18px;
    }
    .description__help {
      width: 140px;
    }
    .description__helpscontainer {
      justify-content: space-evenly;
    }
  }
  @media screen and (max-width:360px) {
    .description__help {
      max-width: 100%;
      width: 100%;
    }
    .review__section {
      padding: 40px 5px 20px;
    }
    .review__half {
      padding: 15px 5px;
    }
    
  }
</style>