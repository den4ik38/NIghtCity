import {put, get, post} from '@/helpers/api_helper'
import {ref, onMounted} from 'vue'

export function useOrders() {
  const newOrders = ref([])
  const workOrders = ref([])
  const sendOrders = ref([])
  const userNotConfirmOrders = ref([])
  const userOrdersHistory = ref([])

  const createOrder = async (products, costValue, address)=>{
    try {
      const answer = await post('order/create', {products, costValue, address})
      return answer
    } catch (error) {
      console.log('Order not create',error);
    }
  }

  const setInWorkStatus = async (date, belongId) => {
    try {
      const res = await put('order/inwork', {date, belongId})
        fetchNotInWorkOrders()
        return res
    } catch (error) {
      console.log('вывалились из блока трай', error);
    }
  }
  
  const setSendStatus = async (date, belongId) => {
    try {
      const res = await put('order/status', {date, belongId})
        fetchNotInWorkOrders()
        return res
    } catch (error) {
      console.log('вывалились из блока трай', error);
    }
  }

  const setConfirmStatus = async (date, belongId) => {
    try {
      const res = await put('order/confirm', {date, belongId})
        fetchNotInWorkOrders()
        return res
    } catch (error) {
      console.log('вывалились из блока трай', error);
    }
  }

  const fetchNotInWorkOrders = async ()=>{
    try {
      newOrders.value = [] 
      workOrders.value = [] 
      sendOrders.value = []
      const response = await get('order/ordersnotconfirm')
      response.forEach(item => {
        if (item.inWork === false) {
          newOrders.value.push(item)
        } else if (item.inWork === true && item.send === false) {
          workOrders.value.push(item)
        } else if (item.send === true && item.confirmation === false) {
          sendOrders.value.push(item)
        }
       });
    } catch (error) {
      console.log('Ошибка подгрузки товара', error);
    }
  }
  const fetchUserNotConfirmOrders = async () => {
    try {
      const res = await get('order/myordernotconfirm')
      userNotConfirmOrders.value = res
    } catch (error) {
      console.log('Не удалось подгрузить заказа "в работе"');
    }
  }

  const fetchUseOrdersHistory= async () => {
    try {
      const res = await get('order/mystoryorders')
      userOrdersHistory.value = res
    } catch (error) {
      console.log('Не удалось подгрузить историю заказов');
    }
  }

  return {
    newOrders, workOrders, sendOrders, setInWorkStatus, setConfirmStatus, setSendStatus, fetchNotInWorkOrders, fetchUseOrdersHistory, fetchUserNotConfirmOrders, userNotConfirmOrders, userOrdersHistory, createOrder
  }
}