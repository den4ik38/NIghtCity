<template>
  <div class="wrapper" v-if="showAlert">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'my-alert',
  props: {
    showAlert: {
      type: Boolean,
      required: true,
      default(){
        return false
      }
    }
  },
  watch: {
    showAlert(){
      setTimeout(()=>{
        this.$emit('update:showAlert', false)
      }, 2000)
    }
  }
  
}
</script>
<style scoped>
  .wrapper {
    position: fixed;
    top: calc(50% - 50px);
    right: calc(50% - 200px);
    background: white;
    border: 2px solid #a3c52d;
    box-shadow:  0 0 8px #a3c52d;
    color: green;
    font-weight: bold;
    font-size: 19px;
    width: 400px;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
  }
</style>