<template>
  <div ref="menu" class="container">
    <div @click="closeMenu" class="close__btn"></div>
    <img @click="$router.push('/'), closeMenu()" src="../../public/logo.png" class="logo">
    <span class="author">CANNABIS-PATTAYA.STORE</span>
    <nav class="navigation">
      <span @click="$router.push('/'), closeMenu()" class="nav__link">Home</span>
      <span @click="$router.push('/catalog'), closeMenu()" class="nav__link">Shop</span>
      <span @click="$router.push('/contact-us'), closeMenu()" class="nav__link">Contact us</span>
      <span v-if="false" @click="$router.push('/faq'), closeMenu()" class="nav__link">FAQ</span>
      <span @click="$router.push('/admin'), closeMenu()" v-if="$store.state.roles.includes('ADMIN') || $store.state.roles.includes('MODERATOR')" class="nav__link">Admin</span>
    </nav>
  </div>
</template>
<script>
export default {
  props: {
    showMenu: {
      type: Boolean,
      required: true,
    }
  },
  methods:{
    closeMenu() {
      this.$emit('closeMenu')
    },
  },
  watch: {
    showMenu(){
      if (this.showMenu === true) {
        this.$refs.menu.classList.remove('closemenu')
        this.$refs.menu.classList.add('showmenu')
      } else {
        this.$refs.menu.classList.remove('showmenu')
        this.$refs.menu.classList.add('closemenu')

      }
    }
  }
}
</script>
<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 360px;
    z-index: 99;
    top: 0;
    bottom:0;
    left: 0;
    background-color: rgb(72, 72, 72);
    transform: translateX(-105%);
  }
  .showmenu {
    animation: showmenu 1s forwards;
  }
  .closemenu {
    animation: closemenu 1s forwards;
  }
  .close__btn {
    position: absolute;
    top: 30px;
    right: 30px;
    width: 30px;
    height: 30px;
    cursor:pointer;
  }
  .close__btn::before {
    content: '';
    box-sizing:border-box;
    width: 30px;
    height: 1px;
    border: 2px solid white;
    position: absolute;
    top: 15px;
    transform: rotate(45deg);
  }
  .close__btn::after {
    content: '';
    box-sizing:border-box;
    width: 30px;
    height: 1px;
    border: 2px solid white;
    position: absolute;
    top: 15px;
    transform: rotate(-45deg);
  }
  .logo {
    width: 200px;
    height: 120px;
    margin: 20px auto;
  }
  .author {
    font-size: 24px;
    font-weight: bold;
    margin: 10px auto;
    color: #a3c52d;
  }
  .navigation {
    display: flex;
    flex-direction: column;
    color: white;
  }
  .nav__link {
    font-size: 24px;
    font-weight: bold;
    margin: 10px auto;
  }

  @media screen and (max-width:360px) {
    .container {
      width: 280px;
    }
    .author {
      font-size: 19px;
    }
    .close__btn {
      top: 20px;
      right: 20px;
    }
  }
  

  @keyframes showmenu {
    0% {transform: translateX(-105%);}
    100% {transform: translateX(0)} 
  }
  @keyframes closemenu {
    0% {transform: translateX(0);}
    100% {transform: translateX(-105%)} 
  }
</style>