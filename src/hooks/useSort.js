import {ref, computed} from 'vue'

export function useSort(products, indica, sativa, hybrid, allProducts) {
  const sort = ref('')
  const choice = ref('')
  const items = computed(()=>{
    if (choice.value === '') {
      return [...products.value, ...allProducts.value]
    } else if (choice.value === 'indica'){
      return indica.value
    } else if(choice.value === 'sativa'){
      return sativa.value 
    } else if (choice.value === 'hybrid') {
      return hybrid.value
    } else if (choice.value === 'hash') {
      const hash = allProducts.value.filter(item=>{
        if (item.type === 'hash') {
          return item
        }
      })
      return hash
    } else if (choice.value === 'kief') {
      const kief = allProducts.value.filter(item=>{
        if (item.type === 'kief') {
          return item
        }
      })
      return kief
    } else if (choice.value === 'cbd') {
      const cbd = allProducts.value.filter(item=>{
        if (item.type === 'cbd') {
          return item
        }
      })
      return cbd
    } else if (choice.value === 'food') {
      const food = allProducts.value.filter(item=>{
        if (item.type === 'food') {
          return item
        }
      })
      return food
    } else if (choice.value === 'accessories') {
      const accessories = allProducts.value.filter(item=>{
        if (item.type === 'accessories') {
          return item
        }
      })
      return accessories
    }
  })
  const sortedItems = computed(()=>{
    if (sort.value === "tohigh") {
      return [...items.value].sort((product1, product2) => String(product1["price"])?.localeCompare(String(product2["price"]))).sort((product1, product2)=> product2.inStock - product1.inStock) 
    }else if (sort.value === "tolow") {
      return [...items.value].sort((product1, product2) => String(product2["price"])?.localeCompare(String(product1["price"]))).sort((product1, product2)=> product2.inStock - product1.inStock) 
    }else if (sort.value === "reiting") {
      return [...items.value].sort((product1, product2) => String(product2["reiting"])?.localeCompare(String(product1["reiting"]))).sort((product1, product2)=> product2.inStock - product1.inStock)
    }else if (sort.value === "bought") {
      return [...items.value].sort((product1, product2) => String(product2["bought"])?.localeCompare(String(product1["bought"]))).sort((product1, product2)=> product2.inStock - product1.inStock)
    } else {return [...items.value].sort((product1, product2)=> product2.inStock - product1.inStock)}
    
  })

  const sortAvailable = (arr)=>{
    arr.sort((a, b)=> a.inStock - b.inStock)
  }

  return {
    sort, sortedItems, choice
  }
}