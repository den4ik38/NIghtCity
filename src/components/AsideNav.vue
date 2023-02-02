<template>
  <div>
    <div v-if="indica" class="catalog__section">
      <div class="accord__label">
        <input type="checkbox" id="accord__checkbox1" name="accord__checkbox1" class="accord__checkbox">
        <label for="accord__checkbox1" class="section__title">Indica</label>
        <ul class="catalog__list">
          <li v-for="sort in indica" :key="sort.id" class="catalog__item"><a @click.prevent="$router.push(`/catalog/${sort.name}`)" class="catalog__link">{{sort.name}}</a></li>
        </ul>
      </div>
      <div class="catalog__sectionquan">{{indica.length}}</div>
    </div>
    <div v-if="sativa" class="catalog__section">
      <div class="accord__label">
        <input type="checkbox" id="accord__checkbox2" name="accord__checkbox2" class="accord__checkbox">
        <label for="accord__checkbox2" class="section__title">Sativa</label>
        <ul class="catalog__list">
          <li v-for="sort in sativa" :key="sort.id" class="catalog__item"><a @click.prevent="$router.push(`/catalog/${sort.name}`)" class="catalog__link">{{sort.name}}</a></li>
        </ul>
      </div>
      <div class="catalog__sectionquan">{{sativa.length}}</div>
    </div>
    <div v-if="hybrid" class="catalog__section">
      <div class="accord__label">
        <input type="checkbox" id="accord__checkbox3" name="accord__checkbox3" class="accord__checkbox">
        <label for="accord__checkbox3" class="section__title">Hybrid</label>
        <ul class="catalog__list">
          <li v-for="sort in hybrid" :key="sort.id" class="catalog__item"><a @click.prevent="$router.push(`/catalog/${sort.name}`)" class="catalog__link">{{sort.name}}</a></li>
        </ul>
      </div>
      <div class="catalog__sectionquan">{{hybrid.length}}</div>
    </div>
    <div v-if="hash" class="catalog__section">
      <div class="accord__label">
        <input type="checkbox" id="accord__checkbox4" name="accord__checkbox4" class="accord__checkbox">
        <label for="accord__checkbox4" class="section__title">Hash</label>
        <ul class="catalog__list">
          <li v-for="hashik in hash" :key="hashik.id" class="catalog__item"><router-link :to="{ name: 'product', params: {type:hashik.type, id: hashik._id}}" class="catalog__link">{{hashik.name}}</router-link></li>
        </ul>
      </div>
      <div class="catalog__sectionquan">{{hash.length}}</div>
    </div>
    <div v-if="kief" class="catalog__section">
      <div class="accord__label">
        <input type="checkbox" id="accord__checkbox5" name="accord__checkbox5" class="accord__checkbox">
        <label for="accord__checkbox5" class="section__title">Kief</label>
        <ul class="catalog__list">
          <li v-for="kieifs in kief" :key="kieifs.id" class="catalog__item"><router-link :to="{ name: 'product', params: {type:kieifs.type, id: kieifs._id}}" class="catalog__link">{{kieifs.name}}</router-link></li>
        </ul>
      </div>
      <div class="catalog__sectionquan">{{kief.length}}</div>
    </div>
    <div v-if="food" class="catalog__section">
      <div class="accord__label">
        <input type="checkbox" id="accord__checkbox6" name="accord__checkbox6" class="accord__checkbox">
        <label for="accord__checkbox6" class="section__title">Food</label>
        <ul class="catalog__list">
          <li v-for="foods in food" :key="foods.id" class="catalog__item"><router-link :to="{ name: 'product', params: {type:foods.type, id: foods._id}}" class="catalog__link">{{foods.name}}</router-link></li>
        </ul>
      </div>
      <div class="catalog__sectionquan">{{food.length}}</div>
    </div>
    <div v-if="cbd" class="catalog__section">
      <div class="accord__label">
        <input type="checkbox" id="accord__checkbox7" name="accord__checkbox7" class="accord__checkbox">
        <label for="accord__checkbox7" class="section__title">CBD</label>
        <ul class="catalog__list">
          <li v-for="cbds in cbd" :key="cbds.id" class="catalog__item"><router-link :to="{ name: 'product', params: {type:cbds.type, id: cbds._id}}" class="catalog__link">{{cbds.name}}</router-link></li>
        </ul>
      </div>
      <div class="catalog__sectionquan">{{cbd.length}}</div>
    </div>
    <div v-if="accessories" class="catalog__section">
      <div class="accord__label">
        <input type="checkbox" id="accord__checkbox8" name="accord__checkbox8" class="accord__checkbox">
        <label for="accord__checkbox8" class="section__title">Accessories</label>
        <ul class="catalog__list">
          <li v-for="accessor in accessories" :key="accessor.id" class="catalog__item"><router-link :to="{ name: 'product', params: {type:accessor.type, id: accessor._id}}" class="catalog__link">{{accessor.name}}</router-link></li>
        </ul>
      </div>
      <div class="catalog__sectionquan">{{accessories.length}}</div>
    </div>
    
  </div>
</template>
<script>
import {useBuds} from '@/hooks/useBuds'
import {useProduct} from '@/hooks/useProduct'

export default {
  mounted(){
    this.fetchingAll()
    this.fetchingAllProducts()
  },
  setup() {
    const {indica, sativa, hybrid, fetchingAll} = useBuds()
    const {allProducts, fetchingAllProducts, hash, kief, food, cbd, accessories} = useProduct()

    return {
      indica, sativa, hybrid, fetchingAll, allProducts, fetchingAllProducts, hash, kief, food, cbd, accessories
    }
  }
}
</script>
<style scoped>
  .catalog__section {
    display: flex;
    justify-content: space-between;
    border-bottom: 0.5px solid rgba(128, 128, 128, 0.362);
    margin-bottom: 10px;
  }
  .catalog__sectionquan {
    color: goldenrod;
    font-weight: bold;
    margin-right: 30px;
    position: relative;
  }
  .accord__label {
    padding-bottom: 5px;
  }
  .section__title {
    font-size: 18px;
    font-weight: bold;
    color: #a3c52d;
    position: relative;
    cursor:pointer;
  }
  .catalog__sectionquan::after {
    content: '';
    display: inline-block;
    width: 14px;
    height: 14px;
    background-image: url('../../public/arrow.png');
    background-size:contain;
    opacity: 0.4;
    position: absolute;
    right: -20px;
    top:5px;
    cursor:pointer;
    transform: rotate(-90deg);
  }

  .catalog__list {
    display: flex;
    flex-direction: column;
    list-style: none;
  }
  .catalog__item {
    padding: 2px 0 2px 20px;
  }
  .catalog__link {
    text-decoration: none;
    color: goldenrod;
    font-weight: bold;
    cursor: pointer;
  }
  .catalog__link:hover {
    color: #a3c52d;
  }
  .accord__label:hover .section__title {
    color: goldenrod;
  }

  .accord__checkbox {
    display: none;
  }
  .catalog__list {
    display: none;
  }
  .accord__label input:checked ~ .catalog__list {
    display: flex;
  }
  .accord__label:has(input:checked) + .catalog__sectionquan::after {
    transform: rotate(0deg);
  }
  @media screen and (max-width:800px) {
    .section__title {
      font-size: 15px;
    }
  }
</style>