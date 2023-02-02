<template>
  <div class="line"></div>
  <div class="wrapper">
    <registration-form class="auth__form"/>
  </div>
</template>
<script>
import RegistrationForm from '@/components/RegistrationForm.vue'
export default {
  components: {RegistrationForm}
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
    transform: translateY(-60px);
  }
</style>