import {put, get, post, postFD} from '@/helpers/api_helper'
import {ref, onBeforeMount, computed} from 'vue'

export function useProduct(props) {
  const products = ref()
  const allProducts = ref([])
  const product = ref()
  const hash = ref()
  const kief = ref()
  const food = ref()
  const cbd = ref()
  const accessories = ref()


  const fetchingAllProducts = async ()=>{
    try {
      const hashik = await get('product/products', {params:{'type':'hash'}})
      hash.value = hashik
      const kiefs = await get('product/products', {params:{'type':'kief'}})
      kief.value = kiefs
      const foods = await get('product/products', {params:{'type':'food'}})
      food.value = foods
      const cbds = await get('product/products', {params:{'type':'cbd'}})
      cbd.value = cbds
      const accessor = await get('product/products', {params:{'type':'accessories'}})
      accessories.value = accessor
      const arr = [...hashik, ...foods, ...cbds, ...kiefs, ...accessor]
      allProducts.value = arr
    } catch (error) {
      console.log('Load Porducts failed', error);
    }
  }

  const saveImages = async (file, arrayFiles) => {
    try {
      const photosObj = {}
      let fd= new FormData()
      arrayFiles.forEach(item=> fd.append('images', item))
      const res = await postFD('save/uploadmultiple', fd, { headers: {'Content-Type': 'multipart/form-data' }})
      if (res) {
        photosObj.productPhoto = res
      }
      let fdnew= new FormData()
      fdnew.append('image', file)
      const result = await postFD('save/upload', fdnew, { headers: {'Content-Type': 'multipart/form-data'}})
      if (result) {
        photosObj.catalogPhoto = result
      }
      return photosObj
    } catch (error) {
      console.log('Ошибка при попытке сохранить изображения',error);
    }
  }

  const saveProduct = async (fileCatalog, photos, obj) => {
    try {
        const images = await saveImages(fileCatalog, photos)
        obj.catalogPhoto = images.catalogPhoto
        obj.productPhoto = images.productPhoto
        const answer = await post('product/create', {product:obj})
        return answer
      } catch (error) {
        console.log('Попытка создать новый товар провалилась',error);
      }
  }

  const fetchingProducts = async (str)=>{
    const type = {'type':str}
    if (str === 'hash') {
      try {
        const response = await get('product/products', {params:type})
        products.value = response
      } catch (error) {
        console.log('Ошибка подгрузки хашика', error);
      }
    }
    if (str === 'kief') {
      try {
        const response = await get('product/products', {params:type})
        products.value = response
      } catch (error) {
        console.log('Ошибка подгрузки кифа', error);
      }
    }
    if (str === 'food') {
      try {
        const response = await get('product/products', {params:type})
        products.value = response
      } catch (error) {
        console.log('Ошибка подгрузки вкуснях', error);
      }
    }
    if (str === 'cbd') {
      try {
        const response = await get('product/products', {params:type})
        products.value = response
      } catch (error) {
        console.log('Ошибка подгрузки cbd', error);
      }
    }
    if (str === 'accessories') {
      try {
        const response = await get('product/products', {params:type})
        products.value = response
      } catch (error) {
        console.log('Ошибка подгрузки акссесуаров', error);
      }
    }
  }

  const getProduct = async ()=>{
    const response = await get('product/product', {params:props})
    product.value = response
  }

  return {
    saveProduct, fetchingProducts, products, allProducts, fetchingAllProducts, getProduct, product, hash, kief, food, cbd, accessories
  }
}