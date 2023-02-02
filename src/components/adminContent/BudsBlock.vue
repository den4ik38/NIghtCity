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
export default {
  components: {
    ProductItem
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
      showAlert: false,
      alertMessage: ''
    }
  },
  methods: {
    itemImage(str) {
      return '../../' + str
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
      this.fileCatalog = file
        if (file) {
        this.$refs.catalogPhoto.src = URL.createObjectURL(file)
        }
    },
    makePhoto(event) {
      const [file] = event.target.files
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
      const answer = this.saveBud(this.photos, this.fileCatalog, obj)
      this.alertMessage = answer.message
      this.showAlert = true
      this.clearForm()
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
</style>