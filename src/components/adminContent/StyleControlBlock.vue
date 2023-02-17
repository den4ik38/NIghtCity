<template>
  <div class="style_control">
        <div ref="alignBlock" class="block_font">
          <img @click="style.textAlign ='left', changeActive($event)" src="@/../public/formated/icons8-выровнять-по-левому-краю-24.png" alt="" class="align_icons align_icons active">
          <img @click="style.textAlign ='center', changeActive($event)" src="@/../public/formated/icons8-выровнять-по-центру-50.png" alt="" class="align_icons align_icons">
          <img @click="style.textAlign ='right', changeActive($event)" src="@/../public/formated/icons8-выровнять-по-правому-краю-48.png" alt="" class="align_icons align_icons">
          <img @click="style.textAlign ='justify', changeActive($event)" src="@/../public/formated/icons8-выровнять-по-обоим-краям-24.png" alt="" class="align_icons align_icons">
        </div>
        <div class="block_font">
          <img src="@/../public/formated/icons8-увеличить-шрифт-50.png" alt="" class="align_icons">
          <input v-model="fontSize" @change="setFontSize($event)" type="number" class="font_input">
        </div>
        <div class="block_font">
          <img src="@/../public/formated/icons8-цвет-текста-48.png" alt="" class="align_icons">
          <input v-model="color" @change="setColor($event)" type="color" class="font_input">
        </div>
        <div class="block_font">
          <img @click="setWeight($event)" src="@/../public/formated/icons8-жирный-50.png" alt="" class="align_icons">
          <img @click="setItalic($event)" src="@/../public/formated/icons8-курсив-32.png" alt="" class="align_icons">
          <img @click="setDecoration($event)" src="@/../public/formated/icons8-подчеркивание-30.png" alt="" class="align_icons">
        </div>
      </div>
</template>
<script>
export default {
  data(){
    return {
      style:{'textAlign':'left', 'fontSize':'16px', 'fontWeight':'normal', 'fontStyle':'normal', 'textDecoration':'none', 'color':'rgb(0,0,0)'},
      color: '',
      fontSize: 15
    }
  },
  methods: {
    setColor(event){
      this.style.color = event.target.value
    },
    setFontSize(event){
      this.style.fontSize = event.target.value + 'px'
    },
    makeEvent(){
      this.$emit('setStyle', this.style)
    },
    setWeight(event){
      if (event.target.classList.value.includes('selected')) {
        event.target.classList.remove('selected')
        this.style.fontWeight = 'normal'
      } else {
        event.target.classList.add('selected')
        this.style.fontWeight = 'bold'
      }
    },
    setItalic(event){
      if (event.target.classList.value.includes('selected')) {
        event.target.classList.remove('selected')
        this.style.fontStyle = 'normal'
      } else {
        event.target.classList.add('selected')
        this.style.fontStyle = 'italic'
      }
    },
    setDecoration(event){
      if (event.target.classList.value.includes('selected')) {
        event.target.classList.remove('selected')
        this.style.textDecoration = 'none'
      } else {
        event.target.classList.add('selected')
        this.style.textDecoration = 'underline'
      }
    },
    changeActive(event){
      this.$refs.alignBlock.childNodes.forEach(item=>item.classList.remove('active'))
      event.target.classList.add('active')
    }
  },
  mounted(){
    this.makeEvent()
  }

}
</script>
<style scoped>
  .align_icons {
    width: 18px;
    height: 18px;
    margin: 5px;
    cursor: pointer;
  }
  .selected {
    box-shadow: 0 0 5px blue;
  }
  .active {
    box-shadow: 0 0 5px blue;
  }
  .style_control {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .block_font {
    display: flex;
    border-right: 1px solid lightgrey;
    padding: 3px 10px;
    align-items: center;
  }
  .font_input {
    width: 40px;
    height: 18px;
  }
</style>