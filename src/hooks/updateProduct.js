import {put, post} from '@/helpers/api_helper'
import {ref, onBeforeMount, computed} from 'vue'

export function updateProduct(props) {
  const reload = ref(false)

  const saveChangeProduct = async (obj) => {
    if (obj.type === 'bud') {
      try {
        const res = await put('bud/update', obj)
          reload.value = true
          return res
      } catch (error) {
        console.log('вывалились из блока трай', error);
      }
    } else {
      try {
        const res = await put('product/update', obj)
          reload.value = true
          return res
      } catch (error) {
        console.log('вывалились из блока трай', error);
      }
    }
  }

  const deleteProduct = async (type, id, catalogPhoto, arrayPhotos)=>{
    if (type === 'bud') {
      try {
        const res = await post('bud/delete', {id, catalogPhoto, 'budsPhoto':arrayPhotos})
          reload.value = true
          return res
      } catch (error) {
        console.log('Удаление провалилось', error);
      }
    } else {
      try {
        const res = await post('product/delete', {type, id, catalogPhoto, 'productPhoto':arrayPhotos})
          reload.value = true
          return res
      } catch (error) {
        console.log('Удаление провалилось', error);
      }
    }
  }

  return {
    saveChangeProduct, deleteProduct, reload
  }
}