import {put, get, post} from '@/helpers/api_helper'
import {ref, computed} from 'vue'

export function useReview(props) {
const reviews = ref([])
const middleReiting = ref(0)
const reviewBody = ref()
const clearForm = ref(false)
const notConfirmReviews = ref([])


const sendReview = computed(()=>{
    post('review/create', {senderName:reviewBody.value.senderName, reiting:reviewBody.value.reiting, reviewMessage: reviewBody.value.reviewMessage, productName:reviewBody.value.productName})
    .then(function(res){
      clearForm.value = !clearForm.value
    })
    .catch(function(error){console.log(error);})
})

  const fetchingReviews = async ()=>{
    try {
      const response = await get('review/reviews', {params:props})
      reviews.value = response[0]
      let sum=0
      for (let i=0; i<response[1].length; i++) {
          sum = sum + response[1][i].value
        }
      middleReiting.value = (Math.floor((sum/response[1].length)*10)/10)
    } catch (error) {
      console.log('Ошибка подгрузки товара', error);
    }
  }

  const fetchingNotConfirm = async ()=>{
    try {
      const response = await get('review/reviewsnonconfirm')
      notConfirmReviews.value = response
    } catch (error) {
      console.log('Ошибка подгрузки товара', error);
    }
  }

  const publishingReview = async (senderId, productName, date)=>{
    try {
      put('review/confirm', {senderId, productName, date})
      .then(function(res){
        fetchingNotConfirm()
        console.log(res);
      })
    } catch (error) {
      console.log('Ошибка подгрузки товара', error);
    }
  }

  return {
    reviews, middleReiting, reviewBody,sendReview, clearForm, fetchingNotConfirm, notConfirmReviews, fetchingReviews, publishingReview
  }
}