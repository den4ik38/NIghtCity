<template>
  <div class="aside">
        <div class="aside__catalog">
          <slot></slot>
        </div>
      </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
  .aside {
    max-width: 300px;
    width: 33%;
    display: flex;
    flex-direction: column;
    background-color: #f7f7f7;
    padding: 15px;
  }
  
</style>