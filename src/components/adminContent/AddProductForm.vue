<template>
  <div class="wrapper">
    <form ref="productForm" class="add_product_form">
      <input v-model="name" type="text" placeholder="Name of product" class="name_product">
      <textarea v-model="descripOne.content" name="" id="" cols="30" rows="3" placeholder="3 blocks of description" class="description"></textarea>
      <style-control-block @setStyle="setTextBlockStyle($event, 'descripOne')"/>
      <textarea v-model="descripTwo.content" name="" id="" cols="30" rows="3" placeholder="3 blocks of description" class="description"></textarea>
      <style-control-block @setStyle="setTextBlockStyle($event, 'descripTwo')"/>
      <textarea v-model="descripThree.content" name="" id="" cols="30" rows="3" placeholder="This text will be on preview on cotalog list" class="description"></textarea>
      <style-control-block @setStyle="setTextBlockStyle($event, 'descripThree')"/>
      <textarea v-model="detailsOne.content" name="" id="" cols="30" rows="3" placeholder="3 blocks of details" class="description"></textarea>
      <style-control-block @setStyle="setTextBlockStyle($event, 'detailsOne')"/>
      <textarea v-model="detailsTwo.content" name="" id="" cols="30" rows="3" placeholder="3 blocks of details" class="description"></textarea>
      <style-control-block @setStyle="setTextBlockStyle($event, 'detailsTwo')"/>
      <textarea v-model="detailsThree.content" name="" id="" cols="30" rows="3" placeholder="block for serving information" class="description"></textarea>
      <style-control-block @setStyle="setTextBlockStyle($event, 'detailsThree')"/>
      <label for="">Price</label>
      <input v-model="price" type="number" placeholder="Price" class="price">
      <label for="">Quantity product add?</label>
      <input v-model="quantityProductsAdd" type="number" placeholder="How much quantity product add?" class="price">
      <div class="catalog_photo__section">
        <span>Выберите фото для каталога</span>
        <input ref="catalogPhotoInput" type="file" @input="changeCatalogPhoto($event)" class="input_form">
        <div ref="catalogPhoto" class="catalog_photo__preview"></div>
      </div>
      <div class="photo__section">
        <span>Выберите фото для страницы товара</span>
        <input ref="photoPrevInput" @input="makePhoto($event)" type="file" class="input_form">
        <div ref="photoPrev" class="photo__preview">
        </div>
      </div>
      <button @click.prevent="sendProduct" class="result__btn">Создать новый товар</button>
    </form>
    <div class="preview_section">
      <div class="container">
      <my-preview-photo v-if="forPreviewPhotos.length>0" :photos="forPreviewPhotos" :selectImg="selectImg"/>
      <div class="description">
        <div class="decription__title">{{name}}</div>

        <div class="description__cost">{{price}} ฿</div>
        <div class="description__textbox">
          <p v-if="descripOne" class="decription__text" :style="descripOne.style">
            {{descripOne.content}}
          </p>
          <p v-if="descripTwo" class="decription__text" :style="descripTwo.style">
            {{descripTwo.content}}
          </p>
          <p v-if="descripThree" class="decription__text" :style="descripThree.style">
            {{descripThree.content}}
          </p>
          <p v-if="detailsOne" class="decription__text" :style="detailsOne.style">
            {{detailsOne.content}}
          </p>
          <p v-if="detailsTwo" class="decription__text" :style="detailsTwo.style">
            {{detailsTwo.content}}
          </p>
          <p v-if="detailsThree" class="decription__text" :style="detailsThree.style">
            {{detailsThree.content}}
          </p>
        </div>
        <div class="description__weightcontainer">
          <div>
            <i class="weigth__icon"></i> 
            <select disabled name="weight" id="weight" class="description__weightinut">
              <option value="1" selected class="weight_option">1 gram</option>
            </select>
          </div>
          <div class="availbale">Available: {{ quantityProductsAdd }} units</div>
        </div>
      </div>
    </div>
    </div>
    <div v-if="forCatalogPrevPhotos.length > 0" class="catalog-preview">
      <div class="cahnge-view" style="maxWidth:800px">
        <span @click="changeCatalog(false)" class="view-catalog">Краткий режим каталога</span>
        <span @click="changeCatalog(true)" class="view-catalog">Расширенный режим каталога</span>
      </div>
      <div class="route__link" :class="{route__link_full:full}">
        <div class="slider__item" :class="{slider__item_full:full}">
          <a v-if="forCatalogPrevPhotos.length > 0" :style="bcgImage(forCatalogPrevPhotos)" class="slider__img">
          </a>
          <div class="descrip__container">
            <div class="slider__title" :class="{short__style:!full}"> 
              <span class="title">{{name}}</span>
              <div v-if="!full" class="slider__details slider__details_short">{{detailsOne.content}}</div>
              <div :class="{price__and__thc:full}">
                <div class="slider__cost">{{price}}฿</div>
              </div>
            </div>
            <div v-if="full" class="slider__description">
              <p class="taste__text">{{descripThree.content}}</p>
              <div class="slider__details">{{detailsOne.content}}</div>
            </div>
            <div class="weight_and_cart" :class="{price__and__thc:full}">
              <div class="cart_section" :class="{short__style:!full}">
                  <select disabled :class="{description__weightinut_full:!full}" name="weight" id="weight" class="description__weightinut">
                    <option value="1" selected class="weight_option">1 gram</option>
                  </select>
                <button class="description__btn_addtocart">ADD TO CART</button>
                <div class="available">Available: {{quantityProductsAdd}} units</div>
              </div>
              <a class="more_info">More info >></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <my-alert v-model:showAlert="showAlert">
      {{alertMessage}}
    </my-alert>
  </div>
</template>
<script>
import {useProduct} from '@/hooks/useProduct'
import MyPreviewPhoto from '@/components/MyPreviewPhoto.vue'
import StyleControlBlock from '@/components/adminContent/StyleControlBlock.vue'

export default {
  components: {MyPreviewPhoto, StyleControlBlock},
  props:{
    type: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      name: '',
      descripOne:{content:'', style: {}},
      descripTwo:{content:'', style: {}},
      descripThree:{content:'', style: {}},
      detailsOne:{content:'', style: {}},
      detailsTwo:{content:'', style: {}},
      detailsThree:{content:'', style: {}},
      price:0,
      fileCatalog: null,
      photos: [],
      showAlert: false,
      alertMessage: '',
      forPreviewPhotos: [],
      forCatalogPrevPhotos: '',
      full: false,
      selectImg: false,
      quantityProductsAdd: 0
    }
  },
  methods: {
    setTextBlockStyle(event, str){
      switch (str){
        case 'descripOne':
          this.descripOne.style = event
        break;
        case 'descripTwo':
          this.descripTwo.style = event
        break;
        case 'descripThree':
          this.descripThree.style = event
        break;
        case 'detailsOne':
          this.detailsOne.style = event
        break;
        case 'detailsTwo':
          this.detailsTwo.style = event
        break;
        case 'detailsThree':
          this.detailsThree.style = event
        break;
      }
    },
    clearForm(){
      this.name= ''
      this.descripOne=''
      this.descripTwo=''
      this.descripThree=''
      this.detailsOne=''
      this.detailsTwo=''
      this.detailsThree=''
      this.price=0
      this.fileCatalog= null
      this.photos= []
      this.$refs.catalogPhotoInput.value = null
      this.$refs.photoPrevInput.value = null
      this.$refs.catalogPhoto.innerHTML = ''
      this.$refs.photoPrev.innerHTML = ''
    },
    bcgImage(){
      return {backgroundImage: `url(${this.forCatalogPrevPhotos})`}
    },
    changeCatalog(bool){
      this.full = bool
    },
    changeCatalogPhoto(event) {
      const [file] = event.target.files
      this.forCatalogPrevPhotos = URL.createObjectURL(file)
      if (file) {
          const imagePhoto = document.createElement('img')
          imagePhoto.style.maxWidth = '150px'
          imagePhoto.src=URL.createObjectURL(file)
          this.$refs.catalogPhoto.innerHTML = ''
          this.$refs.catalogPhoto.appendChild(imagePhoto)
          this.fileCatalog = file
        }
    },
    makePhoto(event) {
      const [file] = event.target.files
      this.forPreviewPhotos.push(URL.createObjectURL(file))
        if (file) {
          const imagePhoto = document.createElement('img')
          imagePhoto.style.maxWidth = '150px'
          imagePhoto.src=URL.createObjectURL(file)
          this.$refs.photoPrev.appendChild(imagePhoto)
          this.photos.push(file)
        }
    },
    complectDescAndDetails() {
      const description = []
      if (this.descripOne.content.length > 0) {
        description.push(this.descripOne)
      }
      if (this.descripTwo.length > 0) {
        description.push(this.descripTwo)
      }
      if (this.descripThree.content.length > 0) {
        description.push(this.descripThree)
      }
      const details = []
      if (this.detailsOne.content.length > 0) {
        details.push(this.detailsOne)
      }
      if (this.detailsTwo.content.length > 0) {
        details.push(this.detailsTwo)
      }
      if (this.detailsThree.content.length > 0) {
        details.push(this.detailsThree)
      }
      return {description, details}
    },
    async sendProduct() {
      const {description, details} = this.complectDescAndDetails()
      if (description.length>0 && details.length>0 && this.price>0 && this.fileCatalog && this.photos.length>0 && this.name.length>0) {
        const obj ={}
        obj.name = this.name
        obj.description = description
        obj.details = details
        obj.price = this.price
        obj.type = this.type
        obj.inStock = this.quantityProductsAdd
        const answer = await this.saveProduct(this.fileCatalog, this.photos, obj)
        this.alertMessage = answer.message
        this.showAlert = true
        this.clearForm()
      }
    }
  },
  setup(){
    const {saveProduct} = useProduct()
    return {
      saveProduct
    }
  }
}
</script>
<style scopedd>
  .wrapper {
    width: 100%;
  }
  .add_product_form {
    display: flex;
    flex-direction: column;
  }
  .name_product {
    padding: 5px 10px;
    font-size: 18px;
    margin: 10px;
  }
  
  .description {
    padding: 5px 10px;
    font-size: 18px;
    margin: 10px;
  }
  .price {
    padding: 5px 10px;
    font-size: 18px;
    margin: 10px;
    max-width: 100px;
  }
  .catalog_photo__preview {
    display: flex;
  }
  .catalog_photo__section {
    display: flex;
    flex-direction: column;
  }
  .photo__preview {
    display: flex;
  }
  .result__btn {
    padding: 5px 10px;
    font-size: 18px;
    margin: 20px;
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
    background: url('@/../public/icons.png') no-repeat -36px -138px;
  }
  .description__icon_effect{
    background: url('@/../public/icons.png') no-repeat -4px -105px;
  }
  .description__icon_hybrid {
    background: url('@/../public/icons.png') no-repeat -68px -208px;
  }
  .description__icon_tgk {
    background: url('@/../public/icons.png') no-repeat -5px -235px;
  }
  .description__icon_cbd {
    background: url('@/../public/icons.png') no-repeat -70px -236px;
  }
  .weigth__icon {
    display: inline-block;
    height: 35px;
    width: 35px;
    background: url('@/../public/icons.png') no-repeat -36px -72px;
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
  .description__weightinut_full {
    margin-left: 0;
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
    .container {
      flex-direction: column-reverse;
    }
    .description__taste {
      width: 150px;
      height: 150px;
      margin: 0 5px;
    }
    .description {
      padding: 10px 20px;
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
  }







  .catalog-preview {
    padding: 10px;
  }
  .view-catalog {
    padding: 10px 20px;
    cursor: pointer;
  }
  .route__link {
    max-width: 190px;
    text-decoration: none;
    color:black;
    width: auto;
  }
  .route__link_full {
    width: 100%;
    max-width: 100%;
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
    align-items: center;
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