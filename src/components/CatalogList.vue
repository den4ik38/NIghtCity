<template>
  <div class="container">
    <div class="preview">
        <div class="categories__conatiner">
          <div class="preview__item_container">
            <my-sorted @changeCatalog="fullCatalog = !fullCatalog" @changeSort="selectedSort"/>
            <div class="category__sliderbox">
              <div class="category__slider" v-if="sortedItems.length > 0">
                <catalog-item v-for="card in sortedItems" :key="card.id" :item="card" :full="fullCatalog"/>
              </div>
              <div v-if="sortedItems.length === 0" class="loader">
                <div class="loader__text">Loading...</div>
                <div class="preloader-7"> 
                  <div>
                      <div>
                          <div>
                              <div>
                                  <div>
                                      <div>
                                          <div>
                                              <div>
                                                  <div></div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import MySorted from '@/components/MySorted.vue'
import CatalogItem from '@/components/CatalogItem.vue'
import {useBuds} from '@/hooks/useBuds'
import {useSort} from '@/hooks/useSort'
import { useProduct } from '@/hooks/useProduct'

export default {
  components: {MySorted, CatalogItem},
  props: {
    change: {
      type: String,
      default: ''
    }
  },
  data(){
    return {
      fullCatalog:false,
    }
  },
  methods: {
    selectedSort(value) {
      this.sort = value
    }
  },
  watch:{
    change(){
      this.choice = this.change
    }
  },
  mounted(){
    this.fetchingAll()
    this.fetchingAllProducts()
  },
  setup(props) {
    const {buds, indica, sativa, hybrid, fetchingAll} = useBuds()
    const {allProducts, fetchingAllProducts} = useProduct()
    const {sort, sortedItems, choice} = useSort(buds, indica, sativa, hybrid, allProducts)
    return {
      buds, indica, sativa, hybrid, sort, sortedItems, choice, fetchingAll, allProducts, fetchingAllProducts
    }
  }
}
</script>
<style scoped>
  .container {
    width: 77%;
  }
  .preview {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
  .categories__conatiner {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .preview__item_container {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    margin-top: 10px;
  }
  .category__sliderbox {
    width: 100%;
    padding: 10px 20px;
    display: flex;
  }
  .category__slider {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    position: relative;
    flex-wrap: wrap;
  }
  .loader {
    margin: 20px auto;
  }
  .loader__text {
    font-size: 32px;
    text-align: center;
    color: grey;
  }
  .preloader-7 div {
    border: 14px inset #FFF;
    border-radius: 100%;
    padding: 4px;
    animation: preloader-7-spin 15s linear infinite;
  }
  @media screen and (max-width:500px) {
    .preview {
      padding: 20px 5px;
    }
    .category__sliderbox {
      padding: 10px 0;
    }
  }

  @media screen and (max-width:360px) {
    .preview{
      padding: 10px 5px;
    }
    .category__sliderbox {
      padding: 10px 0;
    }
  }

  @keyframes preloader-7-spin {
      from { transform: rotate(0deg) }
      to { transform: rotate(360deg) }
  }
  
</style>