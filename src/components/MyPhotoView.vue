<template>
  <div v-if="show" class="wrapper">
    <div class="container">
      <img :src="itemImage" alt="" class="image">
      <div class="arrow__left" @click="previous">
        <img src="../../public/arrow.png" alt="" class="img__arrow">
      </div>
      <div class="arrow__right" @click="next">
        <img src="../../public/arrow.png" alt="" class="img__arrow img__arrow_rotate">
      </div>
    </div>
    <div class="close" @click="close"></div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    fotos: {
      type: Array,
      required: true,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      selectedImage: 0
    }
  },
  methods: {
    next() {
      if (this.fotos.length - 1 === this.selectedImage) {
        this.selectedImage = 0
      } else {
        this.selectedImage = this.selectedImage + 1
      }
    },
    previous() {
      console.log('prev');
      if (this.selectedImage === 0) {
        this.selectedImage = this.fotos.length - 1
      } else {
        this.selectedImage =this.selectedImage - 1
      }
    },
    close() {
      this.$emit('closeView')
    }
  },
  computed: {
    itemImage() {
      return this.fotos[this.selectedImage]
    }
  }
}
</script>
<style scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.769);
  display: flex;
  align-items: center;
  z-index: 10;
}
.close {
  position: absolute;
  top: 5%;
  right: 5%;
  z-index: 11;
  width: 20px;
  height: 20px;
  cursor:pointer;
}
.close::before {
  content: '';
  box-sizing: border-box;
  display: inline-block;
  width: 20px;
  height: 2px;
  border: 2px solid white;
  transform: rotate(45deg) translateY(-5px);
}
.close::after {
  content: '';
  box-sizing: border-box;
  display: inline-block;
  width: 20px;
  height: 2px;
  border: 2px solid white;
  transform: rotate(-45deg) translateY(-16px) translateX(20px);
}
.container {
  margin: 0 auto;
}
.arrow__left {
  position: absolute;
  top: 0;
  bottom:0;
  left: 0;
  width: 15%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
}
.arrow__right {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 15%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
}
.arrow__right:hover .img__arrow {
  filter: invert(0.7);
}
.arrow__left:hover .img__arrow {
  filter: invert(0.7);
}
.img__arrow {
  filter: invert(1);
}
.img__arrow_rotate {
  transform: rotate(180deg);
}
.image {
  max-width: calc(100vh - 20px);
}
</style>