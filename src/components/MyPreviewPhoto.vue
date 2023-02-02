<template>
  <div class="box">
    <div class="mainphoto__container">
      <img :src="mainImage" alt="" class="main__image" @click="openView">
    </div>
    <div class="photo__list">
      <div v-for="photo in photos" @click="changeMain(photo)" class="minphoto__box">
        <img :src="photo" alt="" class="minphoto">
      </div>
    </div>
  </div>
  <my-photo-view :show="showView" :fotos="photos" @closeView="closeView"/>
</template>
<script>
import MyPhotoView from './MyPhotoView.vue'
export default {
  components: {MyPhotoView},
  props: {
    photos: {
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      selectedImage: '',
      showView: false
    }
  },
  methods: {
    changeMain(str) {
      this.selectedImage = str
    },
    openView() {
      this.showView = true
    },
    closeView() {
      this.showView = false
    }
  },
  computed: {
    mainImage() {
      return this.selectedImage
    }
  },
  mounted() {
    setTimeout(() => {
      this.selectedImage = this.photos[0]
    }, 500);
  }
}
</script>
<style scoped>
  .box {
    width: 100%;
    min-width: 550px;
    padding: 10px;
  }
  .mainphoto__container {
    width: 100%;
    max-height: 700px;
    padding: 5px;
  }
  .main__image {
    width: 100%;
    cursor: pointer;
  }
  .photo__list {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .minphoto__box {
    height: 100px;
    width: 85px;
    padding: 3px;
    border: 1px solid rgba(128, 128, 128, 0.601);
    cursor:pointer;
    margin: 0 5px;
  }
  .minphoto {
    height: 100%;
    width: 100%;
  }
  @media screen and (max-width: 1100px) {
    .box {
      min-width: 450px;
    }
  }
  @media screen and (max-width: 900px) {
    .box {
      min-width: 350px;
    }
  }
  @media screen and (max-width: 725px) {
    .box {
      display: flex;
      flex-direction: column-reverse;
    }
    .mainphoto__container {
      display: flex;
    }
    .main__image {
      max-width: 500px;
      margin: 0 auto;
    }
  }
  @media screen and (max-width: 725px) {
    .box {
      min-width: 250px;
    }
  }
</style>
