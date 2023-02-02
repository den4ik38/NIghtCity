<template>
  <div class="wrapper">
    <div v-if="isVisible === 0" class="redacted__section">
      <product-item @reload="reload" v-for="product in products" :key="product.id" :product="product" :type="type"/>
    </div>
    <div v-if="isVisible === 1" class="add_new__section">
      <add-product-form :type="type"/>
    </div>
  </div>
</template>
<script>
import { useProduct } from '@/hooks/useProduct';
import ProductItem from './ProductItem.vue';
import AddProductForm from '@/components/adminContent/AddProductForm.vue'

export default {
  components: {
    ProductItem, AddProductForm
  },
  props: {
    isVisible : {
      type: Number,
      required: true
    },
    type: {
      type:String,
      required: true
    }
  },
  data(){
    return {
    }
  },
  methods: {
    reload(){
      this.fetchingProducts(this.type)
    }
  },
  mounted(){
    this.fetchingProducts(this.type)
  },
  setup() {
    const {fetchingProducts, products} = useProduct()
    return {
      fetchingProducts, products
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
    height: 265px;
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