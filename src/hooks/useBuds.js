import {put, get, post, postFD} from '@/helpers/api_helper'
import {ref, onBeforeMount, computed} from 'vue'

export function useBuds(props) {
const bud = ref([])
const buds = ref([])
const indica = computed(()=>{
  return buds.value.filter((item)=>{
    if (!item.hybrid.includes('Sativa') && !item.hybrid.includes('Ruderalis')) {
      return item
    }
  })
})
const sativa = computed(()=>{
  return buds.value.filter((item)=>{
    if (!item.hybrid.includes('Indica') && !item.hybrid.includes('Ruderalis')) {
      return item
    }
  })
})
const hybrid = computed(()=>{
  return buds.value.filter((item)=>{
    if (item.hybrid.includes('/')) {
      return item
    }
  })
})
  
  const fetchingBud = async ()=>{
    try {
      const response = await get('bud/bud', {params:props})
      bud.value = response
    } catch (error) {
      console.log('Ошибка подгрузки товара', error);
    }
  }
  const fetchingAll = async ()=>{
    try {
      const response = await get('bud/buds')
      buds.value = response
    } catch (error) {
      console.log('Ошибка подгрузки товара', error);
    }
  }

  const saveBud = async (photos, fileCatalog, obj) => {
    try {
      let fd= new FormData()
      photos.forEach(item=> fd.append('images', item))
      const res = await postFD('save/uploadmultiple', fd, { headers: {'Content-Type': 'multipart/form-data' }})
      if (res) {
        obj.budsPhoto = res
      }
      let fdnew= new FormData()
      fdnew.append('image', fileCatalog)
      const result = await postFD('save/upload', fdnew, { headers: {'Content-Type': 'multipart/form-data'}})
      if (result) {
        obj.catalogPhoto = result
      }
      
      try {
        const answer = await post('bud/create', {bud:obj})
        return answer
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return {
    bud,
    buds,
    indica, 
    sativa, 
    hybrid,
    saveBud,
    fetchingAll,
    fetchingBud
  }
}