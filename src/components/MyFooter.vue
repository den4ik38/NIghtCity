<template>
  <div class="wrapper">
    <div class="footer__container">
      <div class="footer__section">
        <ul class="footer__list">
          <li class="footer__listitem"><a @click="$router.push('/catalog')" class="footer__link">Indica</a></li>
          <li class="footer__listitem"><a @click="$router.push('/catalog')" class="footer__link">Sativa</a></li>
          <li class="footer__listitem"><a @click="$router.push('/catalog')" class="footer__link">Hybrid</a></li>
          <li class="footer__listitem"><a @click="$router.push('/catalog')" class="footer__link">Kief</a></li>
        </ul>
      </div>

      <div class="footer__section">
        <ul class="footer__list">
          <li class="footer__listitem"><a @click="$router.push('/catalog')" class="footer__link">Food</a></li>
          <li class="footer__listitem"><a @click="$router.push('/catalog')" class="footer__link">Hash</a></li>
          <li class="footer__listitem"><a @click="$router.push('/catalog')" class="footer__link">CBD</a></li>
          <li class="footer__listitem"><a @click="$router.push('/catalog')" class="footer__link">Accessories</a></li>
        </ul>
      </div>
      
      <div class="footer__section">
        <ul class="footer__list">
          <li class="footer__listitem"><a @click="$router.push('/')" class="footer__link">Home</a></li>
          <li class="footer__listitem"><a @click="$router.push('/catalog')" class="footer__link">Shop</a></li>
          <li class="footer__listitem"><a @click="$router.push('/contact-us')" class="footer__link">Contact us</a></li>
          <li v-if="false" class="footer__listitem"><a @click="$router.push('/faq')" class="footer__link">FAQ</a></li>
        </ul>
      </div>
      <div class="footer__section">
        <img src="../../public/logo.png" @click="$router.push('/')" alt="" class="logo">
        <span class="author">CANNABIS-PATTAYA.STORE</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
  .wrapper {
    width: 100%;
    background-color: #595959;
  }
  .footer__container {
    margin: 0 auto;
    width: 100%;
    max-width: 1140px;
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
  .footer__section {
    display: flex;
    flex-direction: column;
  }
  .footer__sectiontitle {
    font-size: 22px;
    font-weight: bold;
    color: #a3c52d;
  }
  .footer__list {
    display: flex;
    flex-direction: column;
    list-style: none;
  }
  .footer__list {
    margin-top: 15px;
  }
  .footer__link {
    text-decoration: none;
    font-size: 22px;
    font-weight: bold;
    color: goldenrod;
    cursor: pointer;
  }
  .footer__link:hover {
    text-decoration: underline;
  }
  .logo {
    width: 200px;
    height: 100px;
  }
  .author {
    margin-top: 10px;
    font-weight: bold;
    color: #a3c52d;
  }
  
  @media screen and (max-width: 640px) {
    .footer__container {
      flex-wrap: wrap;
      justify-content: space-around;
    }
    .footer__section {
      min-width: 130px;
    }
  }
  @media screen and (max-width: 420px) {
    .footer__listitem {
      display: flex;
    }
    .footer__link {
      margin: 0 auto;
    }
  }
</style>