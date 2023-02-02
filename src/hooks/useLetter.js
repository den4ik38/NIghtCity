
import {ref} from 'vue'
import {post, get} from '@/helpers/api_helper'

export function useLetter(props) {
const letterBoddy = ref()
const clearForm = ref(false)
const letters = ref([])


const send =()=>{
  post('letter/create', {senderName:letterBoddy.value.senderName, senderMail:letterBoddy.value.senderMail, senderTopic: letterBoddy.value.senderTopic, senderMessage:letterBoddy.value.senderMessage})
    .then(function(res){
      clearForm.value = !clearForm.value
    })
    .catch(function(error){console.log(error);})
}

const fetchLetters =()=>{
  get('letter/letters')
  .then(function(res){
    letters.value = res
  })
  .catch(function(error){console.log(error);})
}

  return {
    letterBoddy, send, clearForm, letters, fetchLetters
  }
}