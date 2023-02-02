<template>
  <div class="wrapper">
    <div class="line"></div>
    <div class="container">
      <div class="half left_half">
        <div @click="toggleMenu(0)" :class="{active: active === 0}" class="menu">Orders</div>
        <div @click="toggleMenu(1)" :class="{active: active === 1}" class="menu">reviews</div>
        <div @click="toggleMenu(2)" :class="{active: active === 2}" class="menu">Letters</div>
        <div @click="toggleMenu(3)" :class="{active: active === 3}" class="menu">users</div>
        <div @click="toggleMenu(4)" :class="{active: active === 4}" class="menu">Buds</div>
        <div @click="toggleMenu(5)" :class="{active: active === 5}" class="menu">Hashes</div>
        <div @click="toggleMenu(6)" :class="{active: active === 6}" class="menu">Kiefs</div>
        <div @click="toggleMenu(7)" :class="{active: active === 7}" class="menu">Foods</div>
        <div @click="toggleMenu(8)" :class="{active: active === 8}" class="menu">CBDs</div>
        <div @click="toggleMenu(9)" :class="{active: active === 9}" class="menu">Accessories</div>

      </div>
      <div class="half right__half">
        <div v-if="active === 0" class="contenet__section">
          <div class="headers__container">
            <div @click="toggleHeader(0)" class="header" :class="{active__header: activeHeader === 0}"> <span>New</span> </div>
            <div @click="toggleHeader(1)" class="header" :class="{active__header: activeHeader === 1}"> <span>Wait send</span> </div>
            <div @click="toggleHeader(2)" class="header" :class="{active__header: activeHeader === 2}"> <span>Wait confirm</span> </div>
          </div>
          <div class="content">
            <my-orders :isVisible="activeHeader"/>
          </div>
        </div>
        <div v-if="active === 1" class="contenet__section">
          <div class="headers__container">

          </div>
          <div class="content">
            <block-reviews :isVisible="activeHeader"/>
          </div>
        </div>
        <div v-if="active === 2" class="contenet__section">
          <div class="headers__container">

          </div>
          <div class="content">
            <my-letter-list/>
          </div>
        </div>
        <div v-if="active === 3" class="contenet__section">
          <div class="headers__container">

          </div>
          <div class="content">
            <user-list/>
          </div>
        </div>
        <div v-if="active === 4" class="contenet__section">
          <div class="headers__container">
            <div @click="toggleHeader(0)" class="header" :class="{active__header: activeHeader === 0}"> <span>Redacted</span> </div>
            <div @click="toggleHeader(1)" class="header" :class="{active__header: activeHeader === 1}"> <span>Add new Bud</span> </div>
          </div>
          <div class="content">
            <buds-block :isVisible="activeHeader"/>
          </div>
        </div>
        <div v-if="active === 5" class="contenet__section">
          <div class="headers__container">
            <div @click="toggleHeader(0)" class="header" :class="{active__header: activeHeader === 0}"> <span>Redacted</span> </div>
            <div @click="toggleHeader(1)" class="header" :class="{active__header: activeHeader === 1}"> <span>Add new Hash</span> </div>
          </div>
          <div class="content">
            <product-block :isVisible="activeHeader" :type="hash"/>
          </div>
        </div>
        <div v-if="active === 6" class="contenet__section">
          <div class="headers__container">
            <div @click="toggleHeader(0)" class="header" :class="{active__header: activeHeader === 0}"> <span>Redacted</span> </div>
            <div @click="toggleHeader(1)" class="header" :class="{active__header: activeHeader === 1}"> <span>Add new Hash</span> </div>
          </div>
          <div class="content">
            <product-block :isVisible="activeHeader" :type="kief"/>
          </div>
        </div>
        <div v-if="active === 7" class="contenet__section">
          <div class="headers__container">
            <div @click="toggleHeader(0)" class="header" :class="{active__header: activeHeader === 0}"> <span>Redacted</span> </div>
            <div @click="toggleHeader(1)" class="header" :class="{active__header: activeHeader === 1}"> <span>Add new Hash</span> </div>
          </div>
          <div class="content">
            <product-block :isVisible="activeHeader" :type="food"/>
          </div>
        </div>
        <div v-if="active === 8" class="contenet__section">
          <div class="headers__container">
            <div @click="toggleHeader(0)" class="header" :class="{active__header: activeHeader === 0}"> <span>Redacted</span> </div>
            <div @click="toggleHeader(1)" class="header" :class="{active__header: activeHeader === 1}"> <span>Add new Hash</span> </div>
          </div>
          <div class="content">
            <product-block :isVisible="activeHeader" :type="cbd"/>
          </div>
        </div>
        <div v-if="active === 9" class="contenet__section">
          <div class="headers__container">
            <div @click="toggleHeader(0)" class="header" :class="{active__header: activeHeader === 0}"> <span>Redacted</span> </div>
            <div @click="toggleHeader(1)" class="header" :class="{active__header: activeHeader === 1}"> <span>Add new Hash</span> </div>
          </div>
          <div class="content">
            <product-block :isVisible="activeHeader" :type="accessories"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MyOrders from '@/components/adminContent/MyOrders.vue'
import MyLetterList from '@/components/adminContent/MyLetterList.vue'
import UserList from '@/components/adminContent/UserList.vue'
import BlockReviews from '@/components/adminContent/BlockReviews.vue'
import BudsBlock from '@/components/adminContent/BudsBlock.vue'
import ProductBlock from '@/components/adminContent/ProductBlock.vue'
export default {
  components: {
    BlockReviews, MyOrders, MyLetterList, UserList, BudsBlock, ProductBlock
  },
  data(){
    return {
      active: 0,
      activeHeader: 0,
      hash: 'hash',
      kief: 'kief',
      food: 'food',
      cbd: 'cbd',
      accessories: 'accessories'
    }
  },
  methods: {
    toggleMenu(num){
      this.active = num
      this.activeHeader = 0
    },
    toggleHeader(num){
      this.activeHeader = num
    }
  }
}
</script>
<style scoped>
  .line {
    width: 100%;
    height: 60px;
    background-color:rgb(72, 72, 72);
  }
  .container {
    max-width: 1140px;
    display: flex;
    margin: 30px auto 0;
  }
  .left_half {
    width: 360px;
    border-right: 1px solid lightgrey;
  }
  .right__half {
    width: 100%;
    padding-left: 15px;
  }
  .menu {
    width: 100%;
    padding: 15px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color:grey;
    cursor: pointer;
  }
  .active {
    background-color: #a3c52d;
    color:white;
  }
  .contenet__section {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .headers__container {
    display: flex;
    justify-content: center;
  }
  .header {
    padding: 6px 10px;
    width: 210px;
    display: flex;
    border: 1px solid lightgrey;
    align-items:center;
    justify-content: center;
    cursor: pointer;
  }
  .header span {
    text-align: center;
  }
  .active__header {
    border: 2px solid #a3c52d;
    color:#a3c52d;
    font-weight: bold;
    border-bottom: none;
  }

  @media screen and (max-width:875px) {
    .container {
      display: flex;
      flex-direction: column;
    }
    .left_half {
      max-width: 100%;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
    }
    .menu {
      width: 150px;
      text-align: center;
    }
    .right__half {
      padding-left: 0;
    }
  }
  @media screen and (max-width:360px) {
    .menu {
      width: 130px;
      font-size: 12px;
    }
    .header {
      font-size: 14px;
    }
  }
</style>