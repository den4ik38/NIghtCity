<template>
  <div class="wrapper">
    <form ref="productForm" class="add_product_form">
      <input v-model="name" type="text" placeholder="Name of product" class="name_product">
      <textarea v-model="descripOne" name="" id="" cols="30" rows="3" placeholder="3 blocks of description" class="description"></textarea>
      <textarea v-model="descripTwo" name="" id="" cols="30" rows="3" placeholder="3 blocks of description" class="description"></textarea>
      <textarea v-model="descripThree" name="" id="" cols="30" rows="3" placeholder="This text will be on preview on cotalog list" class="description"></textarea>
      <textarea v-model="detailsOne" name="" id="" cols="30" rows="3" placeholder="3 blocks of details" class="description"></textarea>
      <textarea v-model="detailsTwo" name="" id="" cols="30" rows="3" placeholder="3 blocks of details" class="description"></textarea>
      <textarea v-model="detailsThree" name="" id="" cols="30" rows="3" placeholder="block for serving information" class="description"></textarea>
      <input v-model="price" type="number" placeholder="Price" class="price">
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
    <my-alert v-model:showAlert="showAlert">
      {{alertMessage}}
    </my-alert>
  </div>
</template>
<script>
import {useProduct} from '@/hooks/useProduct'
export default {
  props:{
    type: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      name: '',
      descripOne:'',
      descripTwo:'',
      descripThree:'',
      detailsOne:'',
      detailsTwo:'',
      detailsThree:'',
      price:0,
      fileCatalog: null,
      photos: [],
      showAlert: false,
      alertMessage: ''
    }
  },
  methods: {
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
    changeCatalogPhoto(event) {
      const [file] = event.target.files
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
      if (this.descripOne.length > 0) {
        description.push(this.descripOne)
      }
      if (this.descripTwo.length > 0) {
        description.push(this.descripTwo)
      }
      if (this.descripThree.length > 0) {
        description.push(this.descripThree)
      }
      const details = []
      if (this.detailsOne.length > 0) {
        details.push(this.detailsOne)
      }
      if (this.detailsTwo.length > 0) {
        details.push(this.detailsTwo)
      }
      if (this.detailsThree.length > 0) {
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
</style>