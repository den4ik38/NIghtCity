<template>
  <div>
    <div class="first__screen">
      <div class="blocks__container">
        <div class="block">100% organic</div>
        <div class="block">Fast Delivery</div>
        <div class="block">Cash-on-delivery</div>
      </div>
      <nav class="catalog__navigation">
        <ul class="nav__list">
          <li class="nav__item"><a @click.prevent="switcher('accessories')" class="nav__catalog_item">ACCESSORIES</a></li>
          <li class="nav__item"><a @click.prevent="switcher('indica')" class="nav__catalog_item">INDICA</a></li>
          <li class="nav__item"><a @click.prevent="switcher('sativa')" class="nav__catalog_item">SATIVA</a></li>
          <li class="nav__item"><a @click.prevent="switcher('hybrid')" class="nav__catalog_item">HYBRID</a></li>
          <li class="nav__item"><a @click.prevent="switcher('hash')" class="nav__catalog_item">HASH</a></li>
          <li class="nav__item"><a @click.prevent="switcher('kief')" class="nav__catalog_item">KIEF</a></li>
          <li class="nav__item"><a @click.prevent="switcher('cbd')" class="nav__catalog_item">CBD</a></li>
          <li class="nav__item"><a @click.prevent="switcher('food')" class="nav__catalog_item">FOOD</a></li>
        </ul>
      </nav>
    </div>
    <div class='wrapper'>
      <my-aside class="my_aside">
        <aside-nav/>
        <aside-articles v-if="false"/>
        <aside-banner v-if="false"/>
      </my-aside>
      <catalog-list :change="productsChoice"/>
    </div>
  </div>
</template>
<script>
import MyAside from '@/components/MyAside.vue'
import CatalogList from '@/components/CatalogList.vue'
import AsideNav from '@/components/AsideNav.vue';
import AsideArticles from '@/components/AsideArticles.vue';
import AsideBanner from '@/components/AsideBanner.vue';

export default {
  components: {
    MyAside,
    CatalogList,
    AsideNav,
    AsideArticles,
    AsideBanner
  },
  data() {
    return {
      productsChoice: ''
    }
  },
  methods: {
    switcher(str) {
      this.productsChoice = str
    }
  },
  mounted(){
    window.scrollTo(0, 0)
  }
}
</script>
<style scoped>
  .wrapper {
    max-width: 1140px;
    width: 100%;
    display: flex;
    margin: 70px auto;
  }
  .first__screen {
    min-height: 450px;
    width: 100%;
    background-image: url('../../public/buds.jpeg');
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
  }
  .blocks__container {
    position: absolute;
    bottom: 10%;
    left: calc(50% - 510px);
    display: flex;
  }
  .block {
    width: 300px;
    color: white;
    font-size: 25px;
    text-transform: uppercase;
    font-weight: bold;
    border: 5px solid white;
    padding: 20px 10px 20px;
    margin: 0 20px;
    text-align: center;
  }
  .catalog__navigation {
    position: absolute;
    bottom: -40px;
    width: 100%;
    color:black;
    display: flex;
    justify-content: center;
  }
  .nav__list {
    display: flex;
    width: 100%;
    max-width: 1140px;
    justify-content: space-around;
  }
  .nav__item {
    margin: 0 20px;
    list-style: none;
  }
  .nav__catalog_item {
    text-decoration: none;
    color: (156, 116, 74);
    font-weight: bold;
    cursor: pointer;
  }
  .nav__catalog_item:hover {
    color:#a3c52d;
  }

  @media screen and (max-width: 1000px) {
    .blocks__container {
      left: calc(50% - 375px);
    }
    .block {
      border: 3px solid white;
      font-size: 19px;
      width: 210px;
    }
  }
  @media screen and (max-width: 800px) {
    .blocks__container {
      left: calc(50% - 300px);
    }
    .block {
      border: 3px solid white;
      font-size: 16px;
      padding: 10px 5px;
      width: 180px;
      margin: 0 10px;
    }
    .nav__item {
      margin: 0 10px;
    }
    .nav__catalog_item {
      font-size: 13px;
    }
    .my_aside {
      display: none;
    }
  }
  @media screen and (max-width: 600px) {
    .first__screen {
      min-height: 300px;
    }
    .blocks__container {
      left: calc(50% - 240px);
    }
    .block {
      border: 3px solid white;
      font-size: 14px;
      padding: 5px 2px;
      width: 150px;
      margin: 0 5px;
    }
  }
  @media screen and (max-width: 500px) {
    .first__screen {
      min-height: 300px;
    }
    .blocks__container {
      left: calc(50% - 150px);
    }
    .block {
      border: 3px solid white;
      font-size: 12px;
      padding: 5px 2px;
      width: 90px;
      margin: 0 5px;
    }
    .nav__item {
      margin: 0 5px;
    }
    .nav__catalog_item {
      font-size: 12px;
    }
  }
  @media screen and (max-width: 412px) {
    .nav__item {
      margin: 0 3px;
    }
    .nav__catalog_item {
      font-size: 10px;
    }
  }
  @media screen and (max-width: 360px) {
    .first__screen {
      min-height: 300px;
    }
    .blocks__container {
      left: calc(50% - 135px);
    }
    .block {
      border: 3px solid white;
      font-size: 11px;
      padding: 5px 2px;
      width: 80px;
      margin: 0 5px;
    }
    .catalog__navigation {
      bottom: -30px
    }
    .nav__catalog_item {
      font-size: 8px;
    }
  }
</style>