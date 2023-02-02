<template>
  <div class="wrapper header__line__bgc">
    <div class="header__line">
      <nav class="navigation">
      <img @click="$router.push('/')" src="../../public/logo.png" class="logo">
        <span @click="$router.push('/')" class="nav__link">Home</span>
        <span @click="$router.push('/catalog')" class="nav__link">Shop</span>
        <span @click="$router.push('/contact-us')" class="nav__link">Contact us</span>
        <span v-if="false" @click="$router.push('/faq')" class="nav__link">FAQ</span>
        <span @click="$router.push('/admin')" v-if="$store.state.roles.includes('ADMIN') || $store.state.roles.includes('MODERATOR')" class="nav__link">Admin</span>

      </nav>
      <div class="controls">
        <div class="auth">
          <span @click="$router.push('/login')" v-if="!$store.state.isAuth">LogIn</span>
          <router-link v-else :to="{ name: 'user-page', params: {id: $store.state.id}}" class="rout_link">{{$store.state.name}}</router-link>
        </div>
        <div class="cart" @click="openCart">
          <img src="../../public/cart.png" alt="" class="cart__img">
          <span class="quantity">{{setQuantity}}</span>
          <span class="separator"> / </span>
          <span class="cost">{{setCost}} ฿</span>
        </div>
      </div>
    </div>
    <div class="mobile__header">
      <div class="mobile__nav">
        <div @click="openMenu" class="view__more">
          <div class="line_burger"></div>
          <div class="line_burger"></div>
          <div class="line_burger"></div>
        </div>
        <img @click="$router.push('/')" src="../../public/logo.png" class="logo logo_mobile">
      </div>
      <div class="controls">
        <div class="auth">
          <span @click="$router.push('/login')" v-if="!$store.state.isAuth">LogIn</span>
          <router-link v-else :to="{ name: 'user-page', params: {id: $store.state.id}}" class="rout_link">{{$store.state.name}}</router-link>
        </div>
        <div class="cart" @click="openCart">
          <img src="../../public/cart.png" alt="" class="cart__img">
          <span class="quantity">{{setQuantity}}</span>
          <span class="separator"> / </span>
          <span class="cost">{{setCost}} ฿</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    openCart(){
      this.$emit('openCart')
    }, 
    openMenu(){
      this.$emit('openMenu')
    }
  },
  computed:{
    setQuantity(){
      if (this.$store.state.cart.length>0){
      return this.$store.state.cart.length} else { return 0 }
    },
    setCost(){
      if (this.$store.state.cart.length>0){
        let costValue = 0
        this.$store.state.cart.forEach(item=> costValue = costValue + item.total)
      return costValue} else { return 0 }
    } 
  }
}
</script>
<style scoped>
  .wrapper {
    width: 100%;
    z-index: 5;
    box-sizing: border-box;
  }
  .header__line {
    width: 100%;
    max-width: 1140px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    color: white;
    padding: 0 10px;
  }

  .navigation {
    display: flex;
    align-items:center;
  }
  .logo {
    width: 100px;
    height: 60px;
    cursor: pointer;
  }

  .nav__link {
    margin-left: 20px;
    color:white;
    text-transform: uppercase;
    cursor:pointer;
  }
  .nav__link:hover {
    text-decoration: underline;
  }
  .controls {
    display: flex;
  }
  .auth {
    display: flex;
    align-items: center;
    text-transform: uppercase;
    cursor:pointer;
  }
  .auth:hover {
    text-decoration: underline;
  }
  .cart {
    display: flex;
    align-items:center;
  }
  .cart__img {
    margin: 0 20px;
    width: 40px;
    height: 40px;
    filter: invert(1);
    cursor: pointer;
  }
  .cart__img:hover {
    filter: invert(0.8);
  }
  .separator {
    margin: 0 5px;
  }
  .rout_link {
    color: white;
    text-decoration: none;
  }

  .mobile__header {
    justify-content: space-between;
    align-items: center;
    color:white;
    background-color: rgb(72, 72, 72);
    padding: 10px 15px;
    display: none;
  }
  .mobile__nav {
    display: flex;
    align-items: center;
  }
  .logo_mobile {
    width: 70px;
    height: 40px;
  }
  .view__more {
    box-sizing:border-box;
    display: flex;
    width: 35px;
    height: 35px;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;
  }
  .line_burger {
    height: 5px;
    width: 100%;
    border: 3px solid white;
  }
  @media screen and (max-width:640px) {
    .header__line {
      display: none;
    }
    .mobile__header {
      display: flex;
    }
  }
  @media screen and (max-width:360px) {
    .view__more {
      width: 25px;
      height: 25px;
    }
    .mobile__header {
      padding: 10px;
    }
    .line_burger {
      height: 4px;
      border: 2px solid white;
    }
    .logo_mobile {
      width: 50px;
      height: 30px;
    }
    .cart__img {
      margin: 0 10px;
      width: 30px;
      height: 30px;
    }
  }
</style>