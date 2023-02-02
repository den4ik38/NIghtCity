<template>
  <div v-if="showAge" class='container'>
    <form class="age__form">
      <div class="age__title">IN ORDER TO ACCESS CANNABIS-PATTAYA.STORE YOU NEED TO BE 20 YEARS OR OLDER.</div>
      <div class="age__btns">
        <button @click.prevent="setAge(true)" class="age__btn">YES, I'm 20+</button>
        <button @click.prevent="setAge(false)" class="age__btn">I'm too young</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  props: {
    showAge: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    setAge(bool) {
      localStorage.setItem('age', bool)
      this.$emit('update:showAge', false)
      if (!bool) {
        window.open('https://snake.io/', '_blank')
      }
    }
  }
}
</script>
<style scoped>
  .container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: grey;
  }
  .age__form {
    position: absolute;
    top: calc(50% - 80px);
    left: calc(50% - 180px);
    height: 160px;
    width: 360px;
    border-radius: 15px;
    background-color: white;
    padding: 20px 5px;
  }
  .age__title {
    text-align: center;
    font-weight: 500;
    font-size: 18px;
  }
  .age__btns {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .age__btn {
    padding: 5px 10px;
    margin: 10px;
    background: none;
    color: green;
    border: 1px solid green;
    box-shadow: 0 0 4px grey;
    cursor: pointer;
    font-weight: 500;
  }
  .age__btn:hover {
    box-shadow: none;
  }
</style>