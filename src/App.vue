<template>
  <my-header class="app-header app-header_bgc" @openCart="changeShow" @openMenu="changeShowMenu"/>
  <router-view class="view" @address="openAddressDialog"/>
  <my-cart :show="show" @closeCart="changeShow" @address="openAddressDialog"/>
  <my-mobile-menu :showMenu="showMenu" @closeMenu="changeShowMenu"/>
  <address-dialog v-model:visible="isVisible"/>
  <age-form v-model:showAge="showAge"/>
  <my-footer/>
</template>

<script>
import MyHeader from '@/components/MyHeader.vue'
import MyFooter from '@/components/MyFooter.vue'
import MyCart from '@/components/MyCart.vue'
import MyMobileMenu from '@/components/MyMobileMenu.vue'
import {useAuth} from '@/hooks/useAuth'
import AddressDialog from '@/components/AddressDialog.vue'
import AgeForm from '@/components/AgeForm.vue'

export default {
  components: {MyHeader, MyFooter, MyCart, AddressDialog, MyMobileMenu, AgeForm},
  data(){
    return{
      show: false,
      isVisible: false,
      showMenu: false,
      showAge: false
    }
  },
  methods: {
    changeShow(){
      this.show = !this.show
    },
    changeShowMenu(){
      this.showMenu = !this.showMenu
    },
    openAddressDialog(){
      this.isVisible = true
    },
    onScrollHeader() {
      const header = document.querySelector('.app-header')
      let prevScroll = window.pageYOffset
      let currentScroll
      window.addEventListener('scroll', () => {
        currentScroll = window.pageYOffset
        if (currentScroll !== 0) {
          header.classList.remove('app-header_bgc')


        }
        if (currentScroll === 0) {
          header.classList.add('app-header_bgc')

        }
        const headerHidden = () => header.classList.contains('header_hidden')
        if (currentScroll > prevScroll && !headerHidden() && prevScroll > 60) { 
          header.classList.add('header_hidden')
        }
        if (currentScroll < prevScroll && headerHidden()) {
          header.classList.remove('header_hidden') 
        }
        prevScroll = currentScroll 
      })
    }
    },
    watch: {
      check(){
        if (this.check === true) {
          const roles = JSON.parse(localStorage.getItem('roles'))
          const id = localStorage.getItem('id')
          const name = localStorage.getItem('name')
          const arr = [roles, id, name]
          this.$store.commit('setRolesAndAuth', arr)
        }
      }
    },
    mounted() {
      this.onScrollHeader()
      this.checkToken()
      if (!localStorage.getItem('age')) {
        this.showAge = true
      }
    },
    setup(){
      const {checkToken, check} = useAuth()
      return {
        checkToken, check
      }
    }
}
</script>

<style lang="scss">
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.view {
  min-height: calc(100vh - 215.5px);
}
.app-header {
    position: fixed;
    top: 0;
    transition: 1s;
    z-index: 5;
    background: rgb(72, 72, 72);

  }
  .app-header_bgc {
    background: transparent;
  }
  .header_hidden {
    transform: translateY(-105%);
  }
</style>
