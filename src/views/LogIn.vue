<template>
  <div class="container">
    <div class="line"></div>
    <div class="wrapper">
      <auth-form class="auth__form"/>
    </div>
  </div>
</template>
<script>
import AuthForm from '@/components/AuthForm.vue'
export default {
  components: {AuthForm}
}
</script>
<style scoped>
  .wrapper {
    width: 100%;
    display: flex;
    padding: 30px;
  }
  .auth__form {
    margin: 0 auto;
  }
  .line {
    width: 100%;
    height: 60px;
    background-color:rgb(72, 72, 72);
  }
</style>