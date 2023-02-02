<template>
  <div class="wrapper">
    <div class="bud shadow">
      <div class="bud__main_info">
        <div class="bud__img_block">
          <div :style="bgiMake()" class="bud__row bud__photo"></div>
        </div>
        <div class="bud__header">
          <div class="bud__row bud__name"> <span class="span__title">Name: </span> <input v-model="name" type="text" class="product__name"></div>
          <input type="number" v-model="price" class="bud__row bud__price">
          <div class="bud__row row__flex">
            <div v-if="available" class="bud__row">Available</div>
            <div v-else class="bud__row">Not Available</div>
            <input type="number" v-model="available" :checked="available" style="width:40px" class="bud__row">
          </div>
          <img src="@/../public/garbage.png" @click="deleteProd" class="delete__btn">
          <div class="bud__row btns__row">
            <button v-if="!showMore" @click.prevent="saveChange" class="bud__button bud__row">Save Changes</button>
            <button v-if="!showMore" @click.prevent="showMore = true" class="bud__button bud__row">Open Product</button>
          </div>
        </div>
      </div>
      <div v-if="showMore" class="all__info">
        <div v-if="type === 'bud'" class="all_info__container">
          <label for="" class="input__label">Taste title</label>
          <input v-model="title" type="text" class="taste__title input_item">
          <label for="" class="input__label">Taste description</label>
          <textarea v-model="description" type="text" class="taste__description input_item"></textarea>
          <label for="" class="input__label">DNK</label>
          <input v-model="dnk" type="text" class="input__dnk input_item">
          <label for="" class="input__label">Effects</label>
          <input v-model="effect" type="text" class="input__effect input_item">
          <label for="" class="input__label">Hybrid</label>
          <input v-model="hybrid" type="text" class="input__hybrid input_item">
          <label for="" class="input__label">THC</label>
          <input v-model="tgk" type="text" class="input__tgk input_item">
          <label for="" class="input__label">CBD</label>
          <input v-model="cbd" type="text" class="input__cbd input_item">
        </div>
        <div v-else class="all_info__container">
            <label for="" class="input__label">Description block #1</label>
            <textarea v-model="description1" name="" id="" cols="30" rows="10" class="input_item"></textarea>
            <label for="" class="input__label">Description block #2</label>
            <textarea v-model="description2" name="" id="" cols="30" rows="10" class="input_item"></textarea>
            <label for="" class="input__label">Description block #3</label>
            <textarea v-model="description3" name="" id="" cols="30" rows="10" class="input_item"></textarea>
            <label for="" class="input__label">Details #1</label>
            <textarea v-model="details1" name="" id="" cols="30" rows="10" class="input_item"></textarea>
            <label for="" class="input__label">Details #2</label>
            <textarea v-model="details2" name="" id="" cols="30" rows="10" class="input_item"></textarea>
            <label for="" class="input__label">Served info</label>
            <textarea v-model="details3" name="" id="" cols="30" rows="10" class="input_item"></textarea>
        </div>
        <div class="all_info__btns">
          <button @click="saveChange" class="bud__button bud__row">Save changes</button>
          <button @click.prevent="showMore = false" class="bud__button bud__row">Close Product info</button>
        </div>
      </div>
    </div>
    <my-alert v-model:showAlert="showAlert">
      {{alertMessage}}
    </my-alert>
  </div>
</template>
<script>
import {updateProduct} from '@/hooks/updateProduct'
export default {
  props: {
    product: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      showMore: false,
      available: null,
      price: 0,
      showAlert: false,
      alertMessage: '',
      name: '',
      title: '',
      description: '',
      dnk: '',
      effect: '',
      hybrid: '',
      tgk: '',
      cbd: '',
      description1: '',
      description2: '',
      description3: '',
      details1: '',
      details2: '',
      details3: '',
    }
  },
  methods: {

    bgiMake() {
      return {backgroundImage: `url(${this.product.catalogPhoto})`}
    },
    deleteProd(){
      if (this.type === 'bud'){
        this.deleteProduct(this.type, this.product._id, this.product.catalogPhoto, this.product.budsPhoto)
      } else {
        this.deleteProduct(this.type, this.product._id, this.product.catalogPhoto, this.product.productPhoto)
      }
    },
    async saveChange(){
      const obj = {}
      if (this.product.type === 'bud') {
        obj.id = this.product._id
        obj.type = this.product.type
        obj.price = this.price
        obj.inStock = this.available
        obj.name = this.name
        obj.tasteTitle = this.tasteTitle
        obj.tasteDescription = this.description
        obj.dnk = this.dnk
        obj.effect = this.effect
        obj.hybrid = this.hybrid
        obj.tgk = this.tgk
        obj.cbd = this.cbd
      } else {
        obj.id = this.product._id
        obj.type = this.product.type
        obj.price = this.price
        obj.inStock = this.available
        obj.name = this.name
        obj.details = []
        obj.description = []
        if (this.description1.length > 0) {
          obj.description.push(this.description1)
        }
        if (this.description2.length > 0) {
          obj.description.push(this.description2)
        }
        if (this.description3.length > 0) {
          obj.description.push(this.description3)
        }
        if (this.details1.length > 0) {
          obj.details.push(this.details1)
        }
        if (this.details2.length > 0) {
          obj.details.push(this.details2)
        }
        if (this.details3.length > 0) {
          obj.details.push(this.details3)
        }
      }
      const answer = await this.saveChangeProduct(obj)
      this.alertMessage = answer.message
      this.showAlert = true
      this.showMore = false
    },
    insertForm(){
      if (this.product.type === 'bud') {
        this.title = this.product.tasteTitle
        this.description = this.product.tasteDescription
        this.dnk = this.product.dnk
        this.effect = this.product.effect
        this.hybrid = this.product.hybrid
        this.tgk = this.product.tgk
        this.cbd = this.product.cbd
      } else {
        if (this.product.description.length === 3) {
          this.description1 = this.product.description[0]
          this.description2 = this.product.description[1]
          this.description3 = this.product.description[2]
        } else if (this.product.description.length === 2) {
          this.description1 = this.product.description[0]
          this.description3 = this.product.description[2]
        } else if (this.product.description.length === 1) {
          this.description1 = this.product.description[0]
        }
        if (this.product.details.length === 3) {
          this.details1 = this.product.details[0]
          this.details2 = this.product.details[1]
          this.details3 = this.product.details[2]
        } else if (this.product.details.length === 2) {
          this.details1 = this.product.details[0]
          this.details3 = this.product.details[2]
        } else if (this.product.details.length === 1) {
          this.details3 = this.product.details[0]
        }
      }
      this.name = this.product.name
      this.price = this.product.price
      this.available = this.product.inStock
    }
  },
  mounted(){
    this.insertForm()
  },
  watch: {
    reload(){
      this.$emit('reload')
    }
  },
  setup() {
    const {saveChangeProduct, deleteProduct, reload} = updateProduct()
    return {
      saveChangeProduct, deleteProduct, reload
    }
  }
}
</script>
<style scoped>
.bud {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}
.bud__main_info {
  display: flex;
}
.bud__img_block {
  min-width: 150px;
  padding: 10px;
  display: flex;
  justify-content: center;
}
  .bud__header {
    display: flex;
    padding: 10px;
    margin: 10px;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
  }
  .bud__photo {
    min-width: 65px;
    height: 125px;
    background-repeat:no-repeat;
    background-size:contain;
  }
  .shadow {
    box-shadow: 0 0 5px grey;
  }
  .bud__row {
    margin: 10px;
    color: #a3c52d;
    font-weight: bold;
  }

  .input_item {
    margin: 10px 0;
    padding: 5px;
    font-size: 16px;
    width: 100%;
  }
  textarea {
    min-height: 150px;
  }
  .input__label {
    margin: 5px 0;
    font-size: 16px;
    font-weight: bold;
  }
  .row__flex {
    display: flex;
  }
  .bud__button {
    cursor: pointer;
    color: blue;
    padding: 5px 10px;
  }
  .bud__price {
    width: 70px;
  }
  .btns__row {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }
  .span__title {
    font-size: 20px;
    font-weight: bold;
    color: black;
  }
  .delete__btn {
    width: 40px;
    cursor: pointer;
  }
  .all_info__container {
    width: 100%;
  }
  @media screen and (max-width: 450px) {
    .bud {
      flex-direction: column;
    }
  }
</style>