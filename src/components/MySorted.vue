<template>
  <div class='wrapper'>
    <select class="sorted" @change="sortOption">
      <option value="" selected disabled class="sorted__option">Sorted by:</option>
      <option value="tolow" class="sorted__option">Price (high to low)</option>
      <option value="tohigh" class="sorted__option">Price (low to high)</option>
    </select>
    <div class="view__catalog">
      <span class="view__span">View:</span>
      <div @click="changeCatalogView" class="view__standart" :class="{active:full}">
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
      </div>
      <div @click="changeCatalogView" class="view__more" :class="{active:!full}">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      full:false
    }
  },
  methods: {
    changeCatalogView() {
      this.full = !this.full
      this.$emit('changeCatalog')
    },
    sortOption(event) {
      this.$emit('changeSort', event.target.value)
    }
  },
}
</script>
<style scoped>
  .wrapper {
    width: 100%;
    display: flex;
    justify-content: space-around;
    height: 30px;
    align-items: center;
  }
  .sorted {
    border: none;
    border-bottom: 2px solid lightgrey;
    outline: 0;
  }
  .sorted:focus {
    border: none;
    border-bottom: 2px solid #a3c52d;
  }
  .view__catalog {
    display: flex;
    min-width: 120px;
    justify-content: space-between;
  }
  .view__span {
    padding: 2px;
  }
  .view__standart {
    box-sizing:border-box;
    display: flex;
    width: 18px;
    height: 18px;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .cube {
    width: 5px;
    height: 5px;
    border: 1px solid grey;
    cursor: pointer;
  }
  .view__more {
    box-sizing:border-box;
    display: flex;
    width: 18px;
    height: 18px;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .line {
    height: 5px;
    width: 100%;
    border: 1px solid grey;
    cursor: pointer;
  }
  .active div {
    border: 2px solid black;
  }
</style>