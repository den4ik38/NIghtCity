import {post, get} from '@/helpers/api_helper'
import axios from 'axios'
import {ref, computed} from 'vue'

export function useAuth(props) {
const loginBody = ref()
const registrBody = ref()
const result = ref([])
const check = ref(false)
const user= ref()

const checkToken = ()=>{
  get('auth/check')
  .then(function(res){
    check.value =  res
  })
  .catch(function(error){
    console.log('fail');
  })
}

const getUser = async () => {
  try {
    const response = await get('auth/user')
    user.value = response
  } catch (error) {
    console.log('Ошибка подгрузки товара', error);
  }
}

const loginFunction = async ()=>{
  const {usermail, password} = loginBody.value
    return await post('auth/login', {usermail, password})
    .then(function(res){
      result.value = [res.roles, res.id, res.user]
      localStorage.setItem('roles', JSON.stringify(res.roles))
      localStorage.setItem('token', res.token)
      localStorage.setItem('id', res.id)
      localStorage.setItem('name', res.user)
      return [res.roles, res.id, res.user]
    })
    .catch(function(error){
      result.value = false
      console.log(error);})
}

const registration = async ()=>{
  if (registrBody.value.telegram){
    const {username, birthday, phone, usermail, password, telegram} = registrBody.value
    return await post('auth/registration', {username, birthday, phone, usermail, password, telegram})
    .then(function(res){
      const result ={'status':200,"message":res.message}
      return result
    })
    .catch(function(error){console.log(error);})
  } else {
  const {username, birthday, phone, usermail, password} = registrBody.value
    await post('auth/registration', {username, birthday, phone, usermail, password})
    .then(function(res){
      const result ={'status':200,"message":res.message}
      return result
    })
    .catch(function(error){console.log(error);})
  }
}

  return {
    loginBody, loginFunction, registration, registrBody, result, checkToken, check, getUser, user
  }
}