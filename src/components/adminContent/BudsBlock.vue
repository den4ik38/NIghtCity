<template>
  <div class="wrapper">
    <div v-if="isVisible === 0" class="redacted__section">
      <product-item @reload="fetchingAll" v-for="bud in buds" :key="bud.id" :product="bud" :type="bud.type"/>
    </div>
    <div v-if="isVisible === 1" class="add_new__section">
      <form class="add_form">
        <input v-model="title" type="text" placeholder="Name of product" class="input_form input__title">
        <input v-model="tasteTitle" type="text" placeholder="Taste Title" class="input_form input__taste_title">
        <textarea v-model="tasteDescription" type="text" placeholder="Description taste" class="input_form input__taste_description"></textarea>
        <div class="section__taste_tegs">
          <select ref="tastetegs" name="tastetegs" id="tastetegs" class="input_form taste__select">
            <option value="" selected disabled class="option__default">Выберите вкус</option>
            <option v-for="teg in tegs" :key="teg" :value="teg" class="tegs__option">{{teg}}</option>
          </select>
          <button @click.prevent="addTaste" class="input_form taste__btn">add</button>
          <div class="taste__result">
            <li v-for="image in images" class="description__taste"><img :src="itemImage(image.img)" alt="" class="description__tasteimg"><span class="decription__tasteimgspan">{{image.title}}</span></li>
          </div>
        </div>
        <div class="medical__section">
          <input v-model="medicalTitle" placeholder="Name Help" type="text" class="input_form medical__title">
          <textarea v-model="medicalDescr" placeholder="Description Help" name="meddescrip" id="meddescrip" cols="30" rows="10" class="input_form medical__description"></textarea>
          <button @click.prevent="addHelp" class="input_form taste__btn">Add</button>
          <div class="medical__result">
            <div v-for="help in medHelps" class="description__help">
                  <div class="description__helptitle">{{help.title}}</div>
                  <p class="description__helptext">{{help.description}}</p>
                </div>
          </div>
        </div>
        <input v-model="dnk" type="text" placeholder="DNK Grades" class="input_form input__dnk">
        <input v-model="hybrid" type="text" placeholder="Hybrid sativa/indika" class="input_form input__hybrid">
        <input v-model="effects" type="text" placeholder="Effects" class="input_form input__effects">
        <input v-model="thc" type="text" placeholder="THC" class="input_form input__tgk">
        <input v-model="cbd" type="text" placeholder="CBD" class="input_form input__cbd">
        <input v-model="price" type="text" placeholder="Price" class="input_form input__price">
        <input v-model="quantityProductsAdd" type="text" placeholder="How much quantity products add?" class="input_form input__price">
        <div class="catalog_photo__section">
          <span>Выберите фото для каталога</span>
          <input ref="catalogPhotoInput" type="file" @input="changeCatalogPhoto($event)" class="input_form">
          <img ref="catalogPhoto" class="catalog_photo__preview">
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
            <div class="decription__title">{{title}}</div>
            <div class="description__cost">{{price}} ฿</div>
            <div class="description__textbox">
              <div class="decription__textsubtitle">{{tasteTitle}}</div> 
              <p class="decription__text">
                {{tasteDescription}}
              </p>
              <div class="description__tasteblock">
                <ul class="dedscription__tastelist">
                  <li v-for="image in images" class="description__taste"><img :src="itemImage(image.img)" alt="" class="description__tasteimg"><span class="decription__tasteimgspan">{{image.title}}</span></li>
                </ul>
              </div>
              <div class="description__helps">
                <div class="description__helpstitle">{{title}} helps:</div>
                <div class="description__helpscontainer">
                  <div v-for="help in medHelps" class="description__help">
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
                      <span class="description__iconvalue">{{dnk}}</span>
                    </span>
                  </span>
                </li>
                <li class="description__itemlistitem">
                  <span title="Эффект от применения" class="description__itemtitle">
                    <span class="description__item">
                      <span class="description__iconcontainer">
                        <i class="description__icon description__icon_effect"></i>
                      </span>
                      <span class="description__iconvalue">{{effects}}</span>
                    </span>
                  </span>
                </li>
                <li class="description__itemlistitem">
                  <span title="Гены происхождения" class="description__itemtitle">
                    <span class="description__item">
                      <span class="description__iconcontainer">
                        <i class="description__icon description__icon_hybrid"></i>
                      </span>
                      <span class="description__iconvalue">{{hybrid}}</span>
                    </span>
                  </span>
                </li>
                <li class="description__itemlistitem">
                  <span title="Содержание Тетрагидроканнабинола" class="description__itemtitle">
                    <span class="description__item">
                      <span class="description__iconcontainer">
                        <i class="description__icon description__icon_tgk"></i>
                      </span>
                      <span class="description__iconvalue">{{thc}}</span>
                    </span>
                  </span>
                </li>
                <li class="description__itemlistitem">
                  <span title="Содержание Каннабидиола" class="description__itemtitle">
                    <span class="description__item">
                      <span class="description__iconcontainer description__icon_cbd">
                        <i class="description__icon"></i>
                      </span>
                      <span class="description__iconvalue">{{cbd}}</span>
                    </span>
                  </span>
                </li>
              </ul> 
            </div>
          </div>
        </div>
      </div>
      <div v-if="forCatalogPrevPhotos.length > 0" class="catalog-preview">
        <div class="cahnge-view">
          <span @click="changeCatalog(false)" class="view-catalog">Краткий режим каталога</span>
          <span @click="changeCatalog(true)" class="view-catalog">Расширенный режим каталога</span>
        </div>
        <div class="route__link" style="maxWidth:800px" :class="{route__link_full:full}">
          <div class="slider__item" :class="{slider__item_full:full}">
            <a v-if="forCatalogPrevPhotos.length > 0" :style="bcgImage(forCatalogPrevPhotos)" class="slider__img">
            </a>
            <div class="descrip__container">
              <div class="slider__title" :class="{short__style:!full}">
                  <a class="title">{{title}}</a> 
                  <div class="slider__tgk">THC: {{thc}}</div>
                  <div class="slider__cost">{{price}}฿</div>
              </div>
              <div v-if="full" class="slider__description">
                <h2 class="taste__title">Taste: {{tasteTitle}}</h2>
                <p class="taste__text">{{tasteDescription}}</p>
              </div>
              <div class="weight_and_cart" :class="{price__and__thc:full}">
                <div class="cart_section" :class="{short__style:!full}">
                    <select disabled name="weight" id="weight" class="description__weightinut">
                      <option value="1" selected class="weight_option">1 gram</option>
                    </select>
                  <button class="description__btn_addtocart" @click.prevent="addToCart()">ADD TO CART</button>
                  <div class="available">Available: {{ quantityProductsAdd }} units</div>
                </div>
                <a disabled class="more_info">More info >></a>
              </div>
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
import { useBuds } from '@/hooks/useBuds';
import { useTegs } from '@/hooks/useTegs';
import ProductItem from './ProductItem.vue';
import MyPreviewPhoto from '@/components/MyPreviewPhoto.vue'

export default {
  components: {
    ProductItem, MyPreviewPhoto
  },
  props: {
    isVisible : {
      type: Number,
      required: true
    }
  },
  data(){
    return {
      tasteTegs: [],
      medHelps: [],
      medicalDescr: '',
      medicalTitle: '',
      fileCatalog: null,
      photos: [],
      catalogPhoto: '',
      budPhoto:[],
      title: '',
      tasteTitle: '',
      tasteDescription: '',
      dnk: '',
      effects: '',
      hybrid: '',
      thc: '',
      cbd:'',
      price:'',
      quantityProductsAdd: null,
      showAlert: false,
      alertMessage: '',
      forPreviewPhotos: [],
      selectImg: false,
      forCatalogPrevPhotos: '',
      full: false
    }
  },
  methods: {
    itemImage(str) {
      return '@/../' + str
    },
    bcgImage(){
      return {backgroundImage: `url(${this.forCatalogPrevPhotos})`}
    },
    clearForm(){
      this.tasteTegs= []
      this.medHelps= []
      this.medicalDescr= ''
      this.medicalTitle= ''
      this.fileCatalog= null
      this.photos= []
      this.catalogPhoto= ''
      this.budPhoto=[]
      this.title= ''
      this.tasteTitle= ''
      this.tasteDescription= ''
      this.dnk= ''
      this.effects= ''
      this.hybrid= ''
      this.thc= ''
      this.cbd=''
      this.price=''
      this.images = []
      this.$refs.catalogPhotoInput.value = null
      this.$refs.photoPrevInput.value = null
      this.$refs.catalogPhoto.src = ''
      this.$refs.photoPrev.innerHTML = ''
      this.quantityProductsAdd = null
    },
    addTaste() {
      this.tasteTegs.push(this.$refs.tastetegs.value)
      this.makeImages(this.tasteTegs)
    },
    addHelp() {
      const obj = {}
      obj.title = this.medicalTitle
      obj.description = this.medicalDescr
      this.medHelps.push(obj)
      this.medicalTitle = ''
      this.medicalDescr = ''
    },
    changeCatalogPhoto(event) {
      const [file] = event.target.files
      this.forCatalogPrevPhotos = URL.createObjectURL(file)
      this.fileCatalog = file
        if (file) {
        this.$refs.catalogPhoto.src = URL.createObjectURL(file)
        }
    },
    makePhoto(event) {
      const [file] = event.target.files
      this.forPreviewPhotos.push(URL.createObjectURL(file))
      this.selectImg = true
        if (file) {
          const imagePhoto = document.createElement('img')
          imagePhoto.style.maxWidth = '150px'
          imagePhoto.src=URL.createObjectURL(file)
          this.$refs.photoPrev.appendChild(imagePhoto)
          this.photos.push(file)
        }
    },
    sendProduct() {
      const obj = {}
      obj.name = this.title
      obj.tasteTitle = this.tasteTitle
      obj.tasteDescription = this.tasteDescription
      obj.tasteTegs = this.tasteTegs
      obj.helps = this.medHelps
      obj.dnk = this.dnk
      obj.effect = this.effects
      obj.hybrid = this.hybrid
      obj.tgk = this.thc
      obj.cbd = this.cbd
      obj.price = this.price
      obj.inStock = this.quantityProductsAdd
      const answer = this.saveBud(this.photos, this.fileCatalog, obj)
      this.alertMessage = answer.message
      this.showAlert = true
      this.clearForm()
    },
    changeCatalog(bool){
      this.full = bool
    }
  },
  mounted(){
    this.fetchingAll()
  },
  setup() {
    const {buds, saveBud, fetchingAll} = useBuds()
    const {images, makeImages, tegs}= useTegs()
    return {
      buds, images, makeImages, tegs, saveBud, fetchingAll
    }
  }
}
</script>
<style scoped>
.wrapper {
  padding: 20px 10px;
}
.add_form {
  display: flex;
  flex-direction: column;
}
.input_form {
  padding: 5px 10px;
  font-size: 17px;
  line-height: 1.2;
  margin: 10px 20px;
}
.taste__result {
  display: flex;
  flex-wrap: wrap;
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
    margin: 10px;
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
  .description__help {
    max-width: 170px;
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
  .medical__result {
    display: flex;
    flex-wrap: wrap;
  }
  .medical__section {
    display: flex;
    flex-direction: column;
  }
  .catalog_photo__preview {
    width: 165px;
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
  @media screen and (max-width: 420px) {
    .input_form {
      margin: 10px 0;
    }
  }
  @media screen and (max-width: 360px) {
    .input_form {
      font-size: 14px;
    }
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